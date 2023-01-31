package com.ssafy.common.api.post.domain;

import com.ssafy.common.api.category.brandcategory.Brandcategory;
import com.ssafy.common.api.category.typecategory.Typecategory;
import com.ssafy.common.api.post.dto.request.PostUpdateRequest;
import com.ssafy.common.api.post.postimage.domain.Postimage;
import com.ssafy.common.api.relation.domain.Zzim;
import com.ssafy.common.api.user.domain.User;
import lombok.*;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Post {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "post_id")
    private Long id;

    @Column(name = "post_title")
    private String title;

    @Column(name = "post_content")
    private String content;

    @Column(name =  "post_price")
    private Long price;

    @Column(name = "post_sale_price")
    private Long sale_price;

    @Column(name = "post_status")
    private Long status;

    @Column(name = "post_created")
    private Timestamp created;
    @Column(name = "post_updated")
    private Timestamp updated;

    @Column(name = "post_size")
    private String size;

    // 브랜드 카테고리
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "br_cateId")
    private Brandcategory brandcategory;

    // 종류 카테고리
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "type_cateId")
    private Typecategory typecategory;

    // 유저
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "seller_id")
    private User seller;

    // 상품 사진
    @OneToMany(mappedBy = "post_id")
    private List<Postimage> postImages = new ArrayList<>();

    // 찜 목록
    @OneToMany(mappedBy = "post")
    private List<Zzim> zzims = new ArrayList<>();

    public void delete(){
        this.status = 0L;
    }
    public void update(PostUpdateRequest request){
        title = request.getTitle();
        content = request.getContent();
        size = request.getSize();
        sale_price = request.getSale_price();
        price = request.getPrice();
        status = request.getStatus();
    }
}