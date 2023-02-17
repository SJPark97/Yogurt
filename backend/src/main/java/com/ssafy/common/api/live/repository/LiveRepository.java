package com.ssafy.common.api.live.repository;

import com.ssafy.common.api.live.domain.LiveRoom;
import com.ssafy.common.api.live.domain.LiveRoomStatus;
import com.ssafy.common.api.user.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
@Transactional
public interface LiveRepository extends JpaRepository<LiveRoom, Long> {

//    <Optional>  LiveRoom  findByUserId(Long id);
    <Optional> List<LiveRoom> findAllBySeller(User user);
    <Optional> List<LiveRoom> findByStatus(LiveRoomStatus liveRoomStatus);
//    <Optional>List<LiveRoom> findALLByRoleAndNickNameContains(String role,String keyword);

}
