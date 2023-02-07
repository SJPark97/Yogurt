package com.ssafy.common.api.user.repository;

import com.ssafy.common.api.user.domain.User;
import com.ssafy.common.api.user.domain.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
@Transactional
//@Repository 안써도 jpaRepository가 상속받았기 때문에 상관없음
public interface UserRepository extends JpaRepository<User, Long> {
    <Optional>User findByName(String name); // 이름으로 User 찾아오는 메소드

    <Optional>User findByUserId(String userId);
    <Optional>List<User> findAllByRole(UserRole role);
    <Optional>List<User> findALLByRoleAndNickNameContains(UserRole role, String searchKeyword);
    <Optional>List<User> findAllByNickNameContaining(String searchKeyword);
}
