package com.ssafy.common.api.notice.converter;

import com.ssafy.common.api.notice.domain.Notice;
import com.ssafy.common.api.notice.dto.NoticeInsertRequest;
import com.ssafy.common.api.post.domain.PostStatus;
import com.ssafy.common.api.user.domain.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class NoticeConverter {
    public Notice createNoticeRequestDtoToEntity(NoticeInsertRequest request, User user){
        return Notice.builder()
                .title(request.getTitle())
                .content(request.getContent())
                .seller(user)
                .status(PostStatus.STATUS_SELL)
                .build();
    }
}
