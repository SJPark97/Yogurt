package com.ssafy.common.api.post.domain;

import com.ssafy.common.api.category.brandcategory.Brandcategory;
import com.ssafy.common.api.category.typecategory.Typecategory;
import com.ssafy.common.api.endpost.domain.EndPost;
import com.ssafy.common.api.post.postimage.domain.Postimage;
import com.ssafy.common.api.relation.domain.Zzim;
import com.ssafy.common.api.user.domain.User;
import lombok.*;

import javax.persistence.*;
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

    @Enumerated(EnumType.STRING)
    private PostStatus status;

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

    // 종류 상세 카테고리
    @JoinColumn(name = "type_cateId_detail")
    private Long detailCategory;

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

    // 거래 완료 post
    @OneToOne
    @JoinColumn(name = "id")
    private EndPost endPost;

    public void delete(){
        this.status = PostStatus.STATUS_DELETE;
    }
    public void updateStatus (Post post){
        if (post.status == PostStatus.STATUS_SELL){
            this.status = PostStatus.STATUS_LIVE_SOON;
        }
        else {
            this.status = PostStatus.STATUS_SELL;
        }
    }
    public void deal(){
        this.status = PostStatus.STATUS_END;
    }
}