package com.ssafy.common.api.post.dto.response;

import com.ssafy.common.api.post.domain.Post;
import lombok.EqualsAndHashCode;
import lombok.Getter;

import java.sql.Timestamp;

@Getter
@EqualsAndHashCode
public class PostInsertResponse{
    private Long id;
    private String title;
    private String content;
    private Long price;
    private Long sale_price;
    private Long status;
    private String size;
    private Timestamp created;
    private Timestamp updated;


    public PostInsertResponse(Post post){
        this.id = post.getId();
        this.title = post.getTitle();
        this.content = post.getContent();
        this.price = post.getPrice();
        this.sale_price = post.getSale_price();
        this.status = post.getStatus();
        this.size = post.getSize();
        this.created = post.getCreated();
        this.updated = post.getUpdated();
    }
}
