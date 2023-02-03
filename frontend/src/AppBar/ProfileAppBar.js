import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import { Link } from 'react-router-dom';

import { styled } from '@mui/material/styles';

const CustomAppBar = styled(AppBar)`
  background: #ff3d00;
`;

export default function ProfileAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <CustomAppBar position="fixed" elevation={1}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <Link to="/category" style={{ color: '#ffffff' }}>
              <MenuIcon />
            </Link>
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            LOGO
          </Typography>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="search"
          >
            <SearchOutlinedIcon />
          </IconButton>
          <IconButton
            size="large"
            edge="end"
            color="inherit"
            aria-label="search"
          >
            <MoreVertIcon />
          </IconButton>
        </Toolbar>
      </CustomAppBar>
    </Box>
  );
}
