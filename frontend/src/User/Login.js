import * as React from 'react';
import { useNavigate } from 'react-router';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import BackToTop from '../AppBar/BackToTop';
import { styled } from '@mui/material/styles';
import axios from 'axios';

import { useSelector, useDispatch } from 'react-redux';
import { login } from '../redux/user';

const ColorButton = styled(Button)(() => ({
  // color: theme.palette.getContrastText(purple[500]),
  backgroundColor: '#deb887',
  '&:hover': {
    backgroundColor: '#deb887',
  },
}));

const CssTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: '#deb887',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#deb887',
  },
  '& .MuiOutlinedInput-root': {
    '&.Mui-focused fieldset': {
      borderColor: '#deb887',
    },
  },
});

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}.
    </Typography>
  );
}

const theme = createTheme();

export default function LogInPage() {
  const user = useSelector(state => state.user.value);
  console.log('유저', user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async event => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      userId: data.get('id'),
      password: data.get('password'),
    });
    const loginInfo = {
      userId: data.get('id'),
      password: data.get('password'),
    };
    console.log(loginInfo);
    await axios
      .post('https://i8b204.p.ssafy.io/be-api/user/login', loginInfo)
      .then(res => {
        console.log(res);
        dispatch(login({ token: res.headers.authorization }));
        alert('로그인되었습니다.');
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <BackToTop />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            로그인
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <CssTextField
              margin="normal"
              required
              fullWidth
              id="id"
              label="아이디"
              name="id"
              autoComplete="id"
              autoFocus
            />
            <CssTextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="비밀번호"
              type="password"
              id="password"
              autoComplete="current-password"
            />

            <ColorButton
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              로그인
            </ColorButton>
            <Grid container justifyContent="center">
              <Grid item>
                <Button
                  variant="text"
                  onClick={() => {
                    navigate('/signup');
                  }}
                  sx={{ color: '#deb887' }}
                >
                  계정이 없으신가요? 회원가입하기
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
