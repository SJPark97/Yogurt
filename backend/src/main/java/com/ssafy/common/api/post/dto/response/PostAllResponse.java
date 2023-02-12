package com.ssafy.common.api.post.dto.response;

import com.ssafy.common.api.post.domain.Post;
import com.ssafy.common.api.post.domain.PostStatus;
import com.ssafy.common.api.post.postimage.dto.PostImageDto;
import lombok.Getter;

import java.util.List;
import java.util.stream.Collectors;


@Getter
public class PostAllResponse {
    private final Long id;
    private final String brCateName;
    private final Long brCateId;
    private final String title;
    private final Long price;
    private final Long sale_price;
    private final PostStatus status;
    private final Long sellerId;
    private final String sellerName;
    private final List<PostImageDto> postImages;
    private final int likesCount;

    public  PostAllResponse(Post post){
        id = post.getId();
        sellerId = post.getSeller().getId();
        sellerName = post.getSeller().getNickName();
        title = post.getTitle();
        brCateName = post.getBrandcategory().getName();
        brCateId= post.getBrandcategory().getId();
        price = post.getPrice();
        status = post.getStatus();
        sale_price = post.getSale_price();
        postImages = post.getPostImages()
                .stream().map(PostImageDto::new)
                        .collect(Collectors.toList());
        likesCount = post.getZzims().size();
    }
}
