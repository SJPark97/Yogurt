package com.ssafy.common.api.user.dto.response;

import com.ssafy.common.api.relation.domain.RelationStatus;
import com.ssafy.common.api.relation.dto.zzim.ZzimUserPostResponse;
import com.ssafy.common.api.user.domain.User;
import lombok.Getter;


import java.util.List;
import java.util.stream.Collectors;
@Getter
public class UserZzimResponse {
    private final Long id;
    private final List<ZzimUserPostResponse> zzims;
    public UserZzimResponse(User user){
        id = user.getId();
        zzims = user.getZzims()
                .stream().map(zzim -> new ZzimUserPostResponse(zzim))
                .filter(zzimUserPostResponse -> zzimUserPostResponse.getStatus()!= RelationStatus.STATUS_DELETE)
                .collect(Collectors.toList());
    }
}