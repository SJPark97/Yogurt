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

    public Long savePost(Post post) {
        postRepository.save(post);
        return post.getId();
    }

    public List<Post> findPost(){
        return postRepository.findAll();
    }

    public Post findOnePost (Long post_id) {
        return postRepository.findOne(post_id);
    }
}
