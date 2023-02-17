package com.ssafy.common.api.post.dto.response;

import com.ssafy.common.api.post.domain.Post;
import com.ssafy.common.api.post.domain.PostStatus;
import com.ssafy.common.api.post.postimage.domain.Postimage;
import com.ssafy.common.api.post.postimage.dto.PostImageDto;
import com.ssafy.common.api.relation.domain.RelationStatus;
import lombok.Getter;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Getter
@Transactional
public class PostDetailResponse {
    private final Long id;
    private final String title;
    private final String content;
    private final Long price;
    private final Long sale_price;
    private final PostStatus status;
    private final String size;
    private final Long brCateId;
    private final String brCateName;
    private final Long typeCateId;
    private final String typeCateName;
    private final List<PostImageDto> postImages;
    private final Long sellerId;
    private final String sellerName;
    private final int likesCount;

    public PostDetailResponse(Post post) {
        id = post.getId();
        title = post.getTitle();
        content = post.getContent();
        price = post.getPrice();
        sale_price = post.getSale_price();
        status = post.getStatus();
        size = post.getSize();
        brCateId = post.getBrandcategory().getId();
        brCateName = post.getBrandcategory().getName();
        typeCateId = post.getTypecategory().getId();
        typeCateName = post.getTypecategory().getName();
        postImages = post.getPostImages()
                .stream().map(PostImageDto::new)
                .collect(Collectors.toList());
        sellerId = post.getSeller().getId();
        sellerName = post.getSeller().getNickName();
        likesCount = post.getZzims().stream().filter(zzim -> zzim.getStatus()!= RelationStatus.STATUS_DELETE) .collect(Collectors.toList()).size();
    }
}
