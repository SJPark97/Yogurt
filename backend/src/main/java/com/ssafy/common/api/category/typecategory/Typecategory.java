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


}
