package com.ssafy.common.api.relation.service;

import com.ssafy.common.api.relation.converter.LikesConverter;
import com.ssafy.common.api.relation.domain.Likes;
import com.ssafy.common.api.relation.dto.Likes.LikesResponse;
import com.ssafy.common.api.relation.dto.Likes.LikesUserBuyerResponse;
import com.ssafy.common.api.relation.dto.Likes.LikesUserSellerResponse;
import com.ssafy.common.api.relation.repository.LikesRepository;
import com.ssafy.common.api.user.domain.User;
import com.ssafy.common.api.user.dto.response.UserLikesResponse;
import com.ssafy.common.api.user.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

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
    public LikesResponse addLikes(User user, Long seller_id){
        User seller = userRepository.findById(seller_id).get();
        Likes likes = likesConverter.createLikesRequestDtoToEntity(user, seller);
        Likes createlikes = likesRepository.save(likes);
        return new LikesResponse(createlikes);
    }
    // 즐겨찾기 삭제
    @Transactional
    public LikesResponse deleteLikes(Long id){
        Likes likes = likesRepository.findById(id).get();
        likes.delete();
        return new LikesResponse(likes);
    }
    // buyer 의  seller 즐겨찾기 목록 API
    public List<LikesUserSellerResponse> sellerLikesList(User user){
        UserLikesResponse response = userRepository.findById(user.getId())
                .map(UserLikesResponse::new)
                .get();
        return response.getBuyerLikes();
    }
    // seller 의 buyer 즐겨찾기 목록 API
    public List<LikesUserBuyerResponse> buyerLikesList(User user){
        UserLikesResponse response = userRepository.findById(user.getId())
                .map(UserLikesResponse::new)
                .get();
        return response.getSellerLikes();
    }
}
