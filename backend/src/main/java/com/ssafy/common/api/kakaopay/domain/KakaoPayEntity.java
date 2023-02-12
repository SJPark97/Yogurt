package com.ssafy.common.api.kakaopay.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;


@Entity
@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class KakaoPayEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String totalAmount;
    private String address;
    private String tid;

    @OneToMany(mappedBy = "kakaoPayEntity")
    private List<KakaoPayPost> kakaoPayPosts = new ArrayList<>();

    public void put (String tid) {
        this.tid = tid;
    }


}
