package com.ssafy.common.api.user.dto;

import com.ssafy.common.api.live.domain.LiveRoom;
import com.ssafy.common.api.live.dto.response.SellerLiveroomForm;
import com.ssafy.common.api.relation.dto.Likes.LikesUserResponse;
import com.ssafy.common.api.user.domain.User;
import lombok.Getter;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
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
                .stream().map(liveRoom -> new SellerLiveroomForm(liveRoom))
                .collect(Collectors.toList());
    }

}
