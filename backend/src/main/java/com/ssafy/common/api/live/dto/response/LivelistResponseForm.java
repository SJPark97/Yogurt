package com.ssafy.common.api.live.dto.response;

import com.ssafy.common.api.live.domain.LiveList;
import lombok.Getter;

@Getter
public class LivelistResponseForm {
    private final  Long id;

    private final  Long liveroomId;

    private  final Long postId;


    public LivelistResponseForm(LiveList liveList) {
        this.id = liveList.getId();
        this.liveroomId=liveList.getId();
        this.postId=liveList.getId();
    }
}
