package com.ssafy.common.api.user.domain;

import com.ssafy.common.api.alarm.domain.BuyerAlarm;
import com.ssafy.common.api.alarm.domain.SellerAlarm;
import com.ssafy.common.api.live.domain.LiveRoom;
import com.ssafy.common.api.notice.domain.Notice;
import com.ssafy.common.api.post.Post;
import com.ssafy.common.api.qna.domain.Qna;
import com.ssafy.common.api.relation.domain.Likes;
import com.ssafy.common.api.relation.domain.Wishlist;
import com.ssafy.common.api.relation.domain.Zzim;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Getter
@Setter
@Entity
@AllArgsConstructor
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

    private Timestamp create_date;//생성날짜
    private Timestamp update_date;//수정날짜

    private long banCount;//신고카운트
    private String description; //판매자 설명
    private String bank;    //계좌 은행
    private String account; //계좌

    public User() {

    }
    private String role;    //ROLE_SELLER, ROLE_BUYER

    //해당 계정이 활성화 상태인지 삭제된 상태인지 구분
    @NotNull
    private enum status{
        ACTIVE, DELETE
    }

    public List<String> getRoleList(){
        if(this.role.length()>0){
            return Arrays.asList(this.role.split(","));
        }
        return new ArrayList<>();
    }

    @OneToMany(mappedBy = "buyer")
    private List<Zzim> zzims = new ArrayList<>();

    // wishlist 과의 조인 항목
    @OneToMany(mappedBy = "buyer")
    private List<Wishlist> wishlists = new ArrayList<>();

    // qna 과의 조인 항목
    @OneToMany(mappedBy = "buyer")
    private List<Qna> qnas_Buyer = new ArrayList<>();

    // buyerAlarm 과의 조인 항목
    @OneToMany(mappedBy = "buyer")
    private List<BuyerAlarm> buyerAlarms = new ArrayList<>();

    @OneToMany(mappedBy = "buyer")
    private  List<Likes> likess_Buyer = new ArrayList<>();

    /*
    여기서 부터 2023.01.21 최현호가 추가한 항목
    liveroom , likes , qna , notice , sellerAlarm
     */

    // liveroom 과의 조인 항목
    @OneToMany(mappedBy = "seller")
    private List<LiveRoom> liveRooms = new ArrayList<>();

    // likes 와의 조인항목
    @OneToMany(mappedBy = "seller")
    private  List<Likes> likess_Seller = new ArrayList<>();

    // qna 과의 조인 항목
    @OneToMany(mappedBy = "seller")
    private List<Qna> qnas_Seller = new ArrayList<>();

    // notice 과의 조인 항목
    @OneToMany(mappedBy = "seller")
    private List<Notice>  notices = new ArrayList<>();

    // sellerAlarm 과의 조인 항목
    @OneToMany(mappedBy = "seller")
    private List<SellerAlarm> sellerAlarms = new ArrayList<>();

    @OneToMany(mappedBy = "seller")
    private List<Post> posts = new ArrayList<>();
}
