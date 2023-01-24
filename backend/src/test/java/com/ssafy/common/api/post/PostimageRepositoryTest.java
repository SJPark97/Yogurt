package com.ssafy.common.api.post;

import com.ssafy.common.api.post.postimage.Postimage;
import com.ssafy.common.api.post.postimage.PostimageRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Assert;

import java.util.List;

@SpringBootTest
@Transactional
@Rollback(value = false)

public class PostimageRepositoryTest {
    @Autowired
    PostimageRepository postimageRepository;

    // findByPostIs 시험
    @Test
    public void 이미지찾기(){
        Long id = 3L;
        List<Postimage> postimage = postimageRepository.findByPostIs(id);
        System.out.println(postimage);
    }
}
