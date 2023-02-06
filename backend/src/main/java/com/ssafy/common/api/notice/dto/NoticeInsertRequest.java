package com.ssafy.common.api.notice.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class NoticeInsertRequest {
    private String title;
    private String content;
}
