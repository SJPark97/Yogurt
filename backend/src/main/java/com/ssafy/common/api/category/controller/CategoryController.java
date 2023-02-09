package com.ssafy.common.api.category.controller;


import com.ssafy.common.api.category.dto.CategoryBrandPostResponse;
import com.ssafy.common.api.category.dto.CategoryBrandResponse;
import com.ssafy.common.api.category.dto.CategoryTypePostResponse;
import com.ssafy.common.api.category.dto.CategoryTypeResponse;
import com.ssafy.common.api.category.service.CategoryService;
import com.ssafy.common.api.post.dto.response.PostAllResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/cate")
public class CategoryController {
    public final CategoryService categoryService;
    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    // 브랜드 카테고리 상품 조회 API
    @GetMapping("/brand/{cateId}")
    public ResponseEntity<CategoryBrandPostResponse> getBrandCatePost(@PathVariable("cateId") Long cateId){
        return new ResponseEntity<>(categoryService.findBrandCatePost(cateId), HttpStatus.OK);
    }
    // 브랜드 카테고리 종류 API
    @GetMapping("/brand")
    public ResponseEntity<List<CategoryBrandResponse>> getBrandCate(){
        return new ResponseEntity<>(categoryService.findBrandCate(), HttpStatus.OK);
    }
    // 타입 카테고리 상품 조회 API
    @GetMapping("/type/{cateId}")
    public ResponseEntity<CategoryTypePostResponse> getTypeCatePost(@PathVariable("cateId") Long cateId){
        return new ResponseEntity<>(categoryService.findTypeCatePost(cateId), HttpStatus.OK);
    }
    // 타입 카테고리 종류 API
    @GetMapping("/type")
    public ResponseEntity<List<CategoryTypeResponse>> getTypeCate(){
        return  new ResponseEntity<>(categoryService.findTypeCate(), HttpStatus.OK);
    }
    // 상세 카테고리 조회 API
    @GetMapping("/type/detail/{detailId}")
    public ResponseEntity<List<PostAllResponse>>getTypeTopCatePost(@PathVariable("detailId") Long detailId){
        return new ResponseEntity<>(categoryService.findTypeTopCatePost(detailId), HttpStatus.OK);
    }
}
