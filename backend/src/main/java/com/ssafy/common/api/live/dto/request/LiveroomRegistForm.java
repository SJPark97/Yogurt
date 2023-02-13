package com.ssafy.common.api.live.dto.request;

import com.ssafy.common.api.post.domain.Post;
import lombok.Builder;
import lombok.Getter;

import java.sql.Timestamp;
import java.util.List;

@Getter
@Builder
public class LiveroomRegistForm {
    private  String title;

    private String thumbnail ;

    private Timestamp time ;

    private List<Long> postIds;
}