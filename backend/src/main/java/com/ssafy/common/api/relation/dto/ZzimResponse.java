package com.ssafy.common.api.relation.dto;

import com.ssafy.common.api.relation.domain.Zzim;
import lombok.Builder;
import lombok.Getter;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
@Transactional
@Getter
public class ZzimResponse {
    private final Long id;
    private final Long buyerId;
    private final Long postId;
    private final String status;
    public ZzimResponse(Zzim zzim){
        id = zzim.getId();
        buyerId = zzim.getBuyer().getId();
        postId = zzim.getPost().getId();
        status = zzim.getStatus();
    }
}






