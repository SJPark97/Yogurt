package com.ssafy.common.api.post.converter;

import com.ssafy.common.api.category.brandcategory.Brandcategory;
import com.ssafy.common.api.category.repository.BrandCategoryRepository;
import com.ssafy.common.api.category.repository.TypeCategoryRepository;
import com.ssafy.common.api.category.typecategory.Typecategory;
import com.ssafy.common.api.post.domain.Post;
import com.ssafy.common.api.post.domain.PostStatus;
import com.ssafy.common.api.post.dto.request.PostInsertRequest;
import com.ssafy.common.api.user.domain.User;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class PostConverter {
    private final BrandCategoryRepository brandCategoryRepository;
    private final TypeCategoryRepository typeCategoryRepository;

    public Post createRequestDtoToEntity(PostInsertRequest request, User user){
        Brandcategory brandcategory= brandCategoryRepository.findById(request.getBrandcategoryId()).get();
        Typecategory typecategory = typeCategoryRepository.findById(request.getTypecategoryId()).get();
        return Post.builder()
                .title(request.getTitle())
                .content(request.getContent())
                .price(request.getPrice())
                .sale_price(request.getSale_price())
                .status(PostStatus.STATUS_SELL)
                .seller(user)
                .brandcategory(brandcategory)
                .typecategory(typecategory)
                .detailCategory(request.getTypeDetailId())
                .size(request.getSize())
                .build();
        }
    }
