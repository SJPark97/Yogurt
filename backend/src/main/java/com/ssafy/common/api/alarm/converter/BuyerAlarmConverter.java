package com.ssafy.common.api.alarm.converter;

import com.ssafy.common.api.alarm.domain.AlarmStatus;
import com.ssafy.common.api.alarm.domain.BuyerAlarm;
import com.ssafy.common.api.alarm.domain.SellerAlarm;
import com.ssafy.common.api.post.domain.Post;
import com.ssafy.common.api.user.domain.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.sql.Timestamp;

@Component
@RequiredArgsConstructor
public class BuyerAlarmConverter {

    private final AlarmStatus status = AlarmStatus.STATUS_ACTIVE;

    public BuyerAlarm ConvertUserBuyerSellerAlarm( User buyer, User seller ,Timestamp time){
        return BuyerAlarm.builder()
                .seller(seller)
                .buyer(buyer)
                .created(time)
                .status(this.status)
                .build();
    }

}
