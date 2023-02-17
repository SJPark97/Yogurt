package com.ssafy.common.api.endpost.service;

import com.ssafy.common.api.endpost.converter.EndPostConverter;
import com.ssafy.common.api.endpost.domain.EndPost;
import com.ssafy.common.api.endpost.repository.EndPostRepository;
import com.ssafy.common.api.post.domain.Post;
import com.ssafy.common.api.post.repository.PostRepository;
import com.ssafy.common.api.user.domain.User;
import com.ssafy.common.api.user.dto.response.UserEndPostResponse;
import com.ssafy.common.api.user.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class EndPostService {
    private final PostRepository postRepository;
    private final EndPostConverter endPostConverter;
    private final EndPostRepository endPostRepository;
    private final UserRepository userRepository;

    public EndPostService(PostRepository postRepository, EndPostConverter endPostConverter, EndPostRepository endPostRepository, UserRepository userRepository) {
        this.postRepository = postRepository;
        this.endPostConverter = endPostConverter;
        this.endPostRepository = endPostRepository;
        this.userRepository = userRepository;
    }

    // 구매 완료 생성
    public void createEndPost(Post post, User buyer, String address){
        EndPost endPost = endPostConverter.createEndPostRequestDtoToEntity(post,buyer,address);
        post.deal(); // post 거래 완료 status 로 변경
        postRepository.save(post);
        endPostRepository.save(endPost);
    }
    // user 구매 완료 조회
    public UserEndPostResponse userEndPost(User user){
        return new UserEndPostResponse(userRepository.findById(user.getId()).get(), postRepository);
    }
}
