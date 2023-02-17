package com.ssafy.common.api.live.service;

import com.ssafy.common.api.live.converter.LiveitemConverter;
import com.ssafy.common.api.live.domain.LiveList;
import com.ssafy.common.api.live.domain.LiveRoom;
import com.ssafy.common.api.live.domain.LiveRoomStatus;
import com.ssafy.common.api.live.dto.request.LiveroomRegistForm;
import com.ssafy.common.api.live.dto.response.LivelistResponseForm;
import com.ssafy.common.api.live.dto.response.LiveroomLivelistResponse;
import com.ssafy.common.api.live.dto.response.OnairLiveroomResponseForm;
import com.ssafy.common.api.live.dto.response.SellerLiveroomForm;
import com.ssafy.common.api.live.repository.LiveItemRepository;
import com.ssafy.common.api.live.repository.LiveRepository;
import com.ssafy.common.api.post.domain.Post;
import com.ssafy.common.api.post.repository.PostRepository;
import com.ssafy.common.api.user.domain.User;
import com.ssafy.common.api.user.dto.response.UserLiveroomResponse;
import com.ssafy.common.api.user.repository.UserRepository;
import com.ssafy.common.config.auth.PrincipalDetails;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.util.List;
import java.util.stream.Collectors;

import static com.ssafy.common.api.live.domain.LiveRoomStatus.*;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class LiveService {
    private final UserRepository userRepository;

    private final PostRepository postRepository;

    private final LiveItemRepository liveItemRepository;

    private final LiveitemConverter liveitemConverter;

    private final LiveRepository liveRepository;

    // 라이브 등록
    // time , title , thumbnail 은 requset로 받았고
    // status , created , sellerId는 내가 만들어서 생성
    public LiveRoom saveLiveroom ( LiveroomRegistForm request ) throws Exception {
        LiveRoom liveRoom = new LiveRoom();
        Timestamp ts = new Timestamp(System.currentTimeMillis()+32400000);
        // DB에 해당 유저(판매자)가 이미 개설한 라이브 룸(liveroom)이 있는지 확인
//        List<LiveRoom> liveRooms = liveRepository.findAllBySeller(getLoginUser());
//        for (LiveRoom liveRoom1: liveRooms) {
//            if(liveRoom1.getStatus()!=STATUS_CLOSE){
//                log.info("status : {}  ,  id : {}",liveRoom1.getStatus(),liveRoom1.getId());
//                throw new Exception("already exists Liveroom as STATUS_ONAIR or STATUS_READY");
//            }
//        }


        liveRoom= liveRoom.builder()
                .thumbnail(request.getThumbnail())
                .title(request.getTitle())
                .time(new Timestamp(request.getTime().getTime()))
                .status(STATUS_READY)
                .created(ts)
                .seller(getLoginUser())
                .build();
        // 생성된 liveroom 확인
        log.info("--------------- created liveroom id ---------------- :  {}",liveRoom.getSeller().getId() );


        /*
           request로 받은 postId들을 이용해 LiveList 등록
         */
        log.info("--------------- before enter for !!!!!!  -------------------------");
        for (Long postId: request.getPostIds()) {
            log.info("--------------- before get  {} s !!!!!!  -------------------------", postId);
            Post post = postRepository.findById(postId).get();
            log.info("--------------- finded  {} s !!!!!!  -------------------------", post.getId());
            liveItemRepository.save( liveitemConverter.MakeLiveItem( post , liveRoom ) );
            log.info("--------------- after saved ItemList {} 's !!!!!!  -------------------------", postId);
            // postId를 이용해 Livelist로 등록 했다면 Post의 상태 변경.
            post.updateStatus(post);
            log.info("--------------- end update !!!!!!  -------------------------");
        }
        log.info("--------------- ended for mooon !!!!!!  -------------------------");
        //
        return liveRepository.save(liveRoom);
    }


    //현재 모든 라이브룸(liveroom)중에서 방송중(STATUS_ONAIR)인 라이브룸 전부 조회
    public  List<OnairLiveroomResponseForm> getall(){
        log.info("--------------------------------- find 하기 전 ---------------------------------");
        List<OnairLiveroomResponseForm> liveRooms =liveRepository.findByStatus(STATUS_ONAIR).stream().map(OnairLiveroomResponseForm::new).collect(Collectors.toList());;
        log.info("--------------------------------- find 한 후 ---------------------------------");
        return liveRooms;
    }



    @Transactional
    // 인자로 받아온 status , keyword 로 현재 상태 변경
    public LiveRoomStatus changeStatus(LiveRoomStatus status , Long id) throws Exception {
        LiveRoom liveRoom = liveRepository.findById(id).get();
        log.info("before  status :  {}",liveRoom.getStatus() );
        if(!checkCorrectStatus(status, liveRoom.getStatus(), liveRoom )){
            throw new Exception("Incorrect Liveroom STATUS , check your liverooms ");
        }
        liveRoom.update_status(status);
        log.info("after  status :  {}",liveRoom.getStatus() );
        return status;
    }

    // 현재 로그인 한 유저 받아오기
    public User getLoginUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        PrincipalDetails principal = (PrincipalDetails) authentication.getPrincipal();
        log.info("principal : {}",principal.getUser());
        return principal.getUser();
    }

    // 사용자가 라이브예정(STATUS_READY) -> 라이브중(STATUS_ONAIR) 혹은
    // 라이브중(STATUS_ONAIR) -> 라이브종료(STATUS_CLOSE) 과정을 정확하게 거치는지 확인하는 함수
    public boolean checkCorrectStatus(LiveRoomStatus endStatus , LiveRoomStatus reqStatus , LiveRoom liveRoom){
        if(endStatus==STATUS_CLOSE){
            if(reqStatus==STATUS_ONAIR){
                // 해당 liveroom 의 아이디를 가진 livelist를 모두 삭제
                for (LiveList liveList : liveRoom.getLiveLists()) {
                    liveList.delete();
                }
                return true;
            }
            else{

                return true;
            }

        }
        else if(endStatus==STATUS_ONAIR) {
            return true;
        }
        else{
            return true;
        }
    }

    public List<SellerLiveroomForm> getSellersLiveroom(Long sellerId) {
        //CLOSE 상태인 것들 필터링
        List<SellerLiveroomForm> sellerLiveroomFormList =  userRepository.findById(sellerId).map(UserLiveroomResponse::new).get().getSellerLiveroomFormList();
        return sellerLiveroomFormList;
    }


    //
    public List<LivelistResponseForm> getItems(Long liveId) {
        //Delete 인것들 필터링
            List<LivelistResponseForm> livelistResponseFormList = liveRepository.findById(liveId).map(LiveroomLivelistResponse::new).get().getLiveLists();
        return livelistResponseFormList;
    }
}
