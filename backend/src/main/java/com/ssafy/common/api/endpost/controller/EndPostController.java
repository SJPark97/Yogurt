package com.ssafy.common.api.endpost.controller;

import com.ssafy.common.api.endpost.service.EndPostService;
import com.ssafy.common.api.post.service.PostService;
import com.ssafy.common.api.user.domain.User;
import com.ssafy.common.api.user.dto.UserEndPostResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/endPost")
public class EndPostController {


    public PostService postService;
    public EndPostService endPostService;

    public EndPostController(PostService postService, EndPostService endPostService) {
        this.postService = postService;
        this.endPostService = endPostService;
    }

    // test 용 API, endPost 생성 -> 결제 완료시 수정 예정
    @PostMapping("/test")
    public void addEndPost(){
        User user = postService.getLoginUser();
        endPostService.createEndPost(32L, user,"대전");
    }
    // 유저 거래 완료 상품들 조회 API
    @GetMapping("")
    public ResponseEntity<UserEndPostResponse> userEndPost(){
        User user = postService.getLoginUser();
        return new ResponseEntity<>(endPostService.userEndPost(user), HttpStatus.OK);
    }
}
