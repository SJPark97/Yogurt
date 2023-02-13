package com.ssafy.common.api.relation.controller;

import com.ssafy.common.api.post.service.PostService;
import com.ssafy.common.api.relation.dto.zzim.ZzimResponse;
import com.ssafy.common.api.relation.service.ZzimService;
import com.ssafy.common.api.user.domain.User;
import com.ssafy.common.api.user.dto.response.UserZzimResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/zzim")
public class ZzimController {
    public ZzimService zzimService;
    public PostService postService;

    public ZzimController(ZzimService zzimService, PostService postService) {
        this.zzimService = zzimService;
        this.postService = postService;
    }

    // 찜 저장 API
    @PostMapping("/{post_id}")
    public ResponseEntity<ZzimResponse> createZzim(@PathVariable("post_id") Long postId){
        User user = postService.getLoginUser();
        return new ResponseEntity<>(zzimService.createZzim(postId,user),HttpStatus.CREATED);
    }

    // user 찜 리스트 API
    @GetMapping("")
    public ResponseEntity<UserZzimResponse> userZzim(){
        User user = postService.getLoginUser();
        return new ResponseEntity<>(zzimService.userZzim(user), HttpStatus.OK);
    }

    // 찜 삭제 API
    @PatchMapping("/delete/{zzim_id}")
    public ResponseEntity<ZzimResponse> deleteZzim(@PathVariable("zzim_id") Long zzim_id){
        // Delete 상태인것들 필터링
        return new ResponseEntity<>(zzimService.deleteZzim(zzim_id), HttpStatus.OK);
    }
}
