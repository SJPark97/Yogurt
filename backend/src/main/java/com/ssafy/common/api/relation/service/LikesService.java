package com.ssafy.common.api.relation.service;

import com.ssafy.common.api.relation.converter.LikesConverter;
import com.ssafy.common.api.relation.domain.Likes;
import com.ssafy.common.api.relation.dto.Likes.LikesResponse;
import com.ssafy.common.api.relation.repository.LikesRepository;
import com.ssafy.common.api.user.domain.User;
import com.ssafy.common.api.user.dto.UserLikesResponse;
import com.ssafy.common.api.user.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
public class LikesService {
    private final UserRepository userRepository;
    private final LikesRepository likesRepository;
    private final LikesConverter likesConverter;

    public LikesService(UserRepository userRepository,LikesConverter likesConverter,  LikesRepository likesRepository){
        this.userRepository = userRepository;
        this.likesConverter = likesConverter;
        this.likesRepository = likesRepository;
    }
    // 즐겨찾기 추가
    @Transactional
    public LikesResponse addlikes(User user, Long seller_id){
        User seller = userRepository.findById(seller_id).get();
        Likes likes = likesConverter.createLikesRequestDtoToEntity(user, seller);
        Likes createlikes = likesRepository.save(likes);
        return new LikesResponse(createlikes);
    }
    // 즐겨찾기 삭제
    @Transactional
    public LikesResponse deletelikes(Long id){
        Likes likes = likesRepository.findById(id).get();
        likes.delete();
        return new LikesResponse(likes);
    }
    // user 즐겨찾기 목록
    @Transactional
    public UserLikesResponse userLikes(User user){
        return userRepository.findById(user.getId())
                .map(UserLikesResponse::new)
                .get();
    }
}
