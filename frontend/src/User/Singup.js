import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

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
import MenuItem from '@mui/material/MenuItem';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';

import Stack from '@mui/material/Stack';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import StoreIcon from '@mui/icons-material/Store';
import { deepOrange } from '@mui/material/colors';

const banks = [
  {
    bankId: 0,
    bankName: '국민은행',
  },
  {
    bankId: 1,
    bankName: '우리은행',
  },
  {
    bankId: 2,
    bankName: '하나은행',
  },
  {
    bankId: 3,
    bankName: '카카오뱅크',
  },
  {
    bankId: 4,
    bankName: '신한은행',
  },
  {
    bankId: 5,
    bankName: '농협',
  },
];

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(deepOrange.A400),
  backgroundColor: '#cccccc',
}));
// mui의 css 우선순위가 높기때문에 important를 설정 - 실무하다 보면 종종 발생 우선순위 문제
const FormHelperTexts = styled(FormHelperText)`
  width: 100%;
  padding-left: 16px;
  font-weight: 700 !important;
  color: #d32f2f !important;
`;

const Boxs = styled(Box)`
  padding-bottom: 40px !important;
`;

function SignUp() {
  const theme = createTheme();
  const [role, setRole] = useState('');
  const [form, setForm] = useState({
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
    setRole(data);
    console.log(role);
  };

  const handleChange = e => {
    const handling = e.target.name;
    const { value } = e.target;
    // console.log('handlechange', handling, value);
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
      if (value.length > 6) {
        setError({
          ...error,
          [handling]: '6글자 이하로 입력해주세요.',
        });
      } else {
        setError({ ...error, [handling]: '' });
      }
    } else if (handling === 'password2') {
      if (form.password1 !== value) {
        setError({ ...error, password2: '비밀번호가 일치하지 않습니다.' });
      } else {
        setError({ ...error, password2: '' });
      }
    }
  };

  const handleFocusName = () => {
    // nameConfirm
    setForm({ ...form, nameConfirm: '' });
  };
  // name
  const handleBlurName = () => {
    console.log(form.name);
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
    console.log(onlyOne.id);
    // 성공시
    setOnlyOne({ ...onlyOne, id: !onlyOne.id });
    setError({ ...error, id: '' });
    setForm({ ...form, idConfirm: form.id });
  };

  const handleFocusId = () => {
    // idConfirm
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
    console.log(onlyOne.nickname);
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
    console.log('이메일');
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
                onClick={() => handleClick('buyer')}
                // {role === 'buyer' && }
              >
                옷을 살래요
              </ColorButton>
              <ColorButton
                fullWidth
                variant="contained"
                startIcon={<StoreIcon />}
                onClick={() => handleClick('seller')}
                className="btn-content"
              >
                옷을 팔래요
              </ColorButton>
            </Stack>
            <Typography component="h4" variant="h5">
              개인정보를 입력해주세요.
            </Typography>

            <Boxs
              component="form"
              noValidate
              // onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <FormControl component="fieldset" variant="standard">
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
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
                    <TextField
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
                          <Button
                            variant="contained"
                            size="small"
                            disabled={
                              onlyOne.id ||
                              form.id === '' ||
                              form.id.length > 12 ||
                              false
                            }
                            // 컬러 바꾸기
                            sx={{ fontSize: '10px' }}
                            onClick={handleClickId}
                          >
                            중복확인
                          </Button>
                        ),
                      }}
                    />
                    <FormHelperTexts>{error.id}</FormHelperTexts>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="nickname"
                      name="nickname"
                      label="닉네임 (6글자 이하)"
                      error={
                        error.nickname !== '' ||
                        form.nickname.length > 6 ||
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
                          <Button
                            variant="contained"
                            size="small"
                            disabled={
                              onlyOne.nickname ||
                              form.nickname === '' ||
                              form.nickname.length > 6 ||
                              false
                            }
                            // 컬러 바꾸기
                            sx={{ fontSize: '10px' }}
                            onClick={handleClickNickname}
                          >
                            중복확인
                          </Button>
                        ),
                      }}
                    />
                    <FormHelperTexts>{error.nickname}</FormHelperTexts>
                  </Grid>

                  {/* <FormHelperTexts>{emailError}</FormHelperTexts> */}
                  <Grid item xs={12}>
                    <TextField
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
                    <TextField
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
                    <TextField
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
                  {role === 'seller' && (
                    <Grid item xs={12}>
                      <TextField
                        required
                        select
                        fullWidth
                        type="bank"
                        id="bank"
                        name="bank"
                        label="은행을 선택해주세요."
                      >
                        {banks.map(bank => (
                          <MenuItem key={bank.bankId}>{bank.bankName}</MenuItem>
                        ))}
                      </TextField>
                      <FormHelperTexts>{error.email}</FormHelperTexts>
                    </Grid>
                  )}
                  {role === 'seller' && (
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        type="number"
                        id="account"
                        name="account"
                        label="계좌번호"
                      />
                      <FormHelperTexts>{error.email}</FormHelperTexts>
                    </Grid>
                  )}
                </Grid>
                <Button
                  // type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  size="large"
                  disabled={allowed}
                  onClick={() => {
                    console.log('데이터', form);
                    console.log('에러', error);
                    console.log('회원가입 axios로 Confirm데이터 전달');
                  }}
                >
                  회원가입
                </Button>
              </FormControl>
            </Boxs>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default SignUp;
