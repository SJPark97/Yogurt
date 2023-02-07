package com.ssafy.common.api.category.typecategory;

import com.ssafy.common.api.post.domain.Post;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
public class Typecategory {

    @Id
    @GeneratedValue
    @Column(name = "type_cateId")
    private Long id;

    @Column(name = "type_cateName")
    private String name;

    @Column(name = "type_cateImage")
    private String img;

    @Column(name = "type_cateCreated")
    private Timestamp created;

    @OneToMany(mappedBy = "typecategory")
    private List<Post> postList = new ArrayList<>();

    private Long detail1;
    private String detail1_image;
    private Long detail2;
    private String detail2_image;
    private Long detail3;
    private String detail3_image;
    private Long detail4;
    private String detail4_image;
    private Long detail5;
    private String detail5_image;
    private Long detail6;
    private String detail6_image;
    private Long detail7;
    private String detail7_image;
    private Long detail8;
    private String detail8_image;
}
