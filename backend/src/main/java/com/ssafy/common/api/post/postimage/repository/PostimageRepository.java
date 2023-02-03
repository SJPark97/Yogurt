package com.ssafy.common.api.post.postimage.repository;


import com.ssafy.common.api.post.postimage.domain.Postimage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PostimageRepository extends JpaRepository<Postimage, Long> {
}
