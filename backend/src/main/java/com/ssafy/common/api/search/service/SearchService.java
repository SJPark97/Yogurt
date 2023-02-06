package com.ssafy.common.api.search.service;

import com.ssafy.common.api.post.dto.response.PostAllResponse;
import com.ssafy.common.api.post.repository.PostRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class SearchService {
    private PostRepository postRepository;

    public SearchService(PostRepository postRepository) {
        this.postRepository = postRepository;
    }

//    public List<PostAllResponse> postName(String text){
//        postRepository.f
//
//        return
//    }
}
