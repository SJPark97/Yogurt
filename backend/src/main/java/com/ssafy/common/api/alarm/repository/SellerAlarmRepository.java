package com.ssafy.common.api.alarm.repository;

import com.ssafy.common.api.alarm.domain.SellerAlarm;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SellerAlarmRepository extends JpaRepository<SellerAlarm,Long> {
}
