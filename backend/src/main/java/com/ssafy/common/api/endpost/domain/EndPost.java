package com.ssafy.common.api.endpost.domain;

import com.ssafy.common.api.user.domain.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "end_post")
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class EndPost {
    @Id
    private Long id;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "buyer")
    private User buyer;
    private String buyerAddress;
}
