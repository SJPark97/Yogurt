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


    public BuyerAlarmResponse(BuyerAlarm buyerAlarm) {
        id= buyerAlarm.getId();
        buyer_id = buyerAlarm.getBuyer().getId();
        seller_id = buyerAlarm.getSeller().getId();
        created=buyerAlarm.getCreated();
        status = buyerAlarm.getStatus();
    }
}
