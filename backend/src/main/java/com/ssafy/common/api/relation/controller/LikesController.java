package com.ssafy.common.api.relation.controller;

import com.ssafy.common.api.post.service.PostService;
import com.ssafy.common.api.relation.dto.Likes.LikesResponse;
import com.ssafy.common.api.relation.dto.Likes.LikesUserBuyerResponse;
import com.ssafy.common.api.relation.dto.Likes.LikesUserSellerResponse;
import com.ssafy.common.api.relation.service.LikesService;
import com.ssafy.common.api.user.domain.User;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
    public ResponseEntity<LikesResponse> addLikes(@PathVariable("seller_id") Long seller_id){
        User user = postService.getLoginUser();
        return new ResponseEntity<>(likesService.addLikes(user, seller_id) , HttpStatus.CREATED);
    }
    // 즐겨 찾기 삭제
    @PatchMapping("/{likes_id}")
    public ResponseEntity<LikesResponse> deleteLikes(@PathVariable("likes_id") Long likes_id){
        return new ResponseEntity<>(likesService.deleteLikes(likes_id),HttpStatus.OK);
    }
    // buyer 가 보는 즐겨 찾기 seller 목록
    @GetMapping("/seller")
    public ResponseEntity<List<LikesUserSellerResponse>> sellerLikes(){
        User user = postService.getLoginUser();
        //delete 상태인것들 필터링
        return new ResponseEntity<>(likesService.sellerLikesList(user), HttpStatus.OK);
    }
    //seller 가 보는 즐겨찾기 buyer 의 목록
    @GetMapping("/buyer")
    public ResponseEntity<List<LikesUserBuyerResponse>> buyerLikes(){
        User user = postService.getLoginUser();
        //delete 상태인것들 필터링
        return new ResponseEntity<>(likesService.buyerLikesList(user), HttpStatus.OK);
    }
}
