import Box from '@mui/material/Box';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';

import { useNavigate } from 'react-router-dom';

const responses = [
  {
    storeId: 0,
    storeImg:
      'http://snaptime.edaily.co.kr/wp-content/uploads/2019/12/50717-700x516.jpg',
    storeName: '박토어',
    storeContent:
      '27년 전통을 자랑하는 무구한 역사를 함께 해온 우리 모두의 빈티지 쇼핑몰',
    storeLikes: 4579677,
    storeisLiked: true,
  },
  {
    storeId: 1,
    storeImg:
      'http://snaptime.edaily.co.kr/wp-content/uploads/2019/12/50717-700x516.jpg',
    storeName: '박토어',
    storeContent:
      '27년 전통을 자랑하는 무구한 역사를 함께 해온 우리 모두의 빈티지 쇼핑몰',
    storeLikes: 4579677,
    storeisLiked: true,
  },
  {
    storeId: 2,
    storeImg:
      'http://snaptime.edaily.co.kr/wp-content/uploads/2019/12/50717-700x516.jpg',
    storeName: '박토어',
    storeContent:
      '27년 전통을 자랑하는 무구한 역사를 함께 해온 우리 모두의 빈티지 쇼핑몰',
    storeLikes: 4579677,
    storeisLiked: true,
  },
  {
    storeId: 3,
    storeImg:
      'http://snaptime.edaily.co.kr/wp-content/uploads/2019/12/50717-700x516.jpg',
    storeName: '박토어',
    storeContent:
      '27년 전통을 자랑하는 무구한 역사를 함께 해온 우리 모두의 빈티지 쇼핑몰',
    storeLikes: 4579677,
    storeisLiked: true,
  },
  {
    storeId: 4,
    storeImg:
      'http://snaptime.edaily.co.kr/wp-content/uploads/2019/12/50717-700x516.jpg',
    storeName: '박토어',
    storeContent:
      '27년 전통을 자랑하는 무구한 역사를 함께 해온 우리 모두의 빈티지 쇼핑몰',
    storeLikes: 4579677,
    storeisLiked: true,
  },
  {
    storeId: 5,
    storeImg:
      'http://snaptime.edaily.co.kr/wp-content/uploads/2019/12/50717-700x516.jpg',
    storeName: '박토어',
    storeContent:
      '27년 전통을 자랑하는 무구한 역사를 함께 해온 우리 모두의 빈티지 쇼핑몰',
    storeLikes: 4579677,
    storeisLiked: true,
  },
];

export default function LikeStore() {
  const navigate = useNavigate();

  const likeCnt = storeLikes => {
    if (storeLikes >= 10000) {
      return `${(storeLikes / 10000).toFixed(1)} 만`;
    }
    if (storeLikes >= 1000) {
      return `${(storeLikes / 1000).toFixed(1)} 천`;
    }
    return `${storeLikes}`;
  };
  return (
    <div>
      {responses.map(store => (
        <div key={store.storeId}>
          <Box
            sx={{
              marginBottom: '8px',
              margin: '16px',
              display: 'flex',
              height: '100%',
              maxWidth: '100%',
              alignItems: 'center',
              justifyContent: 'start',
            }}
            onClick={() => {
              navigate(`/stores/${store.storeId}?tab=0`);
            }}
          >
            <img src={store.storeImg} alt="#" className="store-img" />
            <div>
              <div className="store-text">
                <p className="store-name">{store.storeName}</p>
                <div className="store_like">
                  <IconButton
                    size="small"
                    color="inherit"
                    aria-label="like"
                    sx={{ color: 'red' }}
                  >
                    {store.storeisLiked && <FavoriteIcon fontSize="small" />}
                    {!store.storeisLiked && (
                      <FavoriteBorderIcon fontSize="small" />
                    )}
                  </IconButton>
                  <div className="store-cnt">{likeCnt(store.storeLikes)}</div>
                </div>
              </div>
              <div className="store-introduce">{store.storeContent}</div>
            </div>
          </Box>
          <Divider variant="middle" />
        </div>
      ))}
    </div>
  );
}
