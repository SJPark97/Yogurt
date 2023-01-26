package com.ssafy.common.api.post.dto.response;

import com.ssafy.common.api.post.Post;
import com.ssafy.common.api.post.postimage.Postimage;
import lombok.Getter;
import java.sql.Timestamp;
import java.util.List;

@Getter
public class PostDetailResponse {
    private final Long id;
    private final String title;
    private final String content;
    private final Long price;
    private final Long sale_price;
    private final Long status;
    private final String size;
    private final Timestamp created;
    private final Timestamp updated;
    private final Long brCateId;
    private final Long typeCateId;
    private final List<Postimage> postImages;

    public PostDetailResponse(Post post){
        id = post.getId();
        title = post.getTitle();
        content = post.getContent();
        price = post.getPrice();
        sale_price = post.getSale_price();
        status = post.getStatus();
        size = post.getSize();
        created = post.getCreated();
        updated = post.getUpdated();
        brCateId = post.getBrandcategory().getId();
        typeCateId = post.getTypecategory().getId();
        postImages = post.getPostImages();
    }


}
