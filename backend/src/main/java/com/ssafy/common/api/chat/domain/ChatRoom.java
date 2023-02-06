package com.ssafy.common.api.chat.domain;

import com.ssafy.common.api.chat.service.ChatService;
import lombok.Builder;
import lombok.Data;
import org.springframework.web.socket.WebSocketSession;

import java.util.UUID;

@Data
@Builder
public class ChatRoom {

    private String roomId;
    private String name;
    private long userCount; // 채팅방 인원수

}
