import { useState, useEffect } from 'react';
import './Home.css';
import BackToTop from '../../AppBar/BackToTop';
import LiveCarousel from './LiveCarousel';
import Carousel from '../../Common/Carousel';
import dummy from '../../db/SJ.json';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import axios from 'axios';
import HomeCarousel from './HomeCarousel';

function Home() {
  const [populars, setPopulars] = useState([]);
  const [latests, setLatests] = useState([]);
  // const [lives, setLives] = useState([]);

  const getPopularList = async () => {
    await axios
      .get('https://i8b204.p.ssafy.io/be-api/post')
      .then(res => {
        setPopulars(res.data);
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
      })
      .catch(err => {
        console.log(err);
      });
  };

  const getLiveList = async () => {
    await axios
      .get('https://i8b204.p.ssafy.io/be-api/live/getall')
      .then(res => {
        console.log('라이브중인게 없어요', res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    getPopularList();
    getLatestList();
    getLiveList();
  }, []);

  const live = dummy.Live;

  return (
    <div>
      <BackToTop />
      <Box sx={{ width: '100%' }}>
        <HomeCarousel />
      </Box>
      <div className="mainpage">
        <p className="mainpageTitle">라이브</p>
        <LiveCarousel card={live} />
        <Divider variant="middle" />
        <p className="mainpageTitle">이번 주 주목해야 될 상품</p>
        <Carousel list={populars} />
        <Divider variant="middle" />
        <p className="mainpageTitle">신상</p>
        <Carousel list={latests} />
      </div>
    </div>
  );
}

export default Home;
