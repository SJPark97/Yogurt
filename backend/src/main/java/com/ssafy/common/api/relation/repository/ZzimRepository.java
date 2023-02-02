package com.ssafy.common.api.relation.repository;

import com.ssafy.common.api.relation.domain.Zzim;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

@Transactional
public interface ZzimRepository extends JpaRepository<Zzim, Long> {
}
