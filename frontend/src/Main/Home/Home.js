import { useState, useEffect } from 'react';
import axios from 'axios';

import './Home.css';
import BackToTop from '../../AppBar/BackToTop';
import LiveCarousel from './LiveCarousel';
import Carousel from '../../Common/Carousel';
import HomeCarousel from './HomeCarousel';

import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';

function Home() {
  const [populars, setPopulars] = useState([]);
  const [latests, setLatests] = useState([]);
  const [lives, setLives] = useState([]);

  const getPopularList = async () => {
    await axios
      .get('https://i8b204.p.ssafy.io/be-api/post/popular')
      .then(res => {
        setPopulars(res.data);
      })
  };

  const getLatestList = async () => {
    await axios
      .get('https://i8b204.p.ssafy.io/be-api/post/new')
      .then(res => {
        setLatests(res.data);
      })
  };

  const getLiveList = async () => {
    await axios
      .get('https://i8b204.p.ssafy.io/be-api/live/getall')
      .then(res => {
        setLives(res.data);
      })
  };

  useEffect(() => {
    getPopularList();
    getLatestList();
    getLiveList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <BackToTop />
      <Box sx={{ width: '100%' }}>
        <HomeCarousel />
      </Box>
      <div className="mainpage">
        <p className="mainpageTitle">실시간 라이브</p>
        <div className={lives.length === 0 ? 'nolive' : 'Livecarousel'}>
          {lives.length === 0 ? (
            '진행중인 라이브가 없습니다'
          ) : (
            <LiveCarousel lives={lives} />
          )}
        </div>
        <Divider variant="middle" />
        <p className="mainpageTitle">인기상품</p>
        <Carousel list={populars} />
        <Divider variant="middle" />
        <p className="mainpageTitle">따끈따끈한 신상</p>
        <Carousel list={latests} />
      </div>
    </div>
  );
}

export default Home;
