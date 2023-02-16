import {React, useCallback, useEffect, useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Logo from '../Images/Yogurt_Logo.png';

export default function SuccessResult() {
	const token = window.location.href.replace("https://i8b204.p.ssafy.io/kakaopay/success?pg_token=", "")
	const navigate = useNavigate();
	const loginUser = useSelector(state => state.user.value);
  const [time, setTime] = useState(3)
	const success = useCallback(async () => {
    await axios
      .get('https://i8b204.p.ssafy.io/be-api/kakaoPaySuccess', {
        params: { pg_token: token },
				headers: {Authorization: loginUser.token}
      })
  }, [token, loginUser]);
	
  useEffect(() => {
    success();
    setTimeout(() => setTime(2), 1000);
    setTimeout(() => setTime(1), 2000);
    setTimeout(() => navigate('/'), 3000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div>
		<div style={{ height: '40vw' }}></div>
      <div>
        <img src={Logo} alt="#" style={{ width: '100%'}}></img>
        <p style={{fontSize: '7vw', fontWeight: '600'}}>결제 성공</p>
        <button
          style={{
            border: 'none',
            backgroundColor: '#deb887',
            width: '80vw',
            height: '10vw',
            borderRadius: '8px',
          }}
        >
          {time}초 후 홈으로 이동
        </button>
      </div>
	</div>;
}
