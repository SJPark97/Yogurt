package com.ssafy.common.api.category.brandcategory;

import com.ssafy.common.api.post.domain.Post;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter @Setter
public class Brandcategory {

    @Id @GeneratedValue
    @Column(name = "br_cateId")
    private Long id;

    @Column(name = "br_cateName")
    private String name;

    @Column(name = "br_cateImage")
    private String img;

    @Column(name = "br_cateCreated")
    private Timestamp created;

    @OneToMany(mappedBy = "brandcategory")
    private List<Post> postList = new ArrayList<>();


}
