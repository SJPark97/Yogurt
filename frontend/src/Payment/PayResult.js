import React from 'react';
import BackToTop from '../AppBar/BackToTop';
import './PayResult.css';

function PayResult() {
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
