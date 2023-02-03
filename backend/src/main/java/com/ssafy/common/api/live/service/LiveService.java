package com.ssafy.common.api.live.service;

import com.ssafy.common.api.live.domain.LiveRoom;
import com.ssafy.common.api.live.dto.request.LiveroomRegistForm;
import com.ssafy.common.api.live.repository.LiveRepository;
import com.ssafy.common.api.user.domain.User;
import com.ssafy.common.config.auth.PrincipalDetails;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.annotation.Aspect;
import org.jetbrains.annotations.NotNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;

import static com.ssafy.common.api.live.domain.LiveRoomStatus.STATUS_READY;
@Slf4j
@Service
@RequiredArgsConstructor
public class LiveService {

    public final LiveRepository liveRepository;
    // 라이브 등록
    // time , title , thumbnail 은 requset로 받았고
    // status , created , sellerId는 내가 만들어서 생성
    public LiveRoom saveLiveroom (@NotNull LiveroomRegistForm request ){
        LiveRoom liveRoom = new LiveRoom();
        Timestamp ts = new Timestamp(System.currentTimeMillis());

        liveRoom= liveRoom.builder()
                .thumbnail(request.getThumbnail())
                .title(request.getTitle())
                .time(request.getTime())
                .status(STATUS_READY)
                .created(ts)
                .seller(getLoginUser())
                .build();
        log.info("--------------- now ---------------- :  {}",liveRoom.getSeller().getId() );

        liveRepository.save(liveRoom);
        return null;
    }


    public User getLoginUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        PrincipalDetails principal = (PrincipalDetails) authentication.getPrincipal();
        log.info("principal : {}",principal.getUser());
        return principal.getUser();
    }

}
