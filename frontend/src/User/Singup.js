import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import {
  Button,
  CssBaseline,
  TextField,
  FormControl,
  FormHelperText,
  Grid,
  Box,
  Typography,
  Container,
} from '@mui/material/';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import StoreIcon from '@mui/icons-material/Store';

const ColorButton = styled(Button)(() => ({
  backgroundColor: 'lightgrey',
  '&:hover': {
    backgroundColor: '#deb887',
  },
}));

const SignupButton = styled(Button)(() => ({
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

const FormHelperTexts = styled(FormHelperText)`
  width: 100%;
  padding-left: 16px;
  font-weight: 700 !important;
  color: #d32f2f !important;
`;

const Boxs = styled(Box)`
  padding-bottom: 40px !important;
`;

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

function SignUp() {
  const navigate = useNavigate();
  const theme = createTheme();
  const [form, setForm] = useState({
    role: '',
    name: '',
    nameConfirm: '',
    id: '',
    idConfirm: '',
    nickname: '',
    nicknameConfirm: '',
    password1: '',
    password2: '',
    passwordConfirm: '',
    email: '',
    emailConfirm: '',
  });

  const [error, setError] = useState({
    role: '구매자, 판매자를 선택해주세요!',
    name: '',
    id: '',
    nickname: '',
    password1: '',
    password2: '',
    email: '',
  });

  const [onlyOne, setOnlyOne] = useState({
    id: false,
    nickname: false,
  });

  // role
  const handleClick = data => {
    setForm({ ...form, role: data });
    setError({ ...error, role: '' });
  };

  const handleChange = e => {
    const handling = e.target.name;
    const { value } = e.target;
    if (handling === 'id') {
      setOnlyOne({ ...onlyOne, id: false });
    } else if (handling === 'nickname') {
      setOnlyOne({ ...onlyOne, nickname: false });
    }
    setForm({ ...form, [handling]: e.target.value });
    // name id error: 12글자 이상
    if (handling === 'name' || handling === 'id') {
      if (value.length > 12) {
        setError({
          ...error,
          [handling]: '12글자 이하로 입력해주세요.',
        });
      } else {
        setError({ ...error, [handling]: '' });
      }
    } else if (handling === 'nickname') {
      if (value.length > 8) {
        setError({
          ...error,
          [handling]: '8글자 이하로 입력해주세요.',
        });
      } else {
        setError({ ...error, [handling]: '' });
      }
    } else if (handling === 'password1') {
      setForm({ ...form, [handling]: e.target.value });
    } else if (handling === 'password2') {
      if (form.password1 !== value) {
        setError({ ...error, password2: '비밀번호가 일치하지 않습니다.' });
      } else {
        setError({ ...error, password2: '' });
      }
    }
  };

  const handleFocusName = () => {
    setForm({ ...form, nameConfirm: '' });
  };
  // name
  const handleBlurName = () => {
    if (form.name === '') {
      setError({ ...error, name: '필수항목입니다.' });
    } else if (error.name === '') {
      setForm({ ...form, nameConfirm: form.name });
    }
  };
  // id
  const handleBlurId = () => {
    if (form.id === '') {
      setError({ ...error, id: '필수항목입니다.' });
    } else if (!onlyOne.id) {
      setError({ ...error, id: ' 중복확인이 필요합니다.' });
    }
  };

  const handleClickId = () => {
    // 성공시
    setOnlyOne({ ...onlyOne, id: !onlyOne.id });
    setError({ ...error, id: '' });
    setForm({ ...form, idConfirm: form.id });
  };

  const handleFocusId = () => {
    setForm({ ...form, idConfirm: '' });
  };

  // nickname
  const handleBlurNickname = () => {
    if (form.nickname === '') {
      setError({ ...error, nickname: '필수항목입니다.' });
    } else if (!onlyOne.nickname) {
      setError({
        ...error,
        nickname: ' 중복확인이 필요합니다.',
      });
    }
  };
  const handleFocusNickname = () => {
    setForm({ ...form, nicknameConfirm: '' });
  };
  const handleClickNickname = () => {
    // 성공시
    setOnlyOne({ ...onlyOne, nickname: !onlyOne.nickname });
    setError({ ...error, nickname: '' });
    setForm({ ...form, nicknameConfirm: form.nickname });
  };

  // password1
  const handleBlurPassword1 = () => {
    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    if (form.password1 === '') {
      setError({ ...error, password1: '필수항목입니다.' });
    } else if (!passwordRegex.test(form.password1)) {
      setError({
        ...error,
        password1: '숫자+영문자+특수문자 8자리 이상 입력해주세요.',
      });
    } else if (passwordRegex.test(form.password1)) {
      setError({
        ...error,
        password1: '',
      });
    }
  };
  // password2
  const handleBlurPassword2 = () => {
    if (form.password1 === form.password2) {
      setForm({ ...form, passwordConfirm: form.password1 });
    }
  };

  // email
  const handleBlurEmail = () => {
    const emailRegex =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    if (form.email === '') {
      setError({ ...error, email: '필수항목입니다.' });
    } else if (!emailRegex.test(form.email)) {
      setError({ ...error, email: '이메일 형식이 옳바르지 않습니다.' });
    } else {
      setForm({ ...form, emailConfirm: form.email });
      setError({ ...error, email: '' });
    }
  };
  const handleFocusEmail = () => {
    setForm({ ...form, emailConfirm: '' });
  };

  let allowed = true;
  if (
    error.role === '' &&
    error.name === '' &&
    error.id === '' &&
    error.nickname === '' &&
    error.password1 === '' &&
    error.password2 === '' &&
    form.nameConfirm !== '' &&
    form.idConfirm !== '' &&
    form.nicknameConfirm !== '' &&
    form.passwordConfirm !== '' &&
    form.emailConfirm !== ''
  ) {
    allowed = !allowed;
  }

  const handleSubmit = async () => {
    const signupData = JSON.stringify({
      userId: form.idConfirm,
      password: form.passwordConfirm,
      name: form.nameConfirm,
      nickName: form.nicknameConfirm,
      email: form.emailConfirm,
      role: form.role,
      phoneNumber: '01011112222',
      userStatus: 'ACTIVE',
    });

    await axios
      .post('https://i8b204.p.ssafy.io/be-api/user/join', signupData, {
        headers: { 'Content-Type': 'application/json' },
      })
      .then(res => {
        handleOpen();
      })
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    navigate('/login');
  };

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component="h4" variant="h5">
              구매자 판매자 선택해주세요.
            </Typography>
            <Stack
              spacing={2}
              direction="row"
              sx={{
                margin: '16px',
              }}
            >
              <ColorButton
                fullWidth
                variant="contained"
                startIcon={<ShoppingCartIcon />}
                onClick={() => handleClick('ROLE_BUYER')}
                sx={{
                  background:
                    form.role === 'ROLE_BUYER' ? '#deb887' : 'lightgrey',
                }}
              >
                옷을 살래요
              </ColorButton>
              <ColorButton
                fullWidth
                variant="contained"
                startIcon={<StoreIcon />}
                onClick={() => handleClick('ROLE_SELLER')}
                className="btn-content"
                sx={{
                  background:
                    form.role === 'ROLE_SELLER' ? '#deb887' : 'lightgrey',
                }}
              >
                옷을 팔래요
              </ColorButton>
            </Stack>
            <Typography component="h4" variant="h5">
              개인정보를 입력해주세요.
            </Typography>

            <Boxs component="form" noValidate sx={{ mt: 3 }}>
              <FormControl component="fieldset" variant="standard">
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <CssTextField
                      required
                      fullWidth
                      id="name"
                      name="name"
                      label="이름"
                      error={
                        error.name !== '' || form.name.length > 12 || false
                      }
                      onChange={handleChange}
                      onFocus={handleFocusName}
                      onBlur={handleBlurName}
                      helperText={
                        form.nameConfirm !== '' ? '사용이 가능합니다' : ''
                      }
                    />
                    <FormHelperTexts>{error.name}</FormHelperTexts>
                  </Grid>
                  <Grid item xs={12}>
                    <CssTextField
                      required
                      fullWidth
                      id="id"
                      name="id"
                      label="아이디"
                      error={error.id !== '' || form.id.length > 12 || false}
                      onChange={handleChange}
                      onBlur={handleBlurId}
                      onFocus={handleFocusId}
                      helperText={(() => {
                        if (form.idConfirm !== '' && onlyOne.id) {
                          return '사용이 가능합니다.';
                        }
                        return '';
                      })()}
                      InputProps={{
                        endAdornment: (
                          <SignupButton
                            variant="contained"
                            size="small"
                            disabled={
                              onlyOne.id ||
                              form.id === '' ||
                              form.id.length > 12 ||
                              false
                            }
                            sx={{ fontSize: '10px' }}
                            onClick={handleClickId}
                          >
                            중복확인
                          </SignupButton>
                        ),
                      }}
                    />
                    <FormHelperTexts>{error.id}</FormHelperTexts>
                  </Grid>
                  <Grid item xs={12}>
                    <CssTextField
                      required
                      fullWidth
                      id="nickname"
                      name="nickname"
                      label="닉네임 or 스토어명(8글자 이하)"
                      error={
                        error.nickname !== '' ||
                        form.nickname.length > 8 ||
                        false
                      }
                      onChange={handleChange}
                      onBlur={handleBlurNickname}
                      onFocus={handleFocusNickname}
                      helperText={(() => {
                        if (form.nicknameConfirm !== '' && onlyOne.nickname) {
                          return '사용이 가능합니다.';
                        }
                        return '';
                      })()}
                      InputProps={{
                        endAdornment: (
                          <SignupButton
                            variant="contained"
                            size="small"
                            disabled={
                              onlyOne.nickname ||
                              form.nickname === '' ||
                              form.nickname.length > 8 ||
                              false
                            }
                            sx={{ fontSize: '10px' }}
                            onClick={handleClickNickname}
                          >
                            중복확인
                          </SignupButton>
                        ),
                      }}
                    />
                    <FormHelperTexts>{error.nickname}</FormHelperTexts>
                  </Grid>

                  <Grid item xs={12}>
                    <CssTextField
                      required
                      fullWidth
                      type="password"
                      id="password1"
                      name="password1"
                      label="비밀번호 (숫자+영문자+특수문자 8자리 이상)"
                      onChange={handleChange}
                      onBlur={handleBlurPassword1}
                      error={error.password1 !== '' || false}
                    />
                    <FormHelperTexts>{error.password1}</FormHelperTexts>
                  </Grid>
                  <Grid item xs={12}>
                    <CssTextField
                      required
                      fullWidth
                      type="password"
                      id="password2"
                      name="password2"
                      label="비밀번호 재입력"
                      onChange={handleChange}
                      onBlur={handleBlurPassword2}
                      error={error.password2 !== '' || false}
                    />
                    <FormHelperTexts>{error.password2}</FormHelperTexts>
                  </Grid>
                  <Grid item xs={12}>
                    <CssTextField
                      required
                      fullWidth
                      type="email"
                      id="email"
                      name="email"
                      label="이메일 주소"
                      onChange={handleChange}
                      onBlur={handleBlurEmail}
                      onFocus={handleFocusEmail}
                      error={error.email !== '' || false}
                    />
                    <FormHelperTexts>{error.email}</FormHelperTexts>
                  </Grid>
                </Grid>
                <SignupButton
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  size="large"
                  disabled={allowed}
                  onClick={handleSubmit}
                >
                  회원가입
                </SignupButton>
              </FormControl>
            </Boxs>
          </Box>
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
                padding: '32px',
                marginTop: '16px',
              }}
            >
              환영합니다! 회원가입이 완료되었습니다!
            </Typography>
            <ColorButton
              variant="contained"
              fullWidth
              sx={{ marginTop: '16px', height: '50px', fontSize: '16px' }}
              onClick={() => {
                navigate('/login');
              }}
            >
              로그인하러 가기
            </ColorButton>
          </Box>
        </Modal>
      </ThemeProvider>
    </div>
  );
}

export default SignUp;
