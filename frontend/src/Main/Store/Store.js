// 로그인 한 유저id를 가지고 구매자인지, 판매자인지 구분
// 판매자라면 상품등록, 라이브 시작하기 버튼이 따로 있음
import Box from '@mui/material/Box';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import { useNavigate } from 'react-router-dom';

import './Store.css';

// const StyledLink = styled(Link)``;

function Store({ sellerData }) {
  let likeCnt = '';
  if (sellerData.Store_likes >= 10000) {
    likeCnt = `${(sellerData.Store_likes / 10000).toFixed(1)} 만`;
  } else if (sellerData.Store_likes >= 1000) {
    likeCnt = `${(sellerData.Store_likes / 1000).toFixed(1)} 천`;
  } else {
    likeCnt = `${sellerData.Store_likes}`;
  }

  // 상점 디테일 이동위해 naviate 사용
  const navigate = useNavigate();
  const storeId = sellerData.Store_id;
  const handleClick = () => {
    console.log('디테일 페이지 스토어 아이디', storeId);
    navigate(`/stores/${storeId}?tab=0`, { state: sellerData });
  };
  // 상품 라이브 공지사항 리뷰 선택된 것

  return (
    <div>
      <Box
        onClick={() => handleClick()}
        sx={{
          marginBottom: '8px',
          margin: '16px',
          display: 'flex',
          height: '100%',
          maxWidth: '100%',
          alignItems: 'center',
          justifyContent: 'start',
        }}
      >
        <img src={sellerData.Store_thumbnail} alt="#" className="store-img" />
        <div>
          <div className="store-text">
            <p className="store-name">{sellerData.Store_name}</p>
            <div className="store_like">
              <IconButton
                size="small"
                color="inherit"
                aria-label="like"
                sx={{ color: 'red' }}
              >
                {sellerData.Store_like ? (
                  <FavoriteIcon fontSize="small" />
                ) : (
                  <FavoriteBorderIcon fontSize="small" />
                )}
              </IconButton>
              <div className="store-cnt">{likeCnt}</div>
            </div>
          </div>
          <div className="store-introduce">{sellerData.Store_oneline}</div>
        </div>
      </Box>
      <Divider variant="middle" />
    </div>
  );
}

export default Store;
