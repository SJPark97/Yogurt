package com.ssafy.common.api.kakaopay.service;

import com.ssafy.common.api.alarm.converter.SellerAlarmConverter;
import com.ssafy.common.api.alarm.domain.SellerAlarm;
import com.ssafy.common.api.alarm.repository.SellerAlarmRepository;
import com.ssafy.common.api.endpost.service.EndPostService;
import com.ssafy.common.api.kakaopay.VO.KakaoPayApprovalVO;
import com.ssafy.common.api.kakaopay.VO.KakaoPayReadyVO;
import com.ssafy.common.api.kakaopay.domain.KakaoPayEntity;
import com.ssafy.common.api.kakaopay.domain.KakaoPayPost;
import com.ssafy.common.api.kakaopay.dto.KakaoPayRequest;
import com.ssafy.common.api.kakaopay.repository.KakaoPayPostRepository;
import com.ssafy.common.api.kakaopay.repository.KakaoPayRepository;
import com.ssafy.common.api.post.domain.Post;
import com.ssafy.common.api.post.repository.PostRepository;
import com.ssafy.common.api.post.service.PostService;
import com.ssafy.common.api.relation.domain.Wishlist;
import com.ssafy.common.api.relation.dto.wishList.WishListUserPostResponse;
import com.ssafy.common.api.relation.repository.WishListRepository;
import com.ssafy.common.api.relation.service.WishListService;
import com.ssafy.common.api.user.domain.User;
import com.ssafy.common.api.user.dto.response.UserWishListResponse;
import com.ssafy.common.api.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.java.Log;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;
import java.net.URI;
import java.net.URISyntaxException;
import java.sql.Timestamp;
import java.util.List;
import java.util.Map;


@Service
@Log
@RequiredArgsConstructor
public class Kakaopay {
    private static final String HOST = "https://kapi.kakao.com";
    private KakaoPayReadyVO kakaoPayReadyVO;
    private KakaoPayApprovalVO kakaoPayApprovalVO;
    private final KakaoPayRepository kakaoPayRepository;
    private final KakaoPayPostRepository kakaoPayPostRepository;
    private final PostRepository postRepository;
    private final PostService postService;
    private final EndPostService endPostService;
    private final WishListService wishListService;
    private final WishListRepository wishListRepository;
    private final SellerAlarmConverter sellerAlarmConverter;
    private  final SellerAlarmRepository sellerAlarmRepository;


    public String kakaoPayReady(KakaoPayRequest request){
        // 구매 요청 내용 DB 저장
        RestTemplate restTemplate = new RestTemplate();
        KakaoPayEntity kakaoPay = KakaoPayEntity.builder()
                .totalAmount(request.getTotalAmount())
                .address(request.getAddress())
                .build();
        KakaoPayEntity createKakaoPay = kakaoPayRepository.save(kakaoPay);

        // 구매 물품 목록 저장
        List<Map<String,Long>> postIdList = request.getPostIdList();
        for (Map postId : postIdList) {
            Long id = (Long) postId.get("id");
            KakaoPayPost kakaoPayPost = KakaoPayPost.builder()
                    .postId(id)
                    .kakaoPayEntity(createKakaoPay)
                    .build();
            kakaoPayPostRepository.save(kakaoPayPost);
        }

        //서버 요청 헤더
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "KakaoAK 38e0e0c8abaa2c7cb30094bf61235055");
        headers.add("Accept", MediaType.APPLICATION_JSON_UTF8_VALUE);
        headers.add("Content-Type", MediaType.APPLICATION_FORM_URLENCODED_VALUE + ";charset=UTF-8");

        // 서버 요청 Body
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("cid", "TC0ONETIME");
        params.add("partner_order_id", String.valueOf(createKakaoPay.getId()));
        params.add("partner_user_id", "yogurt");
        params.add("item_name", "yogurt 상품 구매");
        params.add("quantity","1" );
        params.add("total_amount", createKakaoPay.getTotalAmount());
        params.add("tax_free_amount", "100");

