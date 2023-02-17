package com.ssafy.common.api.user.dto.response;

import com.ssafy.common.api.alarm.domain.AlarmStatus;
import com.ssafy.common.api.alarm.dto.response.SellerAlarmUserResponse;
import com.ssafy.common.api.relation.dto.zzim.ZzimUserPostResponse;
import com.ssafy.common.api.user.domain.User;
import lombok.Getter;

import java.util.List;
import java.util.stream.Collectors;

@Getter
public class UserSellerAlarmResponse {
    private final Long id;
    private final List<SellerAlarmUserResponse> sellerAlarmUserResponses;
    public UserSellerAlarmResponse(User user){
        id = user.getId();
        sellerAlarmUserResponses = user.getSellerAlarms()
                .stream().map(sellerAlarm ->

                        // delete가 아닌 알람만 조회
//                        sellerAlarm.getStatus()== AlarmStatus.STATUS_DELETE? :
                        new SellerAlarmUserResponse(sellerAlarm))
                .filter(sellerAlarmUserResponse -> sellerAlarmUserResponse.getSellerAlarmResponse().getStatus()==AlarmStatus.STATUS_ACTIVE)
                .collect(Collectors.toList());
    }
}
