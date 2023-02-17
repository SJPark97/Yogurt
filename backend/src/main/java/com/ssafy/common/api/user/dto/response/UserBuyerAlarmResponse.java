package com.ssafy.common.api.user.dto.response;

import com.ssafy.common.api.alarm.domain.AlarmStatus;
import com.ssafy.common.api.alarm.dto.response.BuyerAlarmUserResponse;
import com.ssafy.common.api.alarm.dto.response.SellerAlarmUserResponse;
import com.ssafy.common.api.user.domain.User;
import lombok.Getter;

import java.util.List;
import java.util.stream.Collectors;


@Getter
public class UserBuyerAlarmResponse {
    private final Long id;
    private final List<BuyerAlarmUserResponse> buyerAlarmUserResponses;
    public UserBuyerAlarmResponse(User user){
        id = user.getId();
        buyerAlarmUserResponses = user.getBuyerAlarms()
                .stream().map(buyerAlarm ->
                        // delete가 아닌 알람만 조회
//                        sellerAlarm.getStatus()== AlarmStatus.STATUS_DELETE? :
                        new BuyerAlarmUserResponse(buyerAlarm))
                .filter(buyerAlarmUserResponse -> buyerAlarmUserResponse.getBuyerAlarmResponse().getStatus()== AlarmStatus.STATUS_ACTIVE)
                .collect(Collectors.toList());
    }
}
