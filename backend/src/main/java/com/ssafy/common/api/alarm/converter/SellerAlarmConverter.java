package com.ssafy.common.api.alarm.converter;

import com.ssafy.common.api.alarm.domain.AlarmStatus;
import com.ssafy.common.api.alarm.domain.SellerAlarm;
import com.ssafy.common.api.post.domain.Post;
import com.ssafy.common.api.user.domain.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.sql.Timestamp;

@Component
@RequiredArgsConstructor
public class SellerAlarmConverter {
    private final AlarmStatus status= AlarmStatus.STATUS_ACTIVE;

    public SellerAlarm ConvertUserPostSellerAlarm(User user , Post post, Timestamp time){
        return SellerAlarm.builder()
                .seller(user)
                .post(post)
                .created(time)
                .status(this.status)
                .build();
    }
}
