import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Divider from '@mui/material/Divider';
import { styled } from '@mui/material/styles';
import './StoreInfo.css';
import { useSearchParams } from 'react-router-dom';
import LiveInfo from './LiveInfo';
import ProductInfo from './ProductInfo';
import Notice from './Notice';
import Reviews from './Reviews';

const StyledMiddleNavigationAction = styled(BottomNavigationAction)`
  color: #cccccc;
  max-width: 100%;

  .MuiBottomNavigationAction-label {
    background: #ffffff;
    font-size: 16px;
  }

  .MuiBottomNavigationAction-label.Mui-selected {
    font-size: 16px;
  }

  &.Mui-selected {
    color: #deb887;
    font-weight: Bold;
    border-bottom: 2px #deb887 solid;
  }
`;

export default function StoreInfo() {
  const [searchParams, setserchParams] = useSearchParams();
  const tab = Number(searchParams.get('tab'));

  // value 값에 따라서 상품, 라이브, 공지사항, 리뷰 중에 하나의 값을 선택함을 알 수 있다.
  // 그러면 이미 받아오려나 아니며누를때 받아오려나?
  return (
    <>
      <header className="mid-nav">
        <Box sx={{ width: '100%', height: '100%' }}>
          <BottomNavigation
            showLabels
            value={tab}
            onChange={(e, newValue) => {
              setserchParams({ tab: `${newValue}` });
            }}
            sx={{ background: '#ffffff' }}
          >
            <StyledMiddleNavigationAction label="상품" />
            <StyledMiddleNavigationAction label="라이브" />
            <StyledMiddleNavigationAction label="공지사항" />
            <StyledMiddleNavigationAction label="리뷰" />
          </BottomNavigation>
          <Divider />
        </Box>
      </header>
      <main>
        {tab === 0 && <ProductInfo />}
        {tab === 1 && <LiveInfo />}
        {tab === 2 && <Notice />}
        {tab === 3 && <Reviews />}
      </main>
    </>
  );
}
