package com.ssafy.common.api.post.dto.response;

import com.ssafy.common.api.post.domain.Post;
import com.ssafy.common.api.post.domain.PostStatus;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;

@Getter
@EqualsAndHashCode
@Transactional
public class PostInsertResponse{
    private Long id;
    private String title;
    private String content;
    private Long price;
    private Long sale_price;
    private PostStatus status;
    private String size;

    public PostInsertResponse(Post post) {
        this.id = post.getId();
        this.title = post.getTitle();
        this.content = post.getContent();
        this.price = post.getPrice();
        this.sale_price = post.getSale_price();
        this.status = post.getStatus();
        this.size = post.getSize();
    }
}
