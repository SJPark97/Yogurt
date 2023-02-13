package com.ssafy.common.api.relation.controller;

import com.ssafy.common.api.post.service.PostService;
import com.ssafy.common.api.relation.dto.wishList.WishListResponse;
import com.ssafy.common.api.relation.service.WishListService;
import com.ssafy.common.api.user.domain.User;
import com.ssafy.common.api.user.dto.response.UserWishListResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/wishlist")
public class WishlistController {
    public PostService postService;
    public WishListService wishListService;
    public WishlistController(PostService postService, WishListService wishListService) {
        this.postService = postService;
        this.wishListService = wishListService;
    }

    // 장바구니 담기 ApI
    @PostMapping("/{post_id}")
    public ResponseEntity<WishListResponse> addWishList(@PathVariable("post_id") Long post_id){
        User user = postService.getLoginUser();
        return new ResponseEntity<>(wishListService.addWishList(post_id, user), HttpStatus.CREATED);
    }

    // 장바구니 상품 삭제
    @PatchMapping("/{wishList_id}")
    public ResponseEntity<WishListResponse> deleteWishList(@PathVariable("wishList_id") Long wishList_id){
        return new ResponseEntity<>(wishListService.deleteWishList(wishList_id), HttpStatus.OK);
    }

    // buyer 장바구니 리스트 조회
    @GetMapping("")
    public ResponseEntity<UserWishListResponse> userWishList(){
        User user = postService.getLoginUser();
        //delete인것들 필터링
        return new ResponseEntity<>(wishListService.userWishList(user), HttpStatus.OK);
    }
}
