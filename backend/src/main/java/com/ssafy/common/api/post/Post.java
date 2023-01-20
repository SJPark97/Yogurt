package com.ssafy.common.api.post;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Getter @Setter
public class Post {
    // 유저

    //
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
    private Timestamp created;  // import 가 아닐수도 있다 .

    @Column(name = "post_updated")
    private Timestamp updated;

    // 브랜드 카테고리

    // 종류 카테고리
}
