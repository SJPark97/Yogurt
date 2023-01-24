package com.ssafy.common.api.post;


import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.context.junit4.SpringRunner;
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

        Assertions.assertThat(post).isEqualTo(postRepository.findOne(post.getId())); // 상품 등록 확인

    }

    @Test
    public void 상품삭제() {

        Post post = createpost();
        postService.savePost(post); // 상품 등록

        int beforeSize = postService.findALlPost().size(); // 등록 후 전체 카운트

        postService.delPost(post); // 상품 삭제

        Assertions.assertThat(beforeSize - 1 ).isEqualTo(postService.findALlPost().size()); // 삭제 후 전체 카운트 비교
    }

    //findOnePost 특정 상품 조회
    @Test
    public void 특정상품조회() {

        Post post = createpost();
        postService.savePost(post); // 상품 등록
        Long id = post.getId(); // 등록한 상품 id 저장


        Post post1 = postService.findOnePost(id); // id 로 상품 찾기
        Assertions.assertThat(post1.getId()).isEqualTo(post.getId()); // 동일 한지 확인
    }

    //findAllPost
    @Test
    public void 전체상품조회() {

        int beforeSize = postService.findALlPost().size();

        Post post = createpost();
        postService.savePost(post); // 상품 등록

        Assertions.assertThat(beforeSize + 1).isEqualTo(postService.findALlPost().size());
    }

    private Post createpost() {
        Post post = new Post();
        post.setTitle("제목");
        post.setContent("내용");
        return post;
    };
}
