import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useState } from "react";
import VideoRoomComponent from "./VideoRoomComponent";

export default function Lgc() {
  const navigate = useNavigate();
  const [sessionId, setSessionId] = useState();
  const [userId, setUserId] = useState();
  const [owner, setOwner] = useState(false);

  const handelOwner = () => {
    setOwner((p) => !p)
  }

  const handelSession = (e) => {
    setSessionId(e.target.value);
  };

  const handelUser = (e) => {
    setUserId(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/video");
  };

  return (
    <div>
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
      <Routes>
        <Route
          path="/video"
          element={<VideoRoomComponent sessionName={sessionId} user={userId} owner={owner} />}
        />
      </Routes>
    </div>
  );
}
