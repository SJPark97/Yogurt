package com.ssafy.common.api.post.controller;

import com.ssafy.common.api.post.ApiResponse;
import com.ssafy.common.api.post.dto.request.PostUpdateRequest;
import com.ssafy.common.api.post.service.PostService;
import com.ssafy.common.api.post.domain.Post;
import com.ssafy.common.api.post.dto.request.PostInsertRequest;
import com.ssafy.common.api.post.dto.response.PostDetailResponse;
import com.ssafy.common.api.user.domain.User;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping(value = "/post")
public class PostController {
    public final PostService postService;

    public PostController(PostService postService){
        this.postService = postService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ApiResponse<PostDetailResponse> create(@RequestBody PostInsertRequest request, @AuthenticationPrincipal User user){
        return ApiResponse.ok(postService.createPost(request,user));
    }

    @GetMapping("/{id}")
    public ApiResponse<PostDetailResponse> getOne(@PathVariable("id") Long id){
        return ApiResponse.ok(postService.findById(id));
    }

    @GetMapping
    public ApiResponse<Post> getAll(){
        return ApiResponse.ok((Post) postService.findAll());
    }

    @PutMapping("/{id}")
    public ApiResponse<PostDetailResponse> update(@PathVariable("id") Long post_id, @RequestBody PostUpdateRequest request ,@AuthenticationPrincipal User user){
        return ApiResponse.ok(postService.updatePost(post_id,request,user));
    }


    // 게시글 삭제
    @DeleteMapping("/{id}")
    public ApiResponse<Void> delete(@PathVariable("id") Long post_id, @AuthenticationPrincipal User user){
        postService.deletePost(post_id, user);
        return ApiResponse.ok(null);
    }
}