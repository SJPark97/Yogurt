package com.ssafy.common.api.post.postimage;


import com.ssafy.common.api.post.Post;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;

@Repository
public interface PostimageRepository extends JpaRepository<Postimage, Long> {
}
