package com.ssafy.common.api.search.service;

import com.ssafy.common.api.category.dto.CategoryBrandResponse;
import com.ssafy.common.api.category.repository.BrandCategoryRepository;
import com.ssafy.common.api.post.domain.PostStatus;
import com.ssafy.common.api.post.dto.response.PostAllResponse;
import com.ssafy.common.api.post.repository.PostRepository;
import com.ssafy.common.api.user.domain.UserStatus;
import com.ssafy.common.api.user.dto.response.UserSellerResponse;
import com.ssafy.common.api.user.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class SearchService {
    private final PostRepository postRepository;
    private final BrandCategoryRepository brandCategoryRepository;
    private final UserRepository userRepository;

    public SearchService(PostRepository postRepository, BrandCategoryRepository brandCategoryRepository, UserRepository userRepository) {
        this.postRepository = postRepository;
        this.brandCategoryRepository = brandCategoryRepository;
        this.userRepository = userRepository;
    }
    // 검색 상품
    public List<PostAllResponse> postSearch(String input) {
        return postRepository.findAllByTitleContaining(input)
                .stream().map(PostAllResponse::new)
                .filter(postAllResponse -> postAllResponse.getStatus()!= PostStatus.STATUS_DELETE&& postAllResponse.getStatus()!=PostStatus.STATUS_END).collect(Collectors.toList());
    }
    // 검색 브랜드
    public List<CategoryBrandResponse> brandSearch(String input){
        return brandCategoryRepository.findAllByNameContaining(input)
                .stream().map(CategoryBrandResponse::new).collect(Collectors.toList());
    }
    // 검색 판매자
    public List<UserSellerResponse> sellerSearch(String input){
        return userRepository.findAllByNickNameContaining(input)
                .stream().filter(user -> user.getUserStatus()!= UserStatus.DELETE).map(UserSellerResponse::new).collect(Collectors.toList());
    }
}
