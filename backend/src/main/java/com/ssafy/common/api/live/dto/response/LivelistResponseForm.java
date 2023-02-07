package com.ssafy.common.api.live.dto.response;

import com.ssafy.common.api.live.domain.LiveList;
import com.ssafy.common.api.live.domain.LivelistStatus;
import io.swagger.annotations.ApiModelProperty;
import io.swagger.annotations.ApiParam;
import lombok.Getter;

@Getter
public class LivelistResponseForm {

    @ApiModelProperty(example="2023-02-01T11:22:11.000")
    @ApiParam(value = "created")
    private final  Long id;

    private final  Long liveroomId;

    private  final Long postId;

    private final LivelistStatus status;

    public LivelistResponseForm(LiveList liveList) {
        this.id = liveList.getId();
        this.liveroomId=liveList.getId();
        this.postId=liveList.getId();
        this.status = liveList.getStatus();
    }
}
