package com.ssafy.common.api.live.converter;


import com.ssafy.common.api.live.domain.LiveList;
import com.ssafy.common.api.live.domain.LiveRoom;
import com.ssafy.common.api.live.domain.LivelistStatus;
import com.ssafy.common.api.post.domain.Post;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class LiveitemConverter {

    public LiveList MakeLiveItem(Post post , LiveRoom liveRoom){
        return LiveList.builder()
                .post(post)
                .liveRoom(liveRoom)
                .status(LivelistStatus.STATUS_ACTIVE)
                .build();
    }
}
