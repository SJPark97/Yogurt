package com.ssafy.common.api.post.service;

import com.ssafy.common.api.post.PostConverter;
import com.ssafy.common.api.post.domain.Post;
import com.ssafy.common.api.post.dto.request.PostInsertRequest;
import com.ssafy.common.api.post.dto.request.PostUpdateRequest;
import com.ssafy.common.api.post.dto.response.PostDetailResponse;

import com.ssafy.common.api.post.repository.PostRepository;
import com.ssafy.common.api.user.domain.User;
import com.ssafy.common.api.user.repository.UserRepository;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class PostService {
    private final PostRepository postRepository;
    private final UserRepository userRepository;
    private final PostConverter postConverter;

    public PostService(PostRepository postRepository, UserRepository userRepository, PostConverter postConverter) {
        this.postRepository = postRepository;
        this.userRepository = userRepository;
        this.postConverter = postConverter;
    }

    // 물건 저장
    public PostDetailResponse createPost(PostInsertRequest request, User user) {
        Post post = postConverter.createRequestDtoToEntity(request, user);
        Post createPost = postRepository.save(post);
        return new PostDetailResponse(createPost);
    }

    // Id 로 상품 조회
    @Transactional
    public PostDetailResponse findById(Long postId) {
        return postRepository.findById(postId)
                .map(PostDetailResponse::new)
                .orElseThrow();
    }

    // 상품 전체 조회
    @Transactional
    public List<Post> findAll() {
        return postRepository.findAll();
    }

    // 상품 수정

    @Transactional
    public PostDetailResponse updatePost(Long postId, PostUpdateRequest request, User user){
        Post post = postRepository.findById(postId)
                .orElseThrow();
        if (user.getId().equals(post.getSeller().getId())) {
            System.out.println("권한이 없습니다.");
        }
        post.update(request);
        return new PostDetailResponse(post);
    }


    // 상품 삭제
    @Transactional
    public void deletePost(Long postId, User user){
        Post post = postRepository.findById(postId)
                .orElseThrow();
        if (user.getId().equals(post.getSeller().getId())) {
            System.out.println("권한이 없습니다. 유저 불일치");
        }
        postRepository.delete(post);
    }



}