        // 로컬
//        params.add("approval_url", "http://localhost:8080/kakaoPaySuccess");
//        params.add("cancel_url", "http://localhost:8080/kakaoPayCancel");
//        params.add("fail_url", "http://localhost:8080/kakaoPaySuccessFail");

//        서버
//        params.add("approval_url", "http://i8b204.p.ssafy.io/be-api/kakaoPaySuccess");
        params.add("approval_url", "http://i8b204.p.ssafy.io/kakaopay/success");
        params.add("cancel_url", "http://i8b204.p.ssafy.io/kakaopay/fail");
        params.add("fail_url", "http://i8b204.p.ssafy.io/kakaopay/fail");

        HttpEntity<MultiValueMap<String, String>> body = new HttpEntity<MultiValueMap<String, String>>(params, headers);
        try {
            kakaoPayReadyVO = restTemplate.postForObject(new URI(HOST + "/v1/payment/ready"), body, KakaoPayReadyVO.class);
            createKakaoPay.put(kakaoPayReadyVO.getTid());
            kakaoPayRepository.save(createKakaoPay);
            return kakaoPayReadyVO.getNext_redirect_pc_url();
        } catch (RestClientException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } catch (URISyntaxException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        return "/pay";
    }

    public KakaoPayApprovalVO kakaoPayInfo(String pg_token, User user) {

        log.info("KakaoPayInfoVO............................................");
        log.info("-----------------------------");

        RestTemplate restTemplate = new RestTemplate();

        // 서버로 요청할 Header
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "KakaoAK 38e0e0c8abaa2c7cb30094bf61235055");
        headers.add("Accept", MediaType.APPLICATION_JSON_UTF8_VALUE);
        headers.add("Content-Type", MediaType.APPLICATION_FORM_URLENCODED_VALUE + ";charset=UTF-8");

        // 서버로 요청할 Body
        MultiValueMap<String, String> params = new LinkedMultiValueMap<String, String>();
        params.add("cid", "TC0ONETIME");
        params.add("tid", kakaoPayReadyVO.getTid());
        params.add("partner_order_id", String.valueOf(kakaoPayRepository.findByTid(kakaoPayReadyVO.getTid()).getId()));
        params.add("partner_user_id", "yogurt");
        params.add("pg_token", pg_token);
        HttpEntity<MultiValueMap<String, String>> body = new HttpEntity<MultiValueMap<String, String>>(params, headers);

        try {
            kakaoPayApprovalVO = restTemplate.postForObject(new URI(HOST + "/v1/payment/approve"), body, KakaoPayApprovalVO.class);
            log.info("" + kakaoPayApprovalVO);

            //endPost
            KakaoPayEnd(user, Long.valueOf(kakaoPayApprovalVO.getPartner_order_id()));

            return kakaoPayApprovalVO;
        } catch (RestClientException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } catch (URISyntaxException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        return null;
    }


    // EndPost 만들기 / 장바수니 삭제
    private void KakaoPayEnd(User buyer, Long orderId){
        KakaoPayEntity kakaoPayEntity = kakaoPayRepository.findById(orderId).get();
        List<KakaoPayPost> kakaoPayPostList = kakaoPayEntity.getKakaoPayPosts();
        List<WishListUserPostResponse> userWishLists = wishListService.userWishList(buyer).getWishLists();
        String address = kakaoPayEntity.getAddress();
        for (KakaoPayPost kakaoPayPost : kakaoPayPostList){
            Post post = postRepository.findById(kakaoPayPost.getPostId()).get();
            endPostService.createEndPost(post, buyer, address);
            //알람 추가 시작
            SellerAlarm sellerAlarm = sellerAlarmConverter.ConvertUserPostSellerAlarm(post.getSeller(),post,new Timestamp(System.currentTimeMillis()));
            sellerAlarmRepository.save(sellerAlarm);
            //알람 추가 끝
            for (WishListUserPostResponse wishList : userWishLists ){
                if (post.getId() == wishList.getPost().getId()) {
                    Wishlist wish= wishListRepository.findById(wishList.getWishListId()).get();
                    wish.delete();
                }
            }
        }
    }
}

