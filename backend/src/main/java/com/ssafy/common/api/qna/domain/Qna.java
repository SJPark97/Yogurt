package com.ssafy.common.api.qna.domain;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.sql.Timestamp;

@Entity
@Data
@NoArgsConstructor
public class Qna {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    //qna 제목
    @NonNull
    private String qna_title;

    //qna 내용
    @NonNull
    private String qna_content;

    //qna 생성 시간
    @NonNull
    private Timestamp qna_createtime;
}
