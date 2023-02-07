package com.ssafy.common.api.notice.dto.request;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class RequestNoticeForm {
    private String title;
    private String content;

}
