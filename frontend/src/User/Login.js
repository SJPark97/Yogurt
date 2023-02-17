import * as React from 'react';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { login } from '../redux/user';
import axios from 'axios';

import BackToTop from '../AppBar/BackToTop';

import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { styled } from '@mui/material/styles';


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

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 320,
  height: 200,
  bgcolor: 'background.paper',
  boxShadow: 24,
};

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
  // const user = useSelector(state => state.user.value);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async event => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const loginInfo = {
      userId: data.get('id'),
      password: data.get('password'),
    };
    await axios
      .post('https://i8b204.p.ssafy.io/be-api/user/login', loginInfo)
      .then(res => {
        const accesToken = res.headers.authorization;

        // 여기서 유저정보 조회해서 pk, nickname, role 가져와서 dispatch 저장
        axios
          .get(
            `https://i8b204.p.ssafy.io/be-api/user?userId=${loginInfo.userId}`,
            {
              headers: {
                Authorization: res.headers.authorization,
              },
            },
          )
          .then(res => {
            dispatch(
              login({
                token: accesToken,
                loginUserPk: res.data.id,
                loginUserRole: res.data.role,
                loginUserNickname: res.data.nickName,
                loginId: res.data.userId,
              }),
            );
          });
        handleOpen();
      })
      .catch(err => {
        alert('아이디 및 비밀번호를 다시 확인해주세요!!');
      });
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    navigate('/');
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <BackToTop />
        <Box
          sx={{
            marginTop: 16,
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
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="div"
            sx={{
              textAlign: 'center',
              alignItems: 'center',
              padding: '50px',
              marginTop: '16px',
            }}
          >
            로그인 되었습니다!
          </Typography>
          <ColorButton
            variant="contained"
            fullWidth
            sx={{ marginTop: '16px', height: '50px' }}
            onClick={() => {
              navigate('/');
            }}
          >
            홈으로 가기
          </ColorButton>
        </Box>
      </Modal>
    </ThemeProvider>
  );
}