package com.ssafy.common.api.chat.domain;

import lombok.Builder;
import lombok.Data;

import java.io.Serializable;

@Data
@Builder
public class ChatMessage implements Serializable {

    private String roomId; // 방번호
    private String sender; // 메시지 보낸사람
    private String message; // 메시지
    private long userCount;  // 채팅방 인원수, 채팅방 내에서 메시지가 전달될때 인원수 갱신시 사용
    private String img; // 유저 이미지(ENTER 시점에 캐싱)
    private long userSeq; // 유저 아이디
}
