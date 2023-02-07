package com.ssafy.common.api.notice.dto;

import com.ssafy.common.api.notice.domain.Notice;
import com.ssafy.common.api.post.domain.PostStatus;
import lombok.Getter;

@Getter
public class NoticeResponse {
    private Long id;
    private String title;
    private String content;
    private PostStatus status;
    public NoticeResponse(Notice notice){
        id = notice.getId();
        title = notice.getTitle();
        content = notice.getContent();
        status = notice.getStatus();
    }
}
