package com.ssafy.common.api.post.repository;

import com.ssafy.common.api.post.domain.Post;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostRepository extends JpaRepository<Post,Long> {
}
