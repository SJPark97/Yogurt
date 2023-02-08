package com.ssafy.common.api.alarm.service;

import com.ssafy.common.api.alarm.converter.BuyerAlarmConverter;
import com.ssafy.common.api.alarm.domain.BuyerAlarm;
import com.ssafy.common.api.alarm.domain.SellerAlarm;
import com.ssafy.common.api.alarm.repository.BuyerAlarmRepository;
import com.ssafy.common.api.post.repository.PostRepository;
import com.ssafy.common.api.relation.service.LikesService;
import com.ssafy.common.api.user.domain.User;
import com.ssafy.common.api.user.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

    public BuyerAlarm saveAlarm(User sellerId) {
        // 1. 현재 seller 를 likes한 유저(buyer)들을 모두 구한다.

        // 2. 구한 buyer들과  ,seller 를 이용해 BuyerAlarm 으로 이용해 alarm 저장

        return null;
    }
}
