package com.ssafy.common.handler;

import com.ssafy.common.api.chat.domain.ChatUserInfo;
import com.ssafy.common.api.chat.repository.ChatRepository;
import com.ssafy.common.api.chat.service.ChatService;
import com.ssafy.common.api.user.domain.User;
import com.ssafy.common.api.user.service.UserService;
import com.ssafy.common.config.JwtProvider;
import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;

import java.util.Optional;

/**
 * Websocket 연결 시 요청 header의 jwt token 유효성을 검증하는 코드를 다음과 같이 추가
 * 유효하지 않을 경우 예외 처리
 *
 * 입장시 이벤트 : StompCommand.SUBSCRIBE ; 인원수를 +1 갱신하여 캐시에 저장. 정보(sessionId와 roomId)를 조합하여 캐시를 남김.
 * 퇴장시 이벤트 : StompCommand.DISCONNECT ; 캐시에 저장된 정보로 채팅방 정보를 얻어, 인원수를 -1 갱신하여 캐시에 저장
 */

@Slf4j
@RequiredArgsConstructor
@Configuration
public class StompHandler implements ChannelInterceptor {

    private final ChatService chatService;
    private final ChatRepository chatRepository;
    private final JwtProvider jwtProvider;
    private final UserService userService;

    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {
        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message);
        String token = accessor.getFirstNativeHeader("Authorization");
        /**
            session의 connect와 discoonect를 할 때 정보를 가져 올 수 있다.
         */
        if(StompCommand.SUBSCRIBE == accessor.getCommand()) {
            String roomId = chatService.getRoomId(Optional.ofNullable((String) message.getHeaders().get("simpDestination")).orElse("invalidRoomId"));
            String sessionId = (String) message.getHeaders().get("simpSessionId");

            chatRepository.plusUserCount(roomId);

            String name = "익명이";
            String userSeq = null;

            Claims claim = jwtProvider.getClaim(token);
            String id = (String)claim.get("userId");
            User user = userService.findByUserId(id);

            name = user.getNickName();
            userSeq = String.valueOf(user.getId());

            ChatUserInfo info = ChatUserInfo.builder()
                    .sender(name)
                    .userSeq(userSeq)
                    .roomId(roomId)
                    .build();
            //채팅방에 들어온 클라이언트를 roomId와 매핑
            chatRepository.setUserEnterInfo(sessionId, info);
        }else if(StompCommand.DISCONNECT == accessor.getCommand()){//websocket 연결 종료
            String sessionId = (String) message.getHeaders().get("simpSessionId");

            ChatUserInfo chatUserInfo = chatRepository.getUserEnterRoomId(sessionId);
            String roomId = chatUserInfo.getRoomId().replaceFirst("playroom-", "");

            //방에서 해당 유저--
            chatRepository.removeUserEnterInfo(sessionId);
            chatRepository.minusUserCount(roomId);
        }
        return message;
    }
}
