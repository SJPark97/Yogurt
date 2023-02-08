package com.ssafy.common.api.alarm.domain;

import com.ssafy.common.api.post.domain.Post;
import com.ssafy.common.api.user.domain.User;
import lombok.*;

import javax.persistence.*;
import java.sql.Timestamp;
@Data
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SellerAlarm {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NonNull
    @Column(name = "seller_alarm_created")
    private Timestamp created;

    // 판매자 아이디 : seller_id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "seller_id")
    private User seller;

    // 상품 아이디 : post_id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_id")
    private Post post;

    @NonNull
    @Column(name = "seller_alarm_status")
    private AlarmStatus status;
    public void delete(){status=AlarmStatus.STATUS_DELETE;}
}
