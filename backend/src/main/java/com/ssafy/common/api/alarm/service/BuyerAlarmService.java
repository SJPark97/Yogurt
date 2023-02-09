package com.ssafy.common.api.alarm.service;

import com.ssafy.common.api.alarm.converter.BuyerAlarmConverter;
import com.ssafy.common.api.alarm.domain.BuyerAlarm;
import com.ssafy.common.api.alarm.dto.response.BuyerAlarmResponse;
import com.ssafy.common.api.alarm.repository.BuyerAlarmRepository;
import com.ssafy.common.api.post.repository.PostRepository;
import com.ssafy.common.api.relation.dto.Likes.LikesUserBuyerResponse;
import com.ssafy.common.api.relation.dto.Likes.LikesUserSellerResponse;
import com.ssafy.common.api.relation.service.LikesService;
import com.ssafy.common.api.user.domain.User;
import com.ssafy.common.api.user.dto.UserBuyerAlarmResponse;
import com.ssafy.common.api.user.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional(readOnly = true)
public class BuyerAlarmService {

    private final PostRepository postRepository;
    private final UserRepository userRepository;
    private final BuyerAlarmConverter buyerAlarmConverter;

    private final LikesService likesService;
    private  final BuyerAlarmRepository buyerAlarmRepository;
    public BuyerAlarmService(PostRepository postRepository, UserRepository userRepository,
                             BuyerAlarmRepository buyerAlarmRepository,
                             BuyerAlarmConverter buyerAlarmConverter ,
                             LikesService likesService) {
        this.userRepository = userRepository;
        this.postRepository = postRepository;
        this.likesService = likesService;
        this.buyerAlarmRepository= buyerAlarmRepository;
        this.buyerAlarmConverter = buyerAlarmConverter;
    }

    @Transactional
    public List<BuyerAlarm> saveAlarm(User seller) {
        // 1. 현재 seller 를 likes한 유저(buyer)들을 모두 구한다.
        List<LikesUserBuyerResponse> likesUserResponses = likesService.buyerLikesList(seller);
        // 2. 구한 buyer들과  ,seller 를 이용해 BuyerAlarm 으로 이용해 alarm 저장
        List<BuyerAlarm> buyerAlarmList = new ArrayList<>();
        for (LikesUserBuyerResponse likesUserResponse: likesUserResponses) {
            User buyer = userRepository.findById(likesUserResponse.getBuyer().getId()).get();
            BuyerAlarm buyerAlarm = buyerAlarmConverter.ConvertUserBuyerSellerAlarm(buyer, seller, new Timestamp(System.currentTimeMillis()));
            buyerAlarmList.add(buyerAlarmRepository.save(buyerAlarm));
        }
        return buyerAlarmList;
    }


    @Transactional
    public BuyerAlarmResponse deleteBuyerAlarm(Long buyerAlarmId) {
        BuyerAlarm buyerAlarm = buyerAlarmRepository.findById(buyerAlarmId).get();
        buyerAlarm.delete();
        return new BuyerAlarmResponse(buyerAlarm);
    }


    public UserBuyerAlarmResponse userBuyerAlarm(User user) {
        return userRepository.findById(user.getId()).map(UserBuyerAlarmResponse::new).orElseThrow();
    }
}
