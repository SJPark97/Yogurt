package com.ssafy.common.api.review.domain;

import com.ssafy.common.api.user.domain.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "review")
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Review {
    @Id
    private Long id;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "seller")
    private User seller;
    private String title;
    private String content;
    private Long rate;
}
