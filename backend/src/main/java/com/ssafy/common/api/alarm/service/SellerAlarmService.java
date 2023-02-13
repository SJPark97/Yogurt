package com.ssafy.common.api.alarm.service;

import com.ssafy.common.api.alarm.converter.SellerAlarmConverter;
import com.ssafy.common.api.alarm.domain.SellerAlarm;
import com.ssafy.common.api.alarm.dto.response.SellerAlarmResponse;
import com.ssafy.common.api.alarm.repository.SellerAlarmRepository;
import com.ssafy.common.api.post.domain.Post;
import com.ssafy.common.api.post.repository.PostRepository;
import com.ssafy.common.api.user.domain.User;
import com.ssafy.common.api.user.dto.response.UserSellerAlarmResponse;
import com.ssafy.common.api.user.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;

@Service
@Transactional(readOnly = true)
public class SellerAlarmService {
    private final PostRepository postRepository;
    private final UserRepository userRepository;
    private final SellerAlarmConverter sellerAlarmConverter;
    private  final SellerAlarmRepository sellerAlarmRepository;
    public SellerAlarmService(PostRepository postRepository, UserRepository userRepository, SellerAlarmRepository sellerAlarmRepository, SellerAlarmConverter sellerAlarmConverter) {
        this.userRepository = userRepository;
        this.postRepository = postRepository;
        this.sellerAlarmRepository= sellerAlarmRepository;
        this.sellerAlarmConverter = sellerAlarmConverter;
    }


    //DB 에 저장하는 메소드
    @Transactional
    public SellerAlarm saveAlarm(Long postId, Long userId) {
        Post post = postRepository.findById(postId).get();
        User user = userRepository.findById(userId).get();
        SellerAlarm sellerAlarm = sellerAlarmConverter.ConvertUserPostSellerAlarm(user,post,new Timestamp(System.currentTimeMillis()));
         sellerAlarmRepository.save(sellerAlarm);
        return sellerAlarm;
    }

    public UserSellerAlarmResponse userSellerAlarm(User user) {
        return userRepository.findById(user.getId()).map(UserSellerAlarmResponse::new).orElseThrow();
    }
    @Transactional
    public SellerAlarmResponse deleteSellerAlarm (Long seller_id) {
        SellerAlarm sellerAlarm = sellerAlarmRepository.findById(seller_id).get();
        sellerAlarm.delete();
        return new SellerAlarmResponse(sellerAlarm);

    }

}
