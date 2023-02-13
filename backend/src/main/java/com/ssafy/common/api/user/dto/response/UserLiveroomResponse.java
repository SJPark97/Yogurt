package com.ssafy.common.api.user.dto.response;

import com.ssafy.common.api.live.domain.LiveRoomStatus;
import com.ssafy.common.api.live.dto.response.SellerLiveroomForm;
import com.ssafy.common.api.user.domain.User;
import lombok.Getter;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Getter
@Transactional
public class UserLiveroomResponse {
    private  final Long id;

    private final List<SellerLiveroomForm> sellerLiveroomFormList;

    public UserLiveroomResponse(User user) {
        id = user.getId();
        sellerLiveroomFormList = user.getLiveRooms()
                .stream().filter(liveRoom -> liveRoom.getStatus()!= LiveRoomStatus.STATUS_CLOSE)
                .map(liveRoom -> new SellerLiveroomForm(liveRoom))
                .collect(Collectors.toList());
    }

}
