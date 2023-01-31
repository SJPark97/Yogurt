import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import StoreIcon from '@mui/icons-material/Store';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Paper from '@mui/material/Paper';
import { useEffect } from 'react';

import { styled } from '@mui/material/styles';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const CustomBottomNavigationAction = styled(BottomNavigationAction)`
  color: #bdbdbd;

  .MuiBottomNavigationAction-label {
    background: #ffffff;
  }

  &.Mui-selected {
    color: #ff3d00;
  }
`;

export default function MainFooter({ user }) {
  const [value, setValue] = React.useState();
  const ref = React.useRef(null);
  const navigate = useNavigate();
  const pageUrl = useLocation().pathname;

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
  }, [value]);

  // 유저정보
  let userRole;
  if (user.role === 'buyer') {
    userRole = 'buyer';
  } else {
    userRole = 'seller';
  }

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
            component={Link}
            to="/"
            label="메인"
            icon={<HomeIcon />}
            // onClick={() => navigate("/")} 바로 이동할때는 Link쓰기
          />
          <CustomBottomNavigationAction
            component={Link}
            to="/stores"
            label="상점"
            icon={<StoreIcon />}
          />
          <CustomBottomNavigationAction
            component={Link}
            to="/alarms"
            label="알림"
            icon={<NotificationsIcon />}
          />
          <CustomBottomNavigationAction
            label="프로필"
            icon={<AccountCircleIcon />}
            onClick={() =>
              userRole === 'buyer'
                ? navigate('/profile/buyer')
                : navigate('/profile/seller')
            } // 이거는 로그인 안됐을 때 로그인 페이지로 가게
            // sx={[
            //   {
            //     color: "#bdbdbd",
            //     "&.Mui-selected": { color: "#ff3d00", background: "#ffffff" },
            //   },
            // ]}
          />
        </BottomNavigation>
      </Paper>
    </Box>
  );
}
