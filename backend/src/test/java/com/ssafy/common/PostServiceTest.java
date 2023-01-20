package com.ssafy.common;

import com.ssafy.common.api.post.Post;
import com.ssafy.common.api.post.PostRepository;
import com.ssafy.common.api.post.PostService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.transaction.annotation.Transactional;

@ExtendWith(SpringExtension.class)
@SpringBootTest
@Transactional
public class PostServiceTest {
    @Autowired PostService postService;
    @Autowired PostRepository postRepository;

    @Test
    public void onePostfind() {


    }
    @Test
    public void Postsave() {
        Post post = new Post();
        post.setTitle("22");
        post.setContent("22");
        Long id= postService.savePost(post); // 상품 등록
        System.out.println(id);
    }


//    @Test
//    public void  상품삭제() throws  Exception {
//
//    }

}
