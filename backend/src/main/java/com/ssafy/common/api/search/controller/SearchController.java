package com.ssafy.common.api.search.controller;

import com.ssafy.common.api.post.dto.response.PostAllResponse;
import com.ssafy.common.api.search.service.SearchService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/search")
public class SearchController {
//    @PostMapping("/{text}")
//    public ResponseEntity<List<PostAllResponse>> postName(@PathVariable("text") String text){
//        return new ResponseEntity<>(SearchService.postName(text), HttpStatus.OK);
//    }


}
