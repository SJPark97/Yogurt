import * as React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AddBusinessOutlinedIcon from '@mui/icons-material/AddBusinessOutlined';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import NotificationAddOutlinedIcon from '@mui/icons-material/NotificationAddOutlined';
import VideoCallOutlinedIcon from '@mui/icons-material/VideoCallOutlined';
import LogoutIcon from '@mui/icons-material/Logout';

export default function ProfileDrawer() {
  const [state, setState] = React.useState({
    bottom: false,
  });

  const navigate = useNavigate();
  const url = useLocation().pathname;

  const sellerHandleClick = index => {
    if (index === 0) {
      console.log('로그아웃');
    } else if (index === 1) {
      navigate('/post/join');
    } else if (index === 2) {
      // navigate('/noted/join');
      navigate('/live/join');
    } else if (index === 3) {
      navigate('/noted/join');
    } else if (index === 4) {
      navigate('/profile/modify');
    }
  };

  const buyerHandleClick = index => {
    if (index === 0) {
      console.log('로그아웃');
    } else if (index === 1) {
      navigate('/profile/modify');
    }
  };

  const toggleDrawer = open => event => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, bottom: open });
  };

  const list = () =>
    url === '/profile/seller' ? (
      <Box
        sx={{ width: 'auto' }}
        role="presentation"
        onClick={toggleDrawer(false)}
        onKeyDown={toggleDrawer(false)}
      >
        <List>
          {[
            '로그아웃',
            '상품등록',
            '라이브 등록',
            '공지사항 등록',
            '프로필 관리',
          ].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton
                onClick={() => {
                  sellerHandleClick(index);
                }}
              >
                <ListItemIcon>
                  {index === 0 ? <LogoutIcon /> : ''}
                  {index === 1 ? <AddBusinessOutlinedIcon /> : ''}
                  {index === 2 ? <VideoCallOutlinedIcon /> : ''}
                  {index === 3 ? <NotificationAddOutlinedIcon /> : ''}
                  {index === 4 ? <ManageAccountsIcon /> : ''}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    ) : (
      <Box
        sx={{ width: 'auto' }}
        role="presentation"
        onClick={toggleDrawer(false)}
        onKeyDown={toggleDrawer(false)}
      >
        <List>
          {['로그아웃', '프로필 관리'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton
                onClick={() => {
                  buyerHandleClick(index);
                }}
              >
                <ListItemIcon>
                  {index === 0 ? <LogoutIcon /> : ''}
                  {index === 1 ? <ManageAccountsIcon /> : ''}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    );

  return (
    <div>
      <React.Fragment key="bottom">
        <IconButton
          size="large"
          edge="end"
          color="inherit"
          aria-label="more"
          onClick={toggleDrawer(true)}
        >
          <MoreVertIcon />
        </IconButton>
        <Drawer
          anchor="bottom"
          open={state.bottom}
          onClose={toggleDrawer(false)}
        >
          {list()}
        </Drawer>
      </React.Fragment>
    </div>
  );
}
