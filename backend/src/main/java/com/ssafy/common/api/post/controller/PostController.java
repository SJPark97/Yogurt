package com.ssafy.common.api.post.controller;
import com.ssafy.common.api.post.dto.response.PostAllResponse;
import com.ssafy.common.api.post.service.PostService;
import com.ssafy.common.api.post.dto.request.PostInsertRequest;
import com.ssafy.common.api.post.dto.response.PostDetailResponse;
import com.ssafy.common.api.user.domain.User;
import com.ssafy.common.api.user.dto.response.UserPostResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/post")
public class PostController {
    public final PostService postService;
    public PostController(PostService postService){
        this.postService = postService;
    }

    // 상품 생성 API
    @PostMapping("")
    public ResponseEntity<?> create(@RequestBody PostInsertRequest request){
        User user = postService.getLoginUser();

        return new ResponseEntity<>(postService.createPost(request,user), HttpStatus.CREATED);
    }
    // 상품 상세 페이지 조회 API
    @GetMapping("/{id}")
    public ResponseEntity<PostDetailResponse> getPostOne(@PathVariable("id") Long id ){
        return new ResponseEntity<>(postService.findByPostId(id), HttpStatus.OK);
    }
    // 전체 상품 조회 API
    @GetMapping("")
    public ResponseEntity<List<PostAllResponse>> getPostAll(){
        //상태가 DELETE 인것들 필터링
        return new ResponseEntity<>(postService.findPostAll(), HttpStatus.OK);
    }
    // 전체 상품 최신순 조회
    @GetMapping("/new")
    public ResponseEntity<List<PostAllResponse>> getPostNewAll(){
        //상태가 DELETE 인것들 필터링
        return new ResponseEntity<>(postService.findNewPostAll(), HttpStatus.OK);
    }
    // 전체 상품 인기순 조회
    @GetMapping("/popular")
    public ResponseEntity<List<PostAllResponse>> getPostLikesAll(){
        //상태가 DELETE 인것들 필터링
        return new ResponseEntity<>(postService.findLikesPostAll(), HttpStatus.OK);
    }

    // 상품 라이브 여부 수정 API
    @PatchMapping ("/live/{id}")
    public ResponseEntity<PostDetailResponse> updateLiveStatus(@PathVariable("id") Long post_id){
        return new ResponseEntity<>(postService.updateLiveStatus(post_id), HttpStatus.OK);
    }

    // 상품 삭제 API
    @PatchMapping ("/{id}")
    public ResponseEntity<PostDetailResponse> delete(@PathVariable("id")Long post_id){
        return new ResponseEntity<>(postService.deletePost(post_id), HttpStatus.OK);
    }

    // user id로 전체 상품 찾기
    @GetMapping("/user/{user_id}")
    public ResponseEntity<List<UserPostResponse>> getUserPostAll(@PathVariable("user_id") Long user_id){
        // Delete 상태인 것들 필터링
        return new ResponseEntity<>(postService.findByUserId(user_id), HttpStatus.OK);
    }
}