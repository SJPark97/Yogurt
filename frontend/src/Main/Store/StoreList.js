import '../../App.css';
import { useEffect, useState, useCallback } from 'react';
import BackToTop from '../../AppBar/BackToTop';
import { useSelector } from 'react-redux';
import StoreItem from './StoreItem';
import './StoreList.css';
import axios from 'axios';

function StoreList() {
  const [stores, setStores] = useState([]);
  const loginUser = useSelector(state => state.user.value);

  const getStores = useCallback(async () => {
    await axios
      .get('https://i8b204.p.ssafy.io/be-api/user/seller', {
        headers: { Authorization: loginUser.token },
      })
      .then(res => {
        setStores(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, [loginUser]);

  useEffect(() => {
    getStores();
  }, [getStores]);

  console.log('스토어 페이지 - 스토어 리스트', stores);

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
