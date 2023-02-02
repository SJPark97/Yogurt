package com.ssafy.common.api.live.repository;

import com.ssafy.common.api.live.domain.LiveRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
@Transactional
public interface LiveRepository extends JpaRepository<LiveRoom, Long> {

//    <Optional> LiveRoom findByName(String name); // 이름으로 User 찾아오는 메소드
//
//    <Optional>  LiveRoom  findByUserId(Long id);
//    <Optional> List<LiveRoom> findAllByRole(String role);
//    <Optional>List<LiveRoom> findALLByRoleAndNickNameContains(String role,String keyword);

}
