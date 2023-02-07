package com.ssafy.common.api.notice.dto.response;

import lombok.Getter;

import java.sql.Timestamp;

@Getter
public class ResponseNoticeForm {
    private String title;
    private String content;
    private Timestamp created;
}
