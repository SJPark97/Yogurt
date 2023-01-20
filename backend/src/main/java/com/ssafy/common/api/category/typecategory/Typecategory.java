package com.ssafy.common.api.category.typecategory;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.sql.Timestamp;

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

}
