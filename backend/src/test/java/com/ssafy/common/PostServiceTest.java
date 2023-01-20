package com.ssafy.common;

import com.ssafy.common.api.post.Post;
import com.ssafy.common.api.post.PostRepository;
import com.ssafy.common.api.post.PostService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.transaction.annotation.Transactional;


@ExtendWith(SpringExtension.class)
@SpringBootTest
@Transactional
@Rollback(value = false)
public class PostServiceTest {
    @Autowired PostService postService;
    @Autowired PostRepository postRepository;

    //savePost 상품 저장 service 테스트
    @Test
    public void 상품저장 () {

        Post post = createpost();

        postService.savePost(post); // 상품 등록

//      Assertions.assertThat(post).isEqualTo(postRepository.findOne(saveId));
    }

    @Test
    public void  상품삭제() {

        Post post = createpost();
        postService.savePost(post);
        System.out.println(post.getId());
        System.out.println(postService.findALlPost().size());
        System.out.println("del");
        postService.delPost(post);
        System.out.println(postService.findALlPost().size());

    }

     // findOnePost 특정 상품 조회
//    @Test
//    public void 특정상품조회() {
//        Long id = 5L;
//        Post post = postService.findOnePost(id);
//        System.out.println(post.getTitle());
//    }

    //findAllPost
    @Test
    public void 전체상품조회() {
        postService.findALlPost();
        System.out.println("전체 상품 조회");
        System.out.println(postService.findALlPost());
        System.out.println(postService.findALlPost().size());

    }

    private Post createpost() {
        Post post = new Post();
        post.setTitle("제목");
        post.setContent("내용");
        return post;
    };
}
