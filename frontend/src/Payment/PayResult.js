import axios from 'axios';
import React, { useEffect } from 'react';
import BackToTop from '../AppBar/BackToTop';
import './PayResult.css';

function PayResult() {
  useEffect(() => {
    const params = new URL(document.location.toString()).searchParams;
    const code = params.get('code');

    axios
      .post(
        `https://kapi.kakao.com/v1/payment/ready?
        grant_type=KakaoAK
        &client_id=http://localhost:8080/kakaoPay
        &redirect_uri=http://localhost:3000/
        &code=${code}`,
        {
          headers: {
            'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
          },
        },
      )
      .then(res => {
        console.log(res);
      });
  }, []);

  return (
    <div>
      <BackToTop />
      <div className="payment-form">
        <form action="http://localhost:3000/kakaopay" method="get">
          <input className="btn" type="submit" value="카카오페이 결제" />
        </form>
      </div>
    </div>
  );
}

export default PayResult;
