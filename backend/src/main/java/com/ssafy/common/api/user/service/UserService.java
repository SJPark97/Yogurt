package com.ssafy.common.api.user.service;

import com.ssafy.common.api.user.domain.User;
import com.ssafy.common.api.user.domain.UserLoginForm;
import com.ssafy.common.api.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public UserLoginForm login (UserLoginForm userLoginForm){
        User userInfo = userRepository.findByUserId(userLoginForm.getUserId());
        if(!userLoginForm.equals(userInfo.getPassword())){
            throw new IllegalArgumentException(("잘못된 비밀번호 입니다."));
        }
        return null;
    }



}
