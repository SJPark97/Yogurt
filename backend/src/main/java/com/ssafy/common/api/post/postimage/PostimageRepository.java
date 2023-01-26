package com.ssafy.common.api.post.postimage;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PostimageRepository extends JpaRepository<Postimage, Long> {
}
