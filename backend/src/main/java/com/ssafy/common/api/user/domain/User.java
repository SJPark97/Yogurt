package com.ssafy.common.api.user.domain;

import lombok.Builder;
import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.sql.Timestamp;

@Data
@Entity
@Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // 고유번호

    @NotNull
    private String userId; // 유저 아이디

    @NotNull
    private String password; // 유저 password

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

    private String description; //판매자 설명
    @NotNull
    private String bank;    //계좌 은행
    @NotNull
    private String account; //계좌

    private String refreshToken;

    public void changeRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }

    public User() {

    }

    @NotNull
    private enum role{
        ROLE_BUYER, ROLE_SELLER
    }

    //해당 계정이 활성화 상태인지 삭제된 상태인지 구분
    @NotNull
    private enum status{
        ACTIVE, DELETE
    }
}
