package com.ssafy.common.api.qna.domain;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Data
@NoArgsConstructor
public class Answer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    //답변 제목
    @NonNull
    private String answer_title;

    //답변 내용
    @NonNull
    private String answer_content;

    //답변 생성 시간
    @NonNull
    private Timestamp answer_createtime;

    // qna 아이디 : qna_id
    @OneToOne(fetch =  FetchType.LAZY)
    @JoinColumn(name = "qna_id")
    private Qna qna;

}
