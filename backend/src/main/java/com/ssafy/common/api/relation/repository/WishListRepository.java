package com.ssafy.common.api.relation.repository;

import com.ssafy.common.api.relation.domain.Wishlist;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WishListRepository extends JpaRepository<Wishlist, Long> {
}
