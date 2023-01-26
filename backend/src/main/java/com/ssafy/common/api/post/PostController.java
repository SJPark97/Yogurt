package com.ssafy.common.api.post;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/post")
@RequiredArgsConstructor
public class PostController {
    private final PostService postService;

     // 상품 생성
    @PostMapping("/join")
    public String savedPost(@RequestBody Post post) {
        postService.savePost(post);
        return "성공";
    }
    
//    // 상품 수정
//    @PutMapping("/{post_id}")
//
//
//    // 상품 삭제
//    @DeleteMapping("/{post_id}")
//
    // 전체 목록 조회
    @GetMapping("")
    public List<Post> allPost(){
        return postService.findALlPost();
    }

//    // 단일 상품 조회
//    @GetMapping("/{post_id}")
//    public Post detailPost() {
//
//    }








}
