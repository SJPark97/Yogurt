package com.ssafy.common.api.relation.domain;

import com.ssafy.common.api.post.domain.Post;
import com.ssafy.common.api.user.domain.User;
import lombok.*;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Data
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class Wishlist {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 구매자 아이디 : buyer_id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "buyer_id")
    private User buyer;

    // 상품 아이디 : post_id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_id")
    private Post post;
    @Enumerated(EnumType.STRING)
    private RelationStatus status;

    public void delete(){
        this.status = RelationStatus.STATUS_DELETE;
    }

}
