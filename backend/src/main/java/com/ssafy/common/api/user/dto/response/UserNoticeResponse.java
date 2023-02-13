package com.ssafy.common.api.user.dto.response;

import com.ssafy.common.api.notice.dto.NoticeResponse;
import com.ssafy.common.api.post.domain.PostStatus;
import com.ssafy.common.api.user.domain.User;
import lombok.Getter;

import java.util.List;
import java.util.stream.Collectors;

@Getter
public class UserNoticeResponse {
    private final Long id;
    private final List<NoticeResponse> notices;
    public UserNoticeResponse(User user){
        id = user.getId();
        notices = user.getNotices()
                .stream().map(NoticeResponse::new)
                .filter(noticeResponse -> noticeResponse.getStatus()!= PostStatus.STATUS_DELETE)
                .collect(Collectors.toList());
    }
}
