import { useState, useCallback, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import BackToTop from '../AppBar/BackToTop';
import SearchCard from '../Search/SearchCard';
import { Divider } from '@mui/material';
import './Category.css';

export default function BrandDetail() {
  const { brandId } = useParams();
  const navigate = useNavigate();
  const state = useLocation().state;
  const [items, setItems] = useState();

  const getBrand = useCallback(async () => {
    await axios
      .get(`https://i8b204.p.ssafy.io/be-api/cate/brand/${brandId}`)
      .then(res => {
        setItems(res.data.postCateList);
      })
  }, [brandId]);

  useEffect(() => {
    getBrand();
  }, [getBrand]);

  return (
    <div>
      <BackToTop />
      <div className="brandInfo">
        <img
          src={state.brandImg}
          alt="브랜드 사진"
          className="brandDetailImg"
        />
        <div className="brandDetail">{state.brandName}</div>
      </div>
      <Divider variant="middle" />
      {items && (
        <div className="searchCardList">
          {items.map(result => {
            return (
              <SearchCard result={result} key={result.id} navigate={navigate} />
            );
          })}
        </div>
      )}
    </div>
  );
}
