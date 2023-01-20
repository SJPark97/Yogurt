package com.ssafy.common.api.category.brandcategory;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.sql.Timestamp;

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










}
