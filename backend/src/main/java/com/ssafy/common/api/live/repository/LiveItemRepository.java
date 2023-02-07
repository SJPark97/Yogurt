package com.ssafy.common.api.live.repository;

import com.ssafy.common.api.live.domain.LiveList;
import com.ssafy.common.api.live.domain.LiveRoom;
import com.ssafy.common.api.user.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
public interface LiveItemRepository extends JpaRepository <LiveList ,Long> {
    <Optional> List<LiveList> findAllByLiveRoom(LiveRoom liveRoom);
}
