// 유저정보 받아와서 기존에 검색히스토리 가져와서 컴포넌트에 내려주기
// 검색 시 검색 히스토리 사라지고 그부분에 검색 내용 찾아주기
import { useState, useEffect, useCallback } from 'react';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import BackToTop from '../AppBar/BackToTop';
import SearchHistory from './SearchHistory';
import axios from 'axios';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { styled, alpha } from '@mui/material/styles';
import SearchCard from './SearchCard';
import './SearchHistory.css';

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

function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [text, setText] = useState();
  const [replace, setReplace] = useState();
  const [posts, setPosts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [stores, setStores] = useState([]);
  const [results, setResults] = useState([]);

  const getPosts = useCallback(async () => {
    await axios
      .get(`https://i8b204.p.ssafy.io/be-api/search/post/${text}`)
      .then(res => {
        setPosts(res.data);
      })
  }, [text]);

  const getBrands = useCallback(async () => {
    await axios
      .get(`https://i8b204.p.ssafy.io/be-api/search/brand/${text}`)
      .then(res => {
        setBrands(res.data);
      })
  }, [text]);

  const getStores = useCallback(async () => {
    await axios
      .get(`https://i8b204.p.ssafy.io/be-api/search/seller/${text}`)
      .then(res => {
        setStores(res.data);
      })
  }, [text]);

  useEffect(() => {
    if (text) {
      getPosts();
      getBrands();
      getStores();
    }
  }, [text, getPosts, getBrands, getStores]);

  const handleClick = () => {
    if (searchParams.get('searching').length === 0) {
      navigate(-1);
    } else {
      navigate(-2);
    }
  };


  const handleChange = e => {
    setText(e.target.value);
  };
  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      setResults(posts);
      setPosts([]);
      setStores([]);
      setBrands([]);
      // 쿼리로 보내기
      searchParams.set('searching', e.target.value);
      setSearchParams(searchParams);
    }
  };

  return (
    <div>
      <BackToTop />
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
              onClick={handleClick}
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
                autoFocus
                onChange={handleChange}
                onKeyPress={handleKeyPress}
                id="searchText"
                name="searchText"
                value={replace || text || ''}
              />
            </SearchBar>
          </Toolbar>
          <Divider />
        </AppBar>
      </Box>
      {text && brands.length > 0 && (
        <div>
          <Typography
            variant="p"
            component="div"
            sx={{
              fontWeight: '800',
              margin: '1rem',
              textAlign: 'start',
              fontSize: '1.2rem',
            }}
          >
            브랜드
          </Typography>
          {brands.map(brand => (
            <Box
              key={brand.id}
              sx={{
                marginBottom: '8px',
                margin: '16px',
                display: 'flex',
                height: '100%',
                maxWidth: '100%',
                alignItems: 'center',
                justifyContent: 'start',
                fontSize: '1rem',
                paddingY: '8px',
              }}
              onClick={() => {
                navigate(`/brand/${brand.id}`, {
                  state: { brandName: brand.name, brandImg: brand.img },
                });
              }}
            >
              <SearchIcon
                sx={{
                  color: 'gray',
                }}
              />
              <Typography
                variant="p"
                component="div"
                role="presentation"
                sx={{ textAlign: 'start', marginLeft: '1rem' }}
              >
                {brand.name || brand.title || brand.nickName}
              </Typography>
            </Box>
          ))}
          <Divider variant="middle" />
        </div>
      )}
      {text && stores.length > 0 && (
        <div>
          <Typography
            variant="p"
            component="div"
            sx={{
              fontWeight: '800',
              margin: '1rem',
              textAlign: 'start',
              fontSize: '1.2rem',
            }}
          >
            스토어
          </Typography>
          {stores.map(store => (
            <SearchHistory searchData={store} key={store.id} />
          ))}
          <Divider variant="middle" />
        </div>
      )}
      {text && posts.length > 0 && (
        <div>
          <Typography
            variant="p"
            component="div"
            sx={{
              fontWeight: '800',
              margin: '1rem',
              textAlign: 'start',
              fontSize: '1.2rem',
            }}
          >
            상품
          </Typography>
          {posts.map(post => (
            <Box
              key={post.id}
              sx={{
                marginBottom: '8px',
                margin: '16px',
                display: 'flex',
                height: '100%',
                maxWidth: '100%',
                alignItems: 'center',
                justifyContent: 'start',
                fontSize: '1rem',
                paddingY: '8px',
              }}
              onClick={() => {
                if (post.name) {
                  setReplace(post.name);
                  setResults(
                    posts.filter(result => {
                      return result.title === post.name;
                    }),
                  );
                } else if (post.title) {
                  setReplace(post.title);
                  setResults(
                    posts.filter(result => {
                      return result.title === post.title;
                    }),
                  );
                } else if (post.nickName) {
                  setReplace(post.nickName);
                  setResults(
                    posts.filter(result => {
                      return result.title === post.nickName;
                    }),
                  );
                }
                setPosts([]);
                setStores([]);
                setBrands([]);
                setText('');
                searchParams.set(
                  'searching',
                  post.name || post.title || post.nickName,
                );
                setSearchParams(searchParams);
              }}
            >
              <SearchIcon
                sx={{
                  color: 'gray',
                }}
              />
              <Typography
                variant="p"
                component="div"
                role="presentation"
                sx={{ textAlign: 'start', marginLeft: '1rem' }}
              >
                {post.name || post.title || post.nickName}
              </Typography>
            </Box>
          ))}
          <Divider variant="middle" />
        </div>
      )}
      {results.length > 0 && (
        <div className="searchCardList">
          {results.map(result => {
            return (
              <SearchCard result={result} key={result.id} navigate={navigate} />
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Search;
