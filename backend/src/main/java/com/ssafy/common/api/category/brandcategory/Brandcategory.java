package com.ssafy.common.api.category.brandcategory;

import com.ssafy.common.api.post.domain.Post;
import io.swagger.annotations.ApiModelProperty;
import io.swagger.annotations.ApiParam;
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
    @ApiParam(value = "브랜드 이름", required = true)
    @ApiModelProperty(example = "꼼데가르송")
    private String name;

    @Column(name = "br_cateImage")
    @ApiParam(value = "브랜드 이미지", required = true)
    @ApiModelProperty(example = "s3.amazon...etc")
    private String img;

    @Column(name = "br_cateCreated")
    private Timestamp created;

    @OneToMany(mappedBy = "brandcategory")
    private List<Post> postList = new ArrayList<>();


}
