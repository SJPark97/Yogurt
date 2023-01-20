package com.ssafy.common.api.live.domain;


import lombok.Data;

import javax.persistence.*;

@Data
@Entity
public class LiveList {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "livelist_id")
    private Long id;

}
