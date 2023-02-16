import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import VideoRoomComponent from './VideoRoomComponent';

export default function Room() {
  const { state } = useLocation();
  const { liveId } = useParams();
  const sessionId = String(state.sellerId)
  const userId = state.userNickname
  const sellerNickname = state.sellerNickname
  const owner = state.sellerNickname === state.userNickname
  
  return (
    <div>
      <VideoRoomComponent
          sessionName={sessionId}
          sellerNickname={sellerNickname}
          user={userId}
          owner={owner}
          liveId={liveId}
        />
    </div>
  );
}
