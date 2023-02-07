package com.ssafy.common.api.live.dto.response;


import com.ssafy.common.api.live.domain.LiveRoom;
import lombok.Getter;

import java.sql.Timestamp;

@Getter
public class OnairLiveroomResponseForm {
    private  final Long id;

    private final Timestamp time;

    private final String title;

    private  final String thumbnail;

    private final Long sellerId;
    public OnairLiveroomResponseForm(LiveRoom liveRoom) {
        this.id = liveRoom.getId();
        this.thumbnail = liveRoom.getThumbnail();
        this.title = liveRoom.getTitle();
        this.time = liveRoom.getTime();
        this.sellerId=liveRoom.getSeller().getId();
    }
}
