package com.ssafy.common.api.chat.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.common.api.chat.domain.ChatMessage;
import com.ssafy.common.api.chat.repository.ChatRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class ChatService {

    private final ChannelTopic channelTopic;
    private final RedisTemplate redisTemplate;
    private final ChatRepository chatRepository;

    /**
     * destination정보에서 roomId 추출
     */
    public String getRoomId(String destination) {
        int lastIndex = destination.lastIndexOf('/');
        if (lastIndex != -1)
            return destination.substring(lastIndex + 1);
        else
            return "";
    }

    /**
     * 채팅방에 메시지 발송
     */
    public void sendChatMessage(ChatMessage chatMessage) {
        chatMessage.setUserCount(chatRepository.getUserCount(chatMessage.getRoomId()));
        redisTemplate.convertAndSend(channelTopic.getTopic(), chatMessage);
    }
    public long getUserCount(String roomId){
        return chatRepository.getUserCount(roomId);
    }
}
