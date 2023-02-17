package com.ssafy.common.api.user.controller;

import com.ssafy.common.api.user.domain.User;
import com.ssafy.common.api.user.domain.UserRole;
import com.ssafy.common.api.user.service.UserService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.test.annotation.Rollback;

import javax.transaction.Transactional;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@Transactional
@Rollback(value = false)
public class UserControllerTest {

    @Autowired
    private UserService userService;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Test
    public void 회원가입(){
        User user = User.builder()
                .userId("ssafy1")
                .email("ssafy@naver.com")
                .name("ssafy")
                .nickName("ssafy")
                .password(passwordEncoder.encode("1234"))
                .phoneNumber("012-3456-7890")
                .role(UserRole.valueOf("ROLE_SELLER"))
                .build();
        userService.join(user);

//        User user1 = userService.findByUserId("ssafy");
//        ObjectAssert<User> equalTo = assertThat(user1).isEqualTo(user);
    }

    @Test
    public void 판매자회원조회(){
//        List<UserResponseForm> list =userService.findByRole(UserRole.ROLE_SELLER);
//        assertThat(list.size()).isEqualTo(2);
    }
}