package com.ssafy.common.api.user.service;

import com.ssafy.common.api.user.domain.User;
import com.ssafy.common.api.user.domain.UserLoginForm;
import com.ssafy.common.api.user.domain.UserResponseForm;
import com.ssafy.common.api.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

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

    public void join(User user) {
        userRepository.save(user);
    }

    public User findByUserId(String userId){
        return userRepository.findByUserId(userId);
    }

    public List<UserResponseForm> findByRole(String role) {
        List<User> user = userRepository.findAllByRole(role);
        List<UserResponseForm> formList = new ArrayList<>();
        user.forEach(u ->{
            formList.add(UserResponseForm.builder()
                    .description(u.getDescription())
                    .nickName(u.getNickName())
                    .id(u.getId())
                    .profileImage(u.getProfileImage())
//                .likesSize()
                    .build());

        });
        return formList;
    }

    public List<UserResponseForm> findALLByRoleAndNickNameContains(String role, String keyword) {
        List<User> user = userRepository.findALLByRoleAndNickNameContains(role,keyword);
        List<UserResponseForm> formList = new ArrayList<>();
        user.forEach(u ->{
            formList.add(UserResponseForm.builder()
                    .description(u.getDescription())
                    .nickName(u.getNickName())
                    .id(u.getId())
                    .profileImage(u.getProfileImage())
//                .likesSize()
                    .build());

        });
        return formList;
    }

    public void deleteUser(long id){
        userRepository.deleteById(id);
    }
}
