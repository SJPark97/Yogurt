package com.ssafy.common.api.relation.domain;

import com.ssafy.common.api.post.Post;
import com.ssafy.common.api.user.domain.Buyer;
import lombok.Data;

import javax.persistence.*;

@Entity
@Data
public class Zzim {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    // 구매자 아이디 : buyer_id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "buyer_id")
    private Buyer buyer;

    // 상품 아이디 : post_id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_id")
    private Post post;



}
