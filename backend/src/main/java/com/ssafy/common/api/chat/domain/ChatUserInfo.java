package com.ssafy.common.api.chat.domain;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ChatUserInfo {

    private String roomId; // 방번호
    private String sender; // 유저 이름
    private String userSeq; // 유저 번호

}
