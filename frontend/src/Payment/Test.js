import {React, useCallback, useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Test() {
	const token = window.location.href.replace("https://i8b204.p.ssafy.io/kakaopay/success?pg_token=", "")
	const navigate = useNavigate();
	const loginUser = useSelector(state => state.user.value);

	const success = useCallback(async () => {
    await axios
      .get('https://i8b204.p.ssafy.io/be-api/kakaoPaySuccess', {
        params: { pg_token: token },
				headers: {Authorization: loginUser.token}
      })
      .then(res => {
        setTimeout(() => navigate('/'), 2000);
      });
  }, [token, navigate, loginUser]);
	

  useEffect(() => {
    success();
  }, [success]);

  return <div>
		<h1>결제 성공</h1>
		<h2>2초 뒤에 홈화면으로 이동합니다.</h2>
	</div>;
}
