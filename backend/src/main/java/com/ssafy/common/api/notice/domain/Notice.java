package com.ssafy.common.api.notice.domain;

import com.ssafy.common.api.user.domain.User;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Data
@NoArgsConstructor
public class Notice {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    //공지사항 제목
    @NonNull
    private String notice_title;

    //공지사항 내용
    @NonNull
    private String notice_content;

    //공지사항 생성 시간
    @NonNull
    private Timestamp notice_createtime;

    // 판매자 아이디 : seller_id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "seller_id")
    private User seller;
}
