package com.ssafy.common.api.kakaopay.service;

import com.ssafy.common.api.kakaopay.VO.KakaoPayApprovalVO;
import com.ssafy.common.api.kakaopay.VO.KakaoPayReadyVO;
import com.ssafy.common.api.kakaopay.domain.KakaoPayEntity;
import com.ssafy.common.api.kakaopay.domain.KakaoPayPost;
import com.ssafy.common.api.kakaopay.dto.KakaoPayRequest;
import com.ssafy.common.api.kakaopay.repository.KakaoPayPostRepository;
import com.ssafy.common.api.kakaopay.repository.KakaoPayRepository;
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
        params.add("approval_url", "http://localhost:8080/kakaoPaySuccess");
        params.add("cancel_url", "http://localhost:8080/kakaoPayCancel");
        params.add("fail_url", "http://localhost:8080/kakaoPaySuccessFail");

//        서버
//        params.add("approval_url", "http://i8b204.p.ssafy.io/be-api//kakaoPaySuccess");
//        params.add("cancel_url", "http://i8b204.p.ssafy.io/be-api//kakaoPayCancel");
//        params.add("fail_url", "http://i8b204.p.ssafy.io/be-api//kakaoPaySuccessFail");


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

    public KakaoPayApprovalVO kakaoPayInfo(String pg_token) {

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
        System.out.println(kakaoPayReadyVO.getTid());
        params.add("partner_order_id", String.valueOf(kakaoPayRepository.findByTid(kakaoPayReadyVO.getTid()).getId()));
        params.add("partner_user_id", "yogurt");
        params.add("pg_token", pg_token);
        HttpEntity<MultiValueMap<String, String>> body = new HttpEntity<MultiValueMap<String, String>>(params, headers);

        try {
            kakaoPayApprovalVO = restTemplate.postForObject(new URI(HOST + "/v1/payment/approve"), body, KakaoPayApprovalVO.class);
            log.info("" + kakaoPayApprovalVO);
            // POST Status SELL --> END
            // 장바구니에서 삭제
            // EndPost 만들기
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
}

