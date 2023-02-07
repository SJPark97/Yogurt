package com.ssafy.common.api.category.service;


import com.ssafy.common.api.category.brandcategory.Brandcategory;
import com.ssafy.common.api.category.dto.CategoryBrandPostResponse;
import com.ssafy.common.api.category.dto.CategoryBrandResponse;
import com.ssafy.common.api.category.dto.CategoryTypePostResponse;
import com.ssafy.common.api.category.dto.CategoryTypeResponse;
import com.ssafy.common.api.category.repository.BrandCategoryRepository;
import com.ssafy.common.api.category.repository.TypeCategoryRepository;
import com.ssafy.common.api.category.typecategory.Typecategory;
import com.ssafy.common.api.post.dto.response.PostAllResponse;
import com.ssafy.common.api.post.repository.PostRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
public class CategoryService {
    private final BrandCategoryRepository brandCategoryRepository;
    private final TypeCategoryRepository typeCategoryRepository;
    private final PostRepository postRepository;


    public CategoryService(BrandCategoryRepository brandCategoryRepository, TypeCategoryRepository typeCategoryRepository, PostRepository postRepository) {
        this.brandCategoryRepository = brandCategoryRepository;
        this.typeCategoryRepository = typeCategoryRepository;
        this.postRepository = postRepository;
    }
    // 카테고리 브랜드 상품 목록
    public CategoryBrandPostResponse findBrandCatePost(Long cateId){
        return brandCategoryRepository.findById(cateId)
                .map(CategoryBrandPostResponse::new)
                .orElseThrow();
    }

    // 카테고리 브랜드 종류
    public List<CategoryBrandResponse> findBrandCate(){
        List<Brandcategory> Brand = brandCategoryRepository.findAll();
        return Brand.stream().map(CategoryBrandResponse::new).collect(Collectors.toList());
    }

    // 카테고리 타입 상품 목록
    public CategoryTypePostResponse  findTypeCatePost(Long cateId){
        return typeCategoryRepository.findById(cateId)
                .map(CategoryTypePostResponse::new)
                .orElseThrow();
    }
    // 카테고리 타입 종류
    public List<CategoryTypeResponse> findTypeCate(){
        List<Typecategory> Type = typeCategoryRepository.findAll();
        return Type.stream().map(CategoryTypeResponse::new).collect(Collectors.toList());
    }
    public List<PostAllResponse> findTypeTopCatePost(Long detailId) {
        return postRepository.findAllByDetailCategoryLike(detailId)
                .stream().map(PostAllResponse::new).collect(Collectors.toList());
    }

}