package com.ssafy.common.api.category.repository;

import com.ssafy.common.api.category.typecategory.Typecategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TypeCategoryRepository  extends JpaRepository<Typecategory, Long> {
}
