package com.ssafy.common.api.user.domain;

import com.ssafy.common.api.alarm.domain.SellerAlarm;
import com.ssafy.common.api.live.domain.LiveRoom;
import com.ssafy.common.api.notice.domain.Notice;
import com.ssafy.common.api.qna.domain.Qna;
import com.ssafy.common.api.relation.domain.Likes;
import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
public class Seller extends User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String description; //판매자 설명
    @NotNull
    private String bank;    //계좌 은행
    @NotNull
    private String account; //계좌

    /*
    여기서 부터 2023.01.21 최현호가 추가한 항목
    liveroom , likes , qna , notice , sellerAlarm
     */

    // liveroom 과의 조인 항목
    @OneToMany(mappedBy = "seller")
    private List<LiveRoom> liveRooms = new ArrayList<>();
    
    // likes 와의 조인항목
    @OneToMany(mappedBy = "seller")
    private  List<Likes> likess = new ArrayList<>();

    // qna 과의 조인 항목
    @OneToMany(mappedBy = "seller")
    private List<Qna> qnas = new ArrayList<>();

    // notice 과의 조인 항목
    @OneToMany(mappedBy = "seller")
    private List<Notice>  notices = new ArrayList<>();

    // sellerAlarm 과의 조인 항목
    @OneToMany(mappedBy = "seller")
    private List<SellerAlarm> sellerAlarms = new ArrayList<>();


}
