import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Divider from '@mui/material/Divider';
import { styled, alpha } from '@mui/material/styles';

const SearchBar = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.125),

  marginRight: 0,
  marginLeft: 0,
  width: '100%',
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    // transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('lg')]: {
      width: '100%',
    },
  },
}));

export default function SearchAppBar() {
  const navigate = useNavigate();
  const searchParams = useSearchParams();
  // const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get('search');
  // console.log(setSearchParams);

  // const handleKeyUp = e => {
  //   console.log('keyup', e.target.value);
  // };

  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      // 쿼리로 보내기
      navigate(`/search/result?search=${e.target.value}`);
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        color="inherit"
        elevation={0}
        sx={{ textAlign: 'start' }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="back"
            sx={{ mr: 2 }}
            onClick={() => navigate(-1)}
          >
            <ArrowBackIosNewIcon />
          </IconButton>
          <SearchBar>
            <SearchIconWrapper>
              <SearchIcon htmlColor="#6F6F6F" />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="브랜드 또는 상품 검색"
              inputProps={{ 'aria-label': 'search' }}
              fullWidth
              autoFocus={!search}
              // onKeyUp={handleKeyUp}
              onKeyPress={handleKeyPress}
              id="searchText"
              name="searchText"
              defaultValue={search}
            />
          </SearchBar>
        </Toolbar>
        <Divider />
      </AppBar>
    </Box>
  );
}