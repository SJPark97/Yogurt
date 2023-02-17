package com.ssafy.common.api.live.dto.response;

import com.ssafy.common.api.live.domain.LiveRoom;
import com.ssafy.common.api.live.domain.LiveRoomStatus;
import com.ssafy.common.api.post.dto.response.PostDetailResponse;
import lombok.Getter;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Getter
public class SellerLiveroomForm {
    private  final Long liveroomId;

    private final Timestamp time;

    private final String title;
    private final LiveRoomStatus status;
    private  final String thumbnail;
    private final List<LivelistResponseForm> liveLists;
    public SellerLiveroomForm(LiveRoom liveRoom) {
        this.liveroomId = liveRoom.getId();
        this.thumbnail = liveRoom.getThumbnail();
        this.title = liveRoom.getTitle();
        this.time = liveRoom.getTime();
        this.status = liveRoom.getStatus();
        this.liveLists = liveRoom.getLiveLists().stream().map(liveList ->  new LivelistResponseForm(liveList))
                .collect(Collectors.toList());

    }

}
