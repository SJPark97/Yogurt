package com.ssafy.common.api.alarm.repository;

import com.ssafy.common.api.alarm.domain.BuyerAlarm;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BuyerAlarmRepository extends JpaRepository<BuyerAlarm,Long> {
}
