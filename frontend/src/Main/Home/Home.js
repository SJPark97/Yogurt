import React from 'react';
import { useState, useEffect } from 'react';
import './Home.css';
import BackToTop from '../../AppBar/BackToTop';
import LiveCarousel from './LiveCarousel';
import Carousel from '../../Common/Carousel';
import dummy from '../../db/SJ.json';
import Divider from '@mui/material/Divider';
import axios from 'axios';

function Home() {
  const [populars, setPopulars] = useState([]);
  const [latests, setLatests] = useState([]);

  const getPopularList = async () => {
    await axios
      .get('https://i8b204.p.ssafy.io/be-api/post')
      .then(res => {
        setPopulars(res.data);
        console.log('인기순 데이터 받았어유', res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const getLatestList = async () => {
    await axios
      .get('https://i8b204.p.ssafy.io/be-api/post')
      .then(res => {
        setLatests(res.data);
        console.log('최신순 데이터에유', res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    getPopularList();
    getLatestList();
  }, []);

  console.log(populars);
  console.log(latests);

  // const card = dummy.New;
  const live = dummy.Live;
  // console.log(card);

  return (
    <div className="mainpage">
      <BackToTop />
      <h1>메인 페이지 - 여기에 사진 캐러셀?</h1>
      <p className="mainpageTitle">라이브</p>
      <LiveCarousel card={live} />
      <Divider variant="middle" />
      <p className="mainpageTitle">이번 주 주목해야 될 상품</p>
      <Carousel list={populars} />
      <Divider variant="middle" />
      <p className="mainpageTitle">신상</p>
      <Carousel list={latests} />
    </div>
  );
}

export default React.memo(Home);
