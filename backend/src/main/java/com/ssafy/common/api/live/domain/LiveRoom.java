package com.ssafy.common.api.live.domain;

import com.ssafy.common.api.user.domain.User;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@NoArgsConstructor
public class LiveRoom {

    // 라이브룸 고유 번호  liveroom_id
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "liveroom_id")
    private Long id;

    // 판매자 고유 번호 sellerId
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "seller_id")
    private User seller;


    //생성시간 liveroom_created
    @NonNull
    private Timestamp liveroom_created ;

    //  라이브 룸 제목
    @NonNull
    private String liveroom_title;

    // 라이브 대표이미지
    private String liveroom_thumbnail ;

    //라이브 룸 상태
    @NonNull
    private enum liveroom_status{
        STATUS_CLOSE,STATUS_READY ,STATUS_ONAIR
    }


    // 라이브 리스트 : livelist
    @OneToMany(mappedBy = "liveRoom")
    private List<LiveList> LiveLists = new ArrayList<>();
}
