package com.ssafy.common.api.alarm.domain;

import com.ssafy.common.api.user.domain.User;
import lombok.*;

import javax.persistence.*;
import java.sql.Timestamp;

@Data
@Entity
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class BuyerAlarm {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NonNull
    @Column(name = "buyer_alarm_created")
    private Timestamp created;

    // 구매자 아이디 : buyer_id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "buyer_id")
    private User buyer;

    // 판매자 아이디 : seller_id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "seller_id")
    private User seller;

    @NonNull
    @Column(name = "buyer_alarm_status")
    private AlarmStatus status;
    public void delete(){status=AlarmStatus.STATUS_DELETE;}
}
