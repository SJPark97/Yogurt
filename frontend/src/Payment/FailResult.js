import { React } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../Images/Yogurt_Logo.png';

export default function FailResult() {
  const navigate = useNavigate();
  const goHome = () => navigate('/');
  const goBack = () => navigate(-1);

  return (
    <div>
      <div style={{ height: '40vw' }}></div>
      <div>
        <img src={Logo} alt="#" style={{ width: '100%'}}></img>
        <p style={{fontSize: '5vw', fontWeight: '600'}}>결제에 실패했습니다</p>
        <button
          onClick={goBack}
          style={{
            border: 'none',
            backgroundColor: '#deb887',
            width: '80vw',
            height: '10vw',
            borderRadius: '8px',
          }}
        >
          다시주문
        </button>
        <div style={{height: '3vw'}}></div>
        <button
          onClick={goHome}
          style={{
            border: 'none',
            backgroundColor: '#d3d3d3',
            width: '80vw',
            height: '10vw',
            borderRadius: '8px',
          }}
        >
          홈으로
        </button>
      </div>
    </div>
  );
}
