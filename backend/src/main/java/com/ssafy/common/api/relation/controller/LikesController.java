package com.ssafy.common.api.relation.controller;

import com.ssafy.common.api.post.service.PostService;
import com.ssafy.common.api.relation.dto.Likes.LikesResponse;
import com.ssafy.common.api.relation.service.LikesService;
import com.ssafy.common.api.user.domain.User;
import com.ssafy.common.api.user.dto.UserLikesResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/likes")
public class LikesController {

    public LikesService likesService;
    public PostService postService;

    public LikesController(LikesService likesService, PostService postService) {
        this.likesService = likesService;
        this.postService = postService;
    }
    // 즐겨 찾기 등록
    @PostMapping("/{seller_id}")
    public ResponseEntity<LikesResponse> addlikes(@PathVariable("seller_id") Long seller_id){
        User user = postService.getLoginUser();
        return new ResponseEntity<>(likesService.addlikes(user, seller_id) , HttpStatus.CREATED);
    }
    // 즐겨 찾기 삭제
    @PatchMapping("/delete/{likes_id}")
    public ResponseEntity<LikesResponse> deletelikes(@PathVariable("likes_id") Long likes_id){
        return new ResponseEntity<>(likesService.deletelikes(likes_id),HttpStatus.OK);
    }
    // buyer 즐겨 찾기 조회
    @GetMapping("")
    public ResponseEntity<UserLikesResponse> userWishList(){
        User user = postService.getLoginUser();
        return new ResponseEntity<>(likesService.userLikes(user), HttpStatus.OK);
    }
}
