import React from 'react';
// import { Route, Routes, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import VideoRoomComponent from './VideoRoomComponent';

export default function Room() {
  // const navigate = useNavigate();

  const { state } = useLocation();
  const [sessionId, setSessionId] = useState(state.sellerNickname);
  const [userId, setUserId] = useState(state.userNickname);
  const [owner, setOwner] = useState(false);
  const [go, setGo] = useState(false);

  const handelOwner = () => {
    setOwner(p => !p);
  };

  const handelSession = e => {
    setSessionId(e.target.value);
  };

  const handelUser = e => {
    setUserId(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    setGo(p => !p);
  };

  return (
    <div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <form onSubmit={handleSubmit}>
        <div>
          <p>SessionId</p>
          <input onChange={handelSession}></input>
        </div>
        <div>
          <p>UserId</p>
          <input onChange={handelUser}></input>
        </div>
        <div>
          <p>sellor</p>
          {owner && '셀러'}
          <input type="checkBox" onClick={handelOwner}></input>
        </div>
        <button type="submit">입장</button>
      </form>
      {go ? (
        <VideoRoomComponent
          sessionName={sessionId}
          user={userId}
          owner={owner}
        />
      ) : null}
    </div>
  );
}
