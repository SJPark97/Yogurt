package com.ssafy.common.api.chat.controller;

import com.ssafy.common.api.chat.domain.ChatMessage;
import com.ssafy.common.api.chat.service.ChatService;
import com.ssafy.common.api.user.domain.User;
import com.ssafy.common.api.user.service.UserService;
import com.ssafy.common.config.JwtProvider;
import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@Slf4j
public class ChatController {

    private final ChatService chatService;
    private final JwtProvider jwtProvider;
    private final UserService userService;
    private final ChannelTopic channelTopic;
    private final RedisTemplate<String, Object> redisTemplate;

    /**
     * websocket "/pub/chat/message"로 들어오는 메시징을 처리한다.
     */
    @MessageMapping("/chat/message")
    public void message(ChatMessage message, @Header("Authorization") String token) {
        // Websocket에 발행된 메시지를 redis로 발행한다(publish)
        Claims claim = jwtProvider.getClaim(token);
        String userId = claim.getId();
        User user = userService.findByUserId(userId);

        message.setSender(userId);
        message.setImg(user.getProfileImage());
        // Websocket에 발행된 메시지를 redis로 발행한다(publish). redisTemplate을 통해 바로 ChannelTopic으로 메시지를 발행
        redisTemplate.convertAndSend(channelTopic.getTopic(), message);
        //발행한 메세지 저장
        chatService.sendChatMessage(message);
    }
}
