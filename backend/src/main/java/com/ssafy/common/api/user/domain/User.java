package com.ssafy.common.api.user.domain;

import lombok.Data;

import javax.validation.constraints.NotNull;
import java.sql.Timestamp;

@Data
public class User {

    @NotNull
    private String name;//이름

    @NotNull
    private String nickName;//닉네임
    @NotNull
    private String email;//이메일
    private String profileImage;//프로필 이미지 URL
    @NotNull
    private String phoneNumber;

    @NotNull
    private Timestamp create_date;//생성날짜
    private Timestamp update_date;//수정날짜
    private long banCount;//신고카운트

    //해당 계정이 활성화 상태인지 삭제된 상태인지 구분
    @NotNull
    private enum status{
        ACTIVE, DELETE
    }



}
