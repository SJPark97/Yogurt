import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import Logo from '../Images/Yogurt_Logo.png';

import { useNavigate } from 'react-router-dom';

import { styled } from '@mui/material/styles';
const CustomAppBar = styled(AppBar)`
  background: #deb887;
`;

export default function ButtonAppBar() {
  const navigate = useNavigate();
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
            onClick={() => {
              navigate('/category');
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="div" component="div" sx={{ flexGrow: 1 }}>
            <img
              src={Logo}
              alt="LOGO"
              style={{
                width: '120px',
                height: '48px',
              }}
            />
          </Typography>
          <IconButton
            size="large"
            color="inherit"
            aria-label="cart"
            onClick={() => {
              navigate('/wishlist');
            }}
          >
            <ShoppingBagOutlinedIcon />
          </IconButton>
          <IconButton
            size="large"
            edge="end"
            color="inherit"
            aria-label="search"
            onClick={() => {
              navigate('/search?searching=');
            }}
          >
            <SearchOutlinedIcon />
          </IconButton>
        </Toolbar>
      </CustomAppBar>
    </Box>
  );
}
