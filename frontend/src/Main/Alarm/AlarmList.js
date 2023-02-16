import { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

import BackToTop from '../../AppBar/BackToTop';
import Alarm from './Alarm';
import './AlarmList.css';
import { useNavigate } from 'react-router-dom';
// import EmptyAlarm from './EmptyAlarm';

function AlarmList() {
  const loginUser = useSelector(state => state.user.value);
  const [alarms, setAlarms] = useState([]);
  const navigate = useNavigate();

  const getAlarms = useCallback(async () => {
    if (loginUser.loginUserRole === 'ROLE_SELLER') {
      await axios
        .get('https://i8b204.p.ssafy.io/be-api/seller_alarm', {
          headers: { Authorization: loginUser.token },
        })
        .then(res => {
          setAlarms(res.data.sellerAlarmUserResponses);
        })
        .catch(() => {
          alert('문제가 발생했습니다. \n 잠시후에 다시 시도해주세요.');
          navigate('/');
        });
    } else {
      await axios
        .get('https://i8b204.p.ssafy.io/be-api/buyer_alarm', {
          headers: { Authorization: loginUser.token },
        })
        .then(res => {
          setAlarms(res.data.buyerAlarmUserResponses);
        })
        .catch(() => {
          alert('문제가 발생했습니다. \n 잠시후에 다시 시도해주세요.');
          navigate('/');
        });
    }
  }, [loginUser, navigate]);

  useEffect(() => {
    getAlarms();
  }, [getAlarms]);

  // console.log(alarms);

  return (
    <div className="alarm-list">
      <BackToTop />
      {/* {alarms === [] ? <EmptyAlarm /> : ''} */}
      {loginUser.loginUserRole === 'ROLE_SELLER' ? (
        <div>
          {alarms.map(alarm => (
            <Alarm
              key={alarm.sellerAlarmId}
              alarm={alarm.sellerAlarmResponse}
              role={loginUser.loginUserRole}
              token={loginUser.token}
            />
          ))}
        </div>
      ) : (
        <div>
          {alarms.map(alarm => (
            <Alarm
              key={alarm.buyerAlarmId}
              alarm={alarm.buyerAlarmResponse}
              role={loginUser.loginUserRole}
              token={loginUser.token}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default AlarmList;
