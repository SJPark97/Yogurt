package com.ssafy.common.api.relation.service;

import com.ssafy.common.api.post.domain.Post;
import com.ssafy.common.api.post.repository.PostRepository;
import com.ssafy.common.api.relation.converter.WishConverter;
import com.ssafy.common.api.relation.domain.Wishlist;
import com.ssafy.common.api.relation.dto.wishList.WishListResponse;
import com.ssafy.common.api.relation.dto.wishList.WishListUserPostResponse;
import com.ssafy.common.api.relation.repository.WishListRepository;
import com.ssafy.common.api.user.domain.User;
import com.ssafy.common.api.user.domain.UserStatus;
import com.ssafy.common.api.user.dto.response.UserWishListResponse;
import com.ssafy.common.api.user.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@Transactional(readOnly = true)
public class WishListService {
    private final PostRepository postRepository;
    private final WishListRepository wishListRepository;
    private final UserRepository userRepository;
    private final WishConverter wishConverter;
    public WishListService(PostRepository postRepository, WishListRepository wishListRepository, WishConverter wishConverter, UserRepository userRepository) {
        this.postRepository = postRepository;
        this.wishConverter = wishConverter;
        this.wishListRepository = wishListRepository;
        this.userRepository = userRepository;
    }

    // 장바구니 저장
    @Transactional
    public WishListResponse addWishList(Long postId, User user){
        Post post = postRepository.findById(postId).get();
        Wishlist newWishList = wishConverter.createWishListRequestDtoToEntitiy(post, user);
        try {
            for (WishListUserPostResponse wishList : userWishList(user).getWishLists()) {
                if (wishList.getPost().getId() == newWishList.getPost().getId()){
                    throw new Exception();
                }
            }
            Wishlist createwishList = wishListRepository.save(newWishList);
            return new WishListResponse(createwishList);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
    // 장바구니 삭제
    @Transactional
    public WishListResponse deleteWishList(Long id){
        Wishlist wishlist = wishListRepository.findById(id).get();
        wishlist.delete();
        return new WishListResponse(wishlist);
    }
    // user 장바구니 조회
    public UserWishListResponse userWishList(User user){
        return userRepository.findById(user.getId())
                .filter(user1 -> user1.getUserStatus()!= UserStatus.DELETE)
                .map(UserWishListResponse::new)
                .get();
    };
}
