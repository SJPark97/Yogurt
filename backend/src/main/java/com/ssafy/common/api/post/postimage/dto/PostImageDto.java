package com.ssafy.common.api.post.postimage.dto;

import com.ssafy.common.api.post.postimage.domain.Postimage;
import lombok.Getter;

@Getter
public class PostImageDto {
    private final String url;
    public PostImageDto(Postimage postimage){
        url = postimage.getUrl();
    }
}
