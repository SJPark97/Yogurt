// 유저정보를 받아오는게 좋으려나 이전에서 props 받는게 좋으려나
// props를 받는거면 이게 appbar에서 오는거라 가능하려나?...
// 앞으로는 app바를 페이지 마다 넣는게 나으려나?...
import { useState, useRef } from 'react';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';

import './ProfileModifiy.css';
import BackToTop from '../../AppBar/BackToTop';
import Testing from './test';

export default function ProfileModify() {
  const [Image, setImage] = useState(
    'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
  );
  const fileInput = useRef(null);

  const onChange = e => {
    console.log(e.target.files);
    if (e.target.files[0]) {
      //   setFile(e.target.files[0]);
    } else {
      // 업로드 취소할 시
      setImage(
        'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
      );
      return;
    }
    // 화면에 프로필 사진 표시
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImage(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <div>
      <BackToTop />
      <h2>프로필 수정</h2>
      <Stack spacing={1} justifyContent="center" alignItems="center">
        <Avatar
          src={Image}
          onClick={() => {
            fileInput.current.click();
          }}
          sx={{
            width: '50%',
            height: '50%',
          }}
        />
        <input
          type="file"
          style={{ display: 'none' }}
          accept="image/jpg,impge/png,image/jpeg"
          name="profile_img"
          onChange={onChange}
          ref={fileInput}
        />
      </Stack>
      <Testing />
    </div>
  );
}
