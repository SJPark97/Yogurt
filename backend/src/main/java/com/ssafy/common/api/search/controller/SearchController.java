package com.ssafy.common.api.search.controller;

import com.ssafy.common.api.category.dto.CategoryBrandResponse;
import com.ssafy.common.api.post.dto.response.PostAllResponse;
import com.ssafy.common.api.search.service.SearchService;
import com.ssafy.common.api.user.dto.UserSellerResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/search")
public class SearchController {
    private final SearchService searchService;

    public SearchController(SearchService searchService) {
        this.searchService = searchService;
    }
    // 검색 상품 API
    @GetMapping("/post/{input}")
    public ResponseEntity<List<PostAllResponse>> postSearch(@PathVariable("input") String input){
        return new ResponseEntity<>(searchService.postSearch(input), HttpStatus.OK);
    }
    // 검색 브랜드 API
    @GetMapping("/brand/{input}")
    public ResponseEntity<List<CategoryBrandResponse>> brandSearch(@PathVariable("input") String input){
        return new ResponseEntity<>(searchService.brandSearch(input),HttpStatus.OK);
    }
    // 검색 판매자 API
    @GetMapping("/seller/{input}")
    public  ResponseEntity<List<UserSellerResponse>> sellerSearch(@PathVariable("input") String input){
        return new ResponseEntity<>(searchService.sellerSearch(input), HttpStatus.OK);
    }
}
