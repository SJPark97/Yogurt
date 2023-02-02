package com.ssafy.common.api.live.repository;


import com.ssafy.common.api.live.domain.LiveRoom;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;


@Repository
@RequiredArgsConstructor
public class LiverRepository {


    private final EntityManager em;


    // 인자로 받은 정보로 mysql에 liveroom을 저장하는 메소드
    public void save(LiveRoom liveRoom) {
        if (  liveRoom.getId() ==  null) {
            em.persist(liveRoom);
        } else {
            em.merge( liveRoom);
        }
    }

    // 판매자의 아이디를 입력 받고 ,
    // 해당 판매자의 예정중이거나 라이브중인 라이브 조회
    public LiveRoom findOnairRoom(Long id){
        return null;
    }

    // 라이브 상태를 수정
    // STATUS_READY -> STATUS_ONAIR
    // STATUS_ONAIR -> STATUS_CLOSE


    //  라이브 중인 라이브룸 조회




}
