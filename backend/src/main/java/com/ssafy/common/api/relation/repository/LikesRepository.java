package com.ssafy.common.api.relation.repository;

import com.ssafy.common.api.relation.domain.Likes;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LikesRepository extends JpaRepository<Likes, Long> {
}
