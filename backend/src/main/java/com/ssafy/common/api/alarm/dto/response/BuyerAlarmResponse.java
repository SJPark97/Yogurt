package com.ssafy.common.api.alarm.dto.response;


import com.ssafy.common.api.alarm.domain.AlarmStatus;
import com.ssafy.common.api.alarm.domain.BuyerAlarm;
import lombok.Getter;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;

@Transactional
@Getter
public class BuyerAlarmResponse {

    private final Long id;

    private final Long buyer_id;

    private final Long seller_id;

    private final Timestamp created;

    private final AlarmStatus status;

    private final String seller_nickname;


    public BuyerAlarmResponse(BuyerAlarm buyerAlarm) {
        id= buyerAlarm.getId();
        buyer_id = buyerAlarm.getBuyer().getId();
        seller_id = buyerAlarm.getSeller().getId();
        seller_nickname = buyerAlarm.getSeller().getNickName();
        //판매자 닉네임 , 라이브 일시
        created=buyerAlarm.getCreated();
        status = buyerAlarm.getStatus();
    }
}
