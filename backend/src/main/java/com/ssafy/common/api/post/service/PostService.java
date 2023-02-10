package com.ssafy.common.api.post.service;

import com.ssafy.common.api.post.converter.PostConverter;
import com.ssafy.common.api.post.converter.PostImageConverter;
import com.ssafy.common.api.post.domain.Post;
import com.ssafy.common.api.post.domain.PostStatus;
import com.ssafy.common.api.post.dto.request.PostInsertRequest;
import com.ssafy.common.api.post.dto.response.PostAllResponse;
import com.ssafy.common.api.post.dto.response.PostDetailResponse;
import com.ssafy.common.api.post.postimage.domain.Postimage;
import com.ssafy.common.api.post.postimage.repository.PostimageRepository;
import com.ssafy.common.api.post.repository.PostRepository;
import com.ssafy.common.api.user.domain.User;
import com.ssafy.common.api.user.domain.UserStatus;
import com.ssafy.common.api.user.dto.UserPostResponse;
import com.ssafy.common.api.user.repository.UserRepository;
import com.ssafy.common.config.auth.PrincipalDetails;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
public class PostService {
    private final PostRepository postRepository;
    private final PostimageRepository postimageRepository;
    private final UserRepository userRepository;
    private final PostConverter postConverter;
    private final PostImageConverter postImageConverter;

    public PostService(PostRepository postRepository, PostimageRepository postimageRepository, UserRepository userRepository, PostConverter postConverter, PostImageConverter postImageConverter) {
        this.postRepository = postRepository;
        this.postimageRepository = postimageRepository;
        this.userRepository = userRepository;
        this.postConverter = postConverter;
        this.postImageConverter = postImageConverter;
    }

    // 상품 Id 로 상품 조회
    public PostDetailResponse findByPostId(Long postId) {
        return postRepository.findById(postId)
                .map(PostDetailResponse::new)
                .orElseThrow();
    }

    // 상품 전체 조회
    public List<PostAllResponse> findPostAll() {
        return postRepository.findAll().stream().filter(post -> post.getStatus()!= PostStatus.STATUS_DELETE).map(PostAllResponse::new).collect(Collectors.toList());
    }

    // user id 상품 전체 조회
    public List<UserPostResponse> findByUserId(Long user_Id){
        return userRepository.findById(user_Id).filter(user -> user.getUserStatus()!= UserStatus.DELETE).stream().map(UserPostResponse::new).collect(Collectors.toList());
    }

    // 상품 저장
    @Transactional
    public String createPost(PostInsertRequest request, User user) {
        Post post = postConverter.createRequestDtoToEntity(request, user);
        Post createPost = postRepository.save(post);
        List<Map<String,String>> images = request.getPostImages();
        for (Map map : images) {
            String url = (String) map.get("url");
            Postimage postimage = postImageConverter.createImageRequestDtoToEntity(url, createPost);
            postimageRepository.save(postimage);
        }
        return null;
    }

    // 상품 라이브 status 변환
    @Transactional
    public PostDetailResponse updateLiveStatus(Long postId){
        Post post = postRepository.findById(postId).get();
        post.updateStatus(post);
        return new PostDetailResponse(post);
    }

    // 상품 삭제
    @Transactional
    public PostDetailResponse deletePost(Long postId){
        Post post = postRepository.findById(postId).get();
        post.delete();
        return new PostDetailResponse(post);
    }

    // 로그인 유저 정보
    public User getLoginUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        PrincipalDetails principal = (PrincipalDetails) authentication.getPrincipal();
        return principal.getUser();
    }
}

