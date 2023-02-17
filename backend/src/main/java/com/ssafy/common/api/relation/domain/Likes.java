package com.ssafy.common.api.relation.domain;


import com.ssafy.common.api.user.domain.User;
import lombok.*;

import javax.persistence.*;

@Entity
@Data
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class Likes {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Enumerated(EnumType.STRING)
    private RelationStatus status;
    // 구매자 아이디 : buyer_id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "buyer_id")
    private User buyer;

    // 판매자 아이디 : seller_id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "seller_id")
    private User seller;

    public void delete(){
        this.status = RelationStatus.STATUS_DELETE;
    }
}
