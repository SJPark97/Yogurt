package com.ssafy.common.api.post;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class PostService {
    private final PostRepository postRepository;

    // 상품 등록(저장)
    public void savePost(Post post) {
        postRepository.save(post);
    }
    // 상품 삭제
    public void delPost(Post post){
        postRepository.del(post);
    }

    // 상품 전체 조회
    public List<Post> findALlPost(){
        return postRepository.findAll();
    }

    // 특정 상품 id 조회
    public Post findOnePost (Long post_id) {
        return postRepository.findOne(post_id);
    }




}
