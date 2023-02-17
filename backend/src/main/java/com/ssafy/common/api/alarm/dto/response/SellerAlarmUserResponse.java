package com.ssafy.common.api.alarm.dto.response;

import com.ssafy.common.api.alarm.domain.SellerAlarm;
import lombok.Getter;

@Getter
public class SellerAlarmUserResponse {

    private final SellerAlarmResponse sellerAlarmResponse;

    private final Long SellerAlarmId;

    public SellerAlarmUserResponse(SellerAlarm sellerAlarm) {
        sellerAlarmResponse= new SellerAlarmResponse(sellerAlarm);
        SellerAlarmId=sellerAlarm.getId();
    }
}
