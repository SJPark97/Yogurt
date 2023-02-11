package com.ssafy.common.api.alarm.dto.response;


import com.ssafy.common.api.alarm.domain.AlarmStatus;
import com.ssafy.common.api.alarm.domain.SellerAlarm;
import lombok.Getter;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;

@Transactional
@Getter
public class SellerAlarmResponse {
    private final Long id;

    private final Long post_id;

    private final Long user_id;

    private final Timestamp created;

    private final AlarmStatus status;
    private  final  String image_url;

    private  final String post_name;
    public SellerAlarmResponse(SellerAlarm sellerAlarm) {
        id =sellerAlarm.getId();
        post_id = sellerAlarm.getPost().getId();
        post_name = sellerAlarm.getPost().getTitle();
        user_id = sellerAlarm.getSeller().getId();
        created=sellerAlarm.getCreated();
        status=sellerAlarm.getStatus();
        image_url=sellerAlarm.getPost().getPostImages().get(0).getUrl();
    }
}
