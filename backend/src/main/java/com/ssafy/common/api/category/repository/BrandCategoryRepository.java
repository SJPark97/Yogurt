package com.ssafy.common.api.category.repository;

import com.ssafy.common.api.category.brandcategory.Brandcategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BrandCategoryRepository extends JpaRepository<Brandcategory, Long> {

}
