package com.ssafy.common.api.user.service;

import com.ssafy.common.api.user.domain.User;
import com.ssafy.common.api.user.domain.UserRole;
import com.ssafy.common.api.user.domain.UserStatus;
import com.ssafy.common.api.user.dto.request.UserLoginRequest;
import com.ssafy.common.api.user.dto.response.UserLoginResponse;
import com.ssafy.common.api.user.dto.response.UserResponseForm;
import com.ssafy.common.api.user.dto.response.UserSellerResponse;
import com.ssafy.common.api.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public UserLoginRequest login (UserLoginRequest userLoginRequest){
        User userInfo = userRepository.findByUserId(userLoginRequest.getUserId());
        if(!userLoginRequest.equals(userInfo.getPassword())){
            throw new IllegalArgumentException(("잘못된 비밀번호 입니다."));
        }
        return null;
    }

    public void join(User user) {
        user.setCreate_date(new Timestamp(System.currentTimeMillis()));
        user.setUpdate_date(new Timestamp(System.currentTimeMillis()));
        userRepository.save(user);
    }

    public UserLoginResponse findByUserId(String userId){
        User user = userRepository.findByUserId(userId);
        UserLoginResponse res = new UserLoginResponse(user.getId(), user.getUserId(), user.getRole(),user.getNickName());
        return res;
    }
    public UserSellerResponse findBySellerId(Long id){
        User user = userRepository.findById(id).get();
        UserSellerResponse userSellerResponse = new UserSellerResponse(user);
        return userSellerResponse;
    }

    public User findById(Long id){
        User user = userRepository.findById(id).get();
        return user;
    }
    public List<UserSellerResponse> findByRole(UserRole role) {
        List<User> user = userRepository.findAllByRole(role);
        List<UserSellerResponse> formList = new ArrayList<>();
        user.forEach(u ->{
            // status 가 ACTIVE인 USER만 조회
            if(u.getUserStatus()== UserStatus.ACTIVE){
                formList.add(new UserSellerResponse(u));
            }
//            formList.add(UserResponseForm.builder()
//                    .description(u.getDescription())
//                    .nickName(u.getNickName())
//                    .id(u.getId())
//                    .profileImage(u.getProfileImage())
////                .likesSize()
//                    .build());

        });
        return formList;
    }

    public List<UserResponseForm> findALLByRoleAndNickNameContains(UserRole role, String keyword) {
        List<User> user = userRepository.findALLByRoleAndNickNameContains(role,keyword);
        List<UserResponseForm> formList = new ArrayList<>();
        user.forEach(u ->{
            // status 가 ACTIVE인 USER만 조회
            if(u.getUserStatus()== UserStatus.ACTIVE){
                formList.add(UserResponseForm.builder()
                        .description(u.getDescription())
                        .nickName(u.getNickName())
                        .id(u.getId())
                        .profileImage(u.getProfileImage())
//                .likesSize()
                        .build());
            }

        });
        return formList;
    }

    public void deleteUser(long id){
        userRepository.deleteById(id);
    }

}
