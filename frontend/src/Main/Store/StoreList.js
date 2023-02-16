import '../../App.css';
import { useEffect, useState, useCallback } from 'react';
import BackToTop from '../../AppBar/BackToTop';
import { useSelector } from 'react-redux';
import StoreItem from './StoreItem';
import './StoreList.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function StoreList() {
  const [stores, setStores] = useState([]);
  const loginUser = useSelector(state => state.user.value);
  const navigate = useNavigate();
  const getStores = useCallback(async () => {
    await axios
      .get('https://i8b204.p.ssafy.io/be-api/user/seller', {
        headers: { Authorization: loginUser.token },
      })
      .then(res => {
        setStores(res.data);
      })
      .catch(() => {
        alert('문제가 발생했습니다. \n 잠시후에 다시 시도해주세요.');
        navigate('/');
      });
  }, [loginUser, navigate]);

  useEffect(() => {
    getStores();
  }, [getStores]);
  
  return (
    <div className="Store">
      <BackToTop />
      <div>
        {stores.map(store => (
          <StoreItem store={store} key={store.id} />
        ))}
      </div>
    </div>
  );
}

export default StoreList;
