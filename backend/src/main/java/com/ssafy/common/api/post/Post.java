package com.ssafy.common.api.post;

import com.ssafy.common.api.category.brandcategory.Brandcategory;
import com.ssafy.common.api.category.typecategory.Typecategory;
import com.ssafy.common.api.live.domain.LiveList;
import com.ssafy.common.api.relation.domain.Wishlist;
import com.ssafy.common.api.relation.domain.Zzim;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter @Setter
public class Post {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "post_id")
    private Long id;

    // 유저

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

    /*
    여기서 부터 2023.01.21 최현호가 추가한 항목
    livelist , zzim , wishlist
    과의 의존관계 목록
     */


    // livelist 와의 조인항목
    @OneToMany(mappedBy = "post")
    private List<LiveList> liveLists = new ArrayList<>();

    // zzim 과의 조인항목
    @OneToMany(mappedBy = "post")
    private List<Zzim> zzims = new ArrayList<>();

    // wishlist 과의 조인항목
    @OneToMany(mappedBy = "post")
    private List<Wishlist> wishlists = new ArrayList<>();



}
