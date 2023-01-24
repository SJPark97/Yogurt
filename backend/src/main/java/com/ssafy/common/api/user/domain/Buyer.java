package com.ssafy.common.api.user.domain;

import com.ssafy.common.api.alarm.domain.BuyerAlarm;
import com.ssafy.common.api.live.domain.LiveRoom;
import com.ssafy.common.api.notice.domain.Notice;
import com.ssafy.common.api.qna.domain.Qna;
import com.ssafy.common.api.relation.domain.Wishlist;
import com.ssafy.common.api.relation.domain.Zzim;
import lombok.Data;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
public class Buyer extends User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

     /*
    여기서 부터 2023.01.21 최현호가 추가한 항목
    zzim , wishlist , qna , buyerAlarm
     */

    // zzim 과의 조인 항목
    @OneToMany(mappedBy = "buyer")
    private List<Zzim> zzims = new ArrayList<>();

    // wishlist 과의 조인 항목
    @OneToMany(mappedBy = "buyer")
    private List<Wishlist> wishlists = new ArrayList<>();

    // qna 과의 조인 항목
    @OneToMany(mappedBy = "buyer")
    private List<Qna> qnas = new ArrayList<>();

    // buyerAlarm 과의 조인 항목
    @OneToMany(mappedBy = "buyer")
    private List<BuyerAlarm> buyerAlarms = new ArrayList<>();


}
