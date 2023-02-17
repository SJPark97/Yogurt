import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import StoreIcon from '@mui/icons-material/Store';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LoginIcon from '@mui/icons-material/Login';
import Paper from '@mui/material/Paper';
import { useEffect } from 'react';

import { styled } from '@mui/material/styles';
import { useNavigate, useLocation } from 'react-router-dom';

import { useSelector } from 'react-redux';

const CustomBottomNavigationAction = styled(BottomNavigationAction)`
  color: #bdbdbd;
  max-width: 100%;

  .MuiBottomNavigationAction-label {
    background: #ffffff;
  }

  &.Mui-selected {
    color: #deb887;
  }
`;

export default function Footer() {
  const [value, setValue] = React.useState();
  const ref = React.useRef(null);
  const navigate = useNavigate();
  const pageUrl = useLocation().pathname;

  const loginUser = useSelector(state => state.user.value);
  // console.log('푸터에서 찍은 user 정보', loginUser.loginUserPk);

  useEffect(() => {
    if (pageUrl === '/') {
      setValue(0);
    } else if (pageUrl === '/stores') {
      setValue(1);
    } else if (pageUrl === '/alarms') {
      setValue(2);
    } else if (pageUrl.includes('/profile')) {
      setValue(3);
    }
  }, [pageUrl]);

  // // 유저정보
  // let userRole;
  // if (user.role === 'buyer') {
  //   userRole = 'buyer';
  // } else {
  //   userRole = 'seller';
  // }

  return (
    <Box sx={{ pb: 7 }} ref={ref}>
      <CssBaseline />
      <Paper
        sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <CustomBottomNavigationAction
            label="메인"
            icon={<HomeIcon />}
            onClick={() => {
              navigate('/');
            }}
          />
          <CustomBottomNavigationAction
            label="상점"
            icon={<StoreIcon />}
            onClick={() => {
              if (loginUser.token) {
                navigate('/stores');
              } else {
                navigate('/login');
              }
            }}
          />
          <CustomBottomNavigationAction
            label="알림"
            icon={<NotificationsIcon />}
            onClick={() => {
              if (loginUser.token) {
                navigate('/alarms');
              } else {
                navigate('/login');
              }
            }}
          />
          {loginUser.token ? (
            <CustomBottomNavigationAction
              label="프로필"
              icon={<AccountCircleIcon />}
              onClick={() => {
                if (loginUser.loginUserRole === 'ROLE_BUYER') {
                  navigate(`/profile/buyer/${loginUser.loginUserPk}?tab=0`);
                } else {
                  navigate(`/profile/seller/${loginUser.loginUserPk}?tab=0`);
                }
              }}
            />
          ) : (
            <CustomBottomNavigationAction
              label="로그인"
              icon={<LoginIcon />}
              onClick={() => {
                navigate('/login');
              }}
            />
          )}
        </BottomNavigation>
      </Paper>
    </Box>
  );
}
