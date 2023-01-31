package com.ssafy.common.api.post.controller;
import com.ssafy.common.api.post.dto.request.PostUpdateRequest;
import com.ssafy.common.api.post.dto.response.PostAllResponse;
import com.ssafy.common.api.post.service.PostService;
import com.ssafy.common.api.post.dto.request.PostInsertRequest;
import com.ssafy.common.api.post.dto.response.PostDetailResponse;
import com.ssafy.common.api.user.domain.User;
import com.ssafy.common.api.user.dto.UserPostResponse;
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
    @PostMapping("/create")
    @ResponseBody
    public ResponseEntity<PostDetailResponse> create(@RequestBody PostInsertRequest request){
        User user = postService.getLoginUser();
        return new ResponseEntity<>(postService.createPost(request,user), HttpStatus.CREATED);
    }
    // id로 상품 조회 API
    @GetMapping("/{id}")
    public ResponseEntity<PostDetailResponse> getPostOne(@PathVariable("id") Long id ){
        return new ResponseEntity<>(postService.findByPostId(id), HttpStatus.OK);
    }
    // 전체 상품 조회 API
    @GetMapping("")
    public ResponseEntity<List<PostAllResponse>> getPostAll(){
        return new ResponseEntity<>(postService.findPostAll(), HttpStatus.OK);
    }
    // 상품 수정 API
    @PutMapping("/{id}")
    public ResponseEntity<PostDetailResponse> update(@PathVariable("id") Long post_id, @RequestBody PostUpdateRequest request){
        User user = postService.getLoginUser();
        return new ResponseEntity<>(postService.updatePost(post_id, request, user), HttpStatus.CREATED);
    }
    // user id로 전체 상품 찾기
    @GetMapping("/user/{user_id}")
    public ResponseEntity<List<UserPostResponse>> getUserPostAll(@PathVariable("user_id") Long user_id){
        return new ResponseEntity<>(postService.findByUserId(user_id), HttpStatus.OK);
    }
}