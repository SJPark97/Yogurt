package com.ssafy.common.api.live.dto.response;


import com.ssafy.common.api.live.domain.LiveRoom;
import lombok.Getter;

import java.sql.Timestamp;

@Getter
public class OnairLiveroomResponseForm {
    private  final Long liveroomId;

    private final Timestamp time;

    private final String title;

    private  final String thumbnail;

    private final Long sellerId;
    private final String sellerName;
    public OnairLiveroomResponseForm(LiveRoom liveRoom) {
        this.liveroomId = liveRoom.getId();
        this.thumbnail = liveRoom.getThumbnail();
        this.title = liveRoom.getTitle();
        this.time = liveRoom.getTime();
        this.sellerId=liveRoom.getSeller().getId();
        this.sellerName= liveRoom.getSeller().getNickName();
    }
}
