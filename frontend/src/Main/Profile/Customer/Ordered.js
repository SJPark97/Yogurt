import { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import PostAddOutlinedIcon from '@mui/icons-material/PostAddOutlined';
import './Ordered.css';

import { styled } from '@mui/material/styles';

const ColorButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#deb887',
  '&:hover': {
    backgroundColor: '#deb887',
    boxShadow: 'none',
  },
  '&:active': {
    boxShadow: 'none',
    backgroundColor: '#deb887',
  },
}));

export default function Ordered() {
  const loginUser = useSelector(state => state.user.value);
  const [orderedPosts, setOrderedPosts] = useState([]);
  const navigate = useNavigate();
  const getOrderedPosts = useCallback(async () => {
    await axios
      .get('https://i8b204.p.ssafy.io/be-api/endPost', {
        headers: { Authorization: loginUser.token },
      })
      .then(res => {
        setOrderedPosts(res.data.endPosts);
      })
  }, [loginUser]);

  useEffect(() => {
    getOrderedPosts();
  }, [getOrderedPosts]);


  const handleClick = event => {
    navigate(`/review/join`, { state: event });
  };

  return (
    <div className="totalOrdered">
      <div>구매내역 {orderedPosts.length}개</div>
      {orderedPosts.map(ordered => (
        <div key={ordered.post.id}>
          <Box
            sx={{
              marginY: '16px',
              display: 'flex',
              height: '100%',
              maxWidth: '100%',
              alignItems: 'start',
              justifyContent: 'start',
              textAlign: 'start',
            }}
          >
            <img
              src={ordered.post.postImages[0].url}
              alt="구매완료 상품 사진"
              className="orderedImg"
            />
            <div>
              <div className="orderedBrand">{ordered.post.brCateName}</div>
              <div className="orderedName">{ordered.post.title}</div>
              <div className="orderedPrice">
                {ordered.post.sale_price.toLocaleString()}원
              </div>
            </div>
          </Box>
          <div className="reviewBtn">
            <ColorButton
              fullWidth
              variant="contained"
              startIcon={<PostAddOutlinedIcon />}
              sx={{
                marginBottom: '16px',
              }}
              onClick={() => handleClick(ordered.post.id)}
            >
              리뷰 작성
            </ColorButton>
          </div>
          <Divider variant="middle" sx={{ marginX: 0 }} />
        </div>
      ))}
    </div>
  );
}
