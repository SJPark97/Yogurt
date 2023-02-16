import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Divider from '@mui/material/Divider';
import { styled } from '@mui/material/styles';
import './CustomerInfo.css';
import { useSearchParams } from 'react-router-dom';
import Ordered from './Ordered';
import LikePost from './LikePost';
import LikeStore from './LikeStore';

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

export default function CustomerInfo() {
  const [searchParams, setserchParams] = useSearchParams();

  const tab = Number(searchParams.get('tab'));
 
  return (
    <>
      <header className="mid-nav">
        <Box sx={{ width: '100%', height: '100%' }}>
          <BottomNavigation
            showLabels
            value={tab}
            onChange={(event, newValue) => {
              setserchParams({ tab: `${newValue}` });
            }}
            sx={{ background: '#ffffff' }}
          >
            <StyledMiddleNavigationAction label="구매내역" />
            <StyledMiddleNavigationAction label="찜" />
            <StyledMiddleNavigationAction label="즐겨찾기" />
          </BottomNavigation>
          <Divider />
        </Box>
      </header>
      <main>
        {tab === 0 && <Ordered />}
        {tab === 1 && <LikePost />}
        {tab === 2 && <LikeStore />}
      </main>
    </>
  );
}
