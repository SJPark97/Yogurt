package com.ssafy.common.api.live.domain;


import com.ssafy.common.api.post.domain.Post;
import lombok.Data;

import javax.persistence.*;

@Data
@Entity
public class LiveList {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "livelist_id")
    private Long id;

    // 라이브 룸 아이디 : liveroom_id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "liveroom_id")
    private LiveRoom liveRoom;

    // 물건 아이디 : post_id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_id")
    private Post post;




}
