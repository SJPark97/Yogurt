package com.ssafy.common.api.user.dto;

import com.ssafy.common.api.relation.dto.ZzimUserPostResponse;
import com.ssafy.common.api.user.domain.User;
import lombok.Getter;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;
@Getter
@Transactional
public class UserZzimResponse {
    private final Long id;
    private final List<ZzimUserPostResponse> zzims;
    public UserZzimResponse(User user){
        id = user.getId();
        zzims = user.getZzims()
                .stream().map(zzim -> new ZzimUserPostResponse(zzim))
                .collect(Collectors.toList());
    }
}