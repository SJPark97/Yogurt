package com.ssafy.common.api.post.postimage;

import com.ssafy.common.api.post.Post;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter @Setter
public class Postimage {

    @Id @GeneratedValue
    @Column(name = "postImage_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_id")
    private Post post;

    @Column(name = "postImage_url")
    private String url;

}
