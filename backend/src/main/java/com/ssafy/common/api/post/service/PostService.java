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
import com.ssafy.common.api.user.dto.response.UserPostResponse;
import com.ssafy.common.api.user.repository.UserRepository;
import com.ssafy.common.config.JwtProvider;
import com.ssafy.common.config.auth.PrincipalDetails;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
@Slf4j
public class PostService {
    private final PostRepository postRepository;
    private final PostimageRepository postimageRepository;
    private final UserRepository userRepository;
    private final PostConverter postConverter;
    private final PostImageConverter postImageConverter;
    private JwtProvider jwtProvider;

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
        return postRepository.findAll().stream().filter(post -> post.getStatus()!= PostStatus.STATUS_DELETE && post.getStatus()!=PostStatus.STATUS_END).map(PostAllResponse::new).collect(Collectors.toList());

    }

    // 상품 최신 조회
    public List<PostAllResponse> findNewPostAll() {
        return postRepository.findAll(Sort.by(Sort.Direction.DESC,"id")).stream().filter(post -> post.getStatus()!= PostStatus.STATUS_DELETE&& post.getStatus()!=PostStatus.STATUS_END).map(PostAllResponse::new).collect(Collectors.toList());
    }

    // 상품 인기 조회
    public List<PostAllResponse> findLikesPostAll(){
        List<PostAllResponse> postList = postRepository.findAll().stream().filter(post -> post.getStatus()!= PostStatus.STATUS_DELETE && post.getStatus()!=PostStatus.STATUS_END ).map(PostAllResponse::new).collect(Collectors.toList());
        Collections.sort(postList, ((o1, o2) -> o2.getLikesCount() - o1.getLikesCount()));
        return postList;
    }

    // user id 상품 전체 조회
    public List<UserPostResponse> findByUserId(Long user_Id){
        return userRepository.findById(user_Id).filter(user -> user.getUserStatus()!= UserStatus.DELETE  ).stream().map(UserPostResponse::new).collect(Collectors.toList());
    }

    // 상품 저장
    @Transactional
    public Long createPost(PostInsertRequest request, User user) {
        Post post = postConverter.createRequestDtoToEntity(request, user);
        Post createPost = postRepository.save(post);
        List<String> images = request.getPostImages();
        log.info("이미지 갯수 {}",images.size());
        for (String image : images) {
            Postimage postimage = postImageConverter.createImageRequestDtoToEntity(image, createPost);
            postimageRepository.save(postimage);
        }
        return createPost.getId();
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
        System.out.println("authentication.getPrincipal() : " + authentication.getPrincipal());
        PrincipalDetails principal = (PrincipalDetails) authentication.getPrincipal();
        return principal.getUser();
    }
}

