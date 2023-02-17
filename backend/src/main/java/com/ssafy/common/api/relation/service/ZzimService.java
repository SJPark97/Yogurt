package com.ssafy.common.api.relation.service;

import com.ssafy.common.api.post.domain.Post;

import com.ssafy.common.api.post.repository.PostRepository;
import com.ssafy.common.api.relation.converter.ZzimConverter;
import com.ssafy.common.api.relation.domain.Zzim;
import com.ssafy.common.api.relation.dto.zzim.ZzimResponse;
import com.ssafy.common.api.relation.repository.ZzimRepository;
import com.ssafy.common.api.user.domain.User;
import com.ssafy.common.api.user.domain.UserStatus;
import com.ssafy.common.api.user.dto.response.UserZzimResponse;
import com.ssafy.common.api.user.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
public class ZzimService {
    private final ZzimRepository zzimRepository;
    private final PostRepository postRepository;
    private final UserRepository userRepository;
    private final ZzimConverter zzimConverter;

    public ZzimService(ZzimRepository zzimRepository, PostRepository postRepository,UserRepository userRepository, ZzimConverter zzimConverter){
        this.zzimRepository = zzimRepository;
        this.postRepository = postRepository;
        this.zzimConverter = zzimConverter;
        this.userRepository = userRepository;
    }

    // 찜 저장
    @Transactional
    public ZzimResponse createZzim(Long postId, User user){
        Post post = postRepository.findById(postId).get();
        Zzim zzim = zzimConverter.createZzimRequestDtoToEntity(post, user);
        Zzim createZzim = zzimRepository.save(zzim);
        return new ZzimResponse(createZzim);
    }

    // 찜 삭제
    @Transactional
    public ZzimResponse deleteZzim (Long zzim_id) {
        Zzim zzim = zzimRepository.findById(zzim_id).get();
        zzim.delete();
        return new ZzimResponse(zzim);
    }

    // user로 찜 조회
    public UserZzimResponse userZzim(User user){
        return userRepository.findById(user.getId())
                .map(UserZzimResponse::new)

                .orElseThrow();
    }
}
