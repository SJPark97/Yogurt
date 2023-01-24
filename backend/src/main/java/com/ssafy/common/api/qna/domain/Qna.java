package com.ssafy.common.api.qna.domain;

import com.ssafy.common.api.post.Post;
import com.ssafy.common.api.user.domain.Buyer;
import com.ssafy.common.api.user.domain.Seller;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Data
@NoArgsConstructor
public class Qna {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    //qna 제목
    @NonNull
    private String qna_title;

    //qna 내용
    @NonNull
    private String qna_content;

    //qna 생성 시간
    @NonNull
    private Timestamp qna_createtime;

    // 구매자 아이디 : buyer_id

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "buyer_id")
    private Buyer buyer;
    // 판매자 아이디 : seller_id

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "seller_id")
    private Seller seller;

    // 답변글과의 조인
    @OneToOne(fetch = FetchType.LAZY, mappedBy = "qna")
    private Answer answer;

}
