package com.ssafy.common.api.user.repository;

import com.ssafy.common.api.user.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

//@Repository 안써도 jpaRepository가 상속받았기 때문에 상관없음
public interface UserRepository extends JpaRepository<User, Long> {
    public User findByName(String name); // 이름으로 User 찾아오는 메소드

    public User findByUserId(String userId);
}
