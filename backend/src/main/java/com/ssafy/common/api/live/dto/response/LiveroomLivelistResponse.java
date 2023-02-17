package com.ssafy.common.api.live.dto.response;


import com.ssafy.common.api.live.domain.LiveRoom;
import com.ssafy.common.api.live.domain.LivelistStatus;
import lombok.Getter;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Getter
@Transactional
public class LiveroomLivelistResponse {
    private final Long id;

    private final List<LivelistResponseForm> liveLists;

    public LiveroomLivelistResponse(LiveRoom liveRoom){
        this.id = liveRoom.getId();
        this.liveLists = liveRoom.getLiveLists()
                .stream()
                .filter(liveList -> liveList.getStatus()!= LivelistStatus.STATUS_DELETE)
                .map(liveList -> new LivelistResponseForm(liveList))
                .collect(Collectors.toList());
    }




}
