package com.ssafy.common.api.post;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;


@Repository
@RequiredArgsConstructor
public class PostRepository {
    private final EntityManager em;

    // 저장
    public void save(Post post) {
        em.persist(post);
    }
    // 삭제
    public void del(Post post) {
        em.remove(post);
    }

    // 물건 id 로 한개의 물건 찾기
    public Post findOne(Long id) {
        return em.find(Post.class, id);
    }

    // 아이템 전체 찾기
    public List<Post> findAll() {
        return em.createQuery("select i from Post i", Post.class).getResultList();
    }


}
