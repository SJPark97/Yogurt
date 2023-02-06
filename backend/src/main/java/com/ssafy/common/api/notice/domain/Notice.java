package com.ssafy.common.api.notice.domain;

import com.ssafy.common.api.post.domain.PostStatus;
import com.ssafy.common.api.post.service.PostService;
import com.ssafy.common.api.user.domain.User;
import lombok.*;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Notice {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    //공지사항 제목
    @NonNull
    private String title;

    //공지사항 내용
    @NonNull
    private String content;


    // 판매자 아이디 : seller_id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "seller_id")
    private User seller;

    //공지사항 상태
    private PostStatus status;
    public void delete(){
        this.status = PostStatus.STATUS_DELETE;
    }

}
