package com.ssafy.common.api.post.repository;

import com.ssafy.common.api.post.domain.Post;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
@Transactional
public interface PostRepository extends JpaRepository<Post,Long> {
    List<Post> findAllByTitleContaining(String searchKeyword);
    List<Post> findAllByDetailCategoryLike(Long typeId);
}
