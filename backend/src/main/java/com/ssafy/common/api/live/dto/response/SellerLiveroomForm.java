package com.ssafy.common.api.live.dto.response;

import com.ssafy.common.api.live.domain.LiveRoom;
import lombok.Getter;

import java.sql.Timestamp;

@Getter
public class SellerLiveroomForm {
    private  final Long id;

    private final Timestamp time;

    private final String title;

    private  final String thumbnail;

    public SellerLiveroomForm(LiveRoom liveRoom) {
        this.id = liveRoom.getId();
        this.thumbnail = liveRoom.getThumbnail();
        this.title = liveRoom.getTitle();
        this.time = liveRoom.getTime();
    }

}
