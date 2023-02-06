import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AddBusinessOutlinedIcon from '@mui/icons-material/AddBusinessOutlined';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import NotificationAddOutlinedIcon from '@mui/icons-material/NotificationAddOutlined';
import VideoCallOutlinedIcon from '@mui/icons-material/VideoCallOutlined';

export default function ProfileDrawer() {
  const [state, setState] = React.useState({
    bottom: false,
  });

  const navigate = useNavigate();

  const handleClick = index => {
    if (index === 0) {
      navigate('/post/join');
    } else if (index === 1) {
      // navigate('/noted/join');
      console.log('라이브 등록 페이지로 이동');
    } else if (index === 2) {
      navigate('/noted/join');
    } else if (index === 3) {
      console.log('프로필 관리 페이지로 이동');
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

  const list = () => (
    <Box
      sx={{ width: 'auto' }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <Divider />
      <List>
        {['상품등록', '라이브 등록', '공지사항 작성', '프로필 관리'].map(
          (text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton
                onClick={() => {
                  handleClick(index);
                }}
              >
                <ListItemIcon>
                  {index === 0 ? <AddBusinessOutlinedIcon /> : ''}
                  {index === 1 ? <VideoCallOutlinedIcon /> : ''}
                  {index === 2 ? <NotificationAddOutlinedIcon /> : ''}
                  {index === 3 ? <ManageAccountsIcon /> : ''}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ),
        )}
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
