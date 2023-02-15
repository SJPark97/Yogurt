import {React} from 'react';
import { useNavigate } from 'react-router-dom';

export default function FailResult() {
	const navigate = useNavigate();
  const goHome = () => navigate('/');
  const goBack = () => navigate(-2);

  return <div>
		<h1>결제 실패</h1>
		<button onClick={goHome}>홈으로</button>
		<button onClick={goBack}>뒤로가기</button>
	</div>;
}
