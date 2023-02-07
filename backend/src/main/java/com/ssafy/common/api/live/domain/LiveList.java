package com.ssafy.common.api.live.domain;


import com.ssafy.common.api.post.domain.Post;
import io.swagger.annotations.ApiModelProperty;
import io.swagger.annotations.ApiParam;
import lombok.*;

import javax.persistence.*;

@Data
@Entity
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class LiveList {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "livelist_id")
    @ApiModelProperty(example="1")
    @ApiParam(value = "id")
    private Long id;

    // 라이브 룸 아이디 : liveroom_id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "liveroom_id")
    @ApiModelProperty(example="liveRoom 객체 : { }")
    @ApiParam(value = "livelist")
    private LiveRoom liveRoom;

    // 물건 아이디 : post_id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_id")
    @ApiModelProperty(example="post 객체 : { }")
    @ApiParam(value = "post")
    private Post post;

    @NonNull
    @Enumerated(EnumType.STRING)
    @ApiModelProperty(example="STATUS_ACTIVE")
    @ApiParam(value = "status")
    private LivelistStatus status;
    public void delete(){this.status = LivelistStatus.STATUS_DELETE; }

}
