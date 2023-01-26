package com.ssafy.common.api.post;

import com.ssafy.common.api.post.dto.request.PostInsertRequest;
import com.ssafy.common.api.post.dto.response.PostDetailResponse;

import com.ssafy.common.api.user.domain.User;
import com.ssafy.common.api.user.domain.UserLoginForm;
import com.ssafy.common.api.user.repository.UserRepository;
import org.apache.tomcat.util.http.parser.Authorization;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.List;
import java.util.stream.Stream;

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
}

