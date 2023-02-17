package com.ssafy.common.api.live.domain;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.ssafy.common.api.user.domain.User;
import io.swagger.annotations.ApiModelProperty;
import io.swagger.annotations.ApiParam;
import lombok.*;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;



@Data
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class LiveRoom {

    // 라이브룸 고유 번호  liveroom_id
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "liveroom_id")
    @ApiModelProperty(example="1")
    @ApiParam(value = "id")
    private Long id;

    // 판매자 고유 번호 sellerId
    @ManyToOne(fetch = FetchType.LAZY)
    @JsonManagedReference
    @JoinColumn(name = "seller_id")
    @ApiModelProperty(example="User 객체 : {}")
    @ApiParam(value = "User")
    private User seller;


    //생성시간 liveroom_created
    @NonNull
    @Column(name = "liveroom_created")
    @ApiModelProperty(example="2023-02-01T11:22:11.000")
    @ApiParam(value = "created")
    private Timestamp created ;

    //  라이브 룸 제목
    @NonNull
    @Column(name = "liveroom_title")
    @ApiModelProperty(example="올해 가을 신상!!!")
    @ApiParam(value = "title")
    private String title;

    // 라이브 대표이미지
    @Column(name = "liveroom_thumbnail")
    @ApiModelProperty(example="wnwaksd.wakasnkldsa/wkldalnw/awkd.jpg")
    @ApiParam(value = "thumbnail")
    private String thumbnail ;

    //라이브 룸 상태
    @NonNull
    @Column(name = "liveroom_status")
    @ApiModelProperty(example="STATUS_ONAIR")
    @ApiParam(value = "thumbnail")
    private LiveRoomStatus status;

    @NonNull
    @Column(name = "liveroom_time")
    @ApiModelProperty(example="2023-02-01T11:22:11.000")
    @ApiParam(value = "time")
    private Timestamp time ;

    public void update_status(LiveRoomStatus status){
        this.status=status;
    }

    // 라이브 리스트 : livelist
    @OneToMany(mappedBy = "liveRoom")
    private List<LiveList> LiveLists = new ArrayList<>();
}

