// import { useState, useCallback } from 'react';

// import Stack from '@mui/material/Stack';
// import Button from '@mui/material/Button';
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
// import StoreIcon from '@mui/icons-material/Store';
// import Box from '@mui/material/Box';
// import TextField from '@mui/material/TextField';

// import { styled } from '@mui/material/styles';
// import { deepOrange } from '@mui/material/colors';
// // import Divider from '@mui/material/Divider';
// import BackToTop from '../AppBar/BackToTop';

// const ColorButton = styled(Button)(({ theme }) => ({
//   color: theme.palette.getContrastText(deepOrange.A400),
//   backgroundColor: '#cccccc',
// }));

// function SignUp() {
//   const [role, setRole] = useState('');
//   const [inputText, setinputText] = useState('');
//   const handleClick = data => {
//     setRole(data);
//   };
//   console.log(role);

// const onChange = useCallback(e => {
//   setinputText(e.target.value);
//   console.log(e.target.value);
// });

//   const handleSubmit = e => {
//     e.preventDefault();
//     console.log(inputText);
//   };
//   return (
//     <div>
//       <BackToTop />
//       <div>어떤 역할을 하실래요?</div>
//       <Stack
//         spacing={2}
//         direction="row"
//         sx={{
//           margin: '16px',
//         }}
//       >
//         <ColorButton
//           fullWidth
//           variant="contained"
//           startIcon={<ShoppingCartIcon />}
//           onClick={() => handleClick('buyer')}
//           // {role === 'buyer' && }
//         >
//           옷을 살래요!
//         </ColorButton>
//         <ColorButton
//           fullWidth
//           variant="contained"
//           startIcon={<StoreIcon />}
//           onClick={() => handleClick('seller')}
//           className="btn-content"
//         >
//           옷을 팔래요
//         </ColorButton>
//       </Stack>

//       <Box
//         component="form"
//         sx={{
//           marginX: '16px',
//           maxWidth: '100%',
//         }}
//         noValidate
//         autoComplete="off"
//         onSubmit={handleSubmit}
//       >
//         <TextField
//           fullWidth
//           id="outlined-basic"
//           label="Outlined"
//           variant="outlined"
//           required
//           value={inputText}
//           onChange={onChange}
//         />
//       </Box>
//       <button type="submit">submit</button>
//     </div>
//   );
// }

// export default SignUp;

import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Button,
  CssBaseline,
  TextField,
  FormControl,
  FormControlLabel,
  Checkbox,
  FormHelperText,
  Grid,
  Box,
  Typography,
  Container,
} from '@mui/material/';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import styled from 'styled-components';

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
  const [rawId, setRawId] = useState('');
  const [rawNickname, setRawNickname] = useState('');
  const [checkedId, setCheckedId] = useState('');
  // const [checkedNickname, setCheckedNickname] = useState('');
  const [idError, setIdError] = useState('');
  const [checked, setChecked] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordState, setPasswordState] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [nameError, setNameError] = useState('');
  const [registerError, setRegisterError] = useState('');
  const navigate = useNavigate();
  // id onChange
  const onChangeId = useCallback(e => {
    setRawId(e.target.value);
    console.log(e.target.value);
    console.log(rawId);
  });
  // nickname onChange
  const onChangeNickname = useCallback(e => {
    setRawNickname(e.target.value);
    console.log(e.target.value);
  });
  // id 중복 검사 - 유효성 검사 후 진행
  useEffect(() => {
    console.log('중복검사', checkedId);
  }, [checkedId]);

  const handleAgree = event => {
    setChecked(event.target.checked);
    console.log(rawNickname);
  };

  const onhandlePost = async data => {
    const { email, name, password } = data;
    const postData = { email, name, password };

    // 회원가입 post
    await axios
      .post('/member/join', postData)
      .then(function (response) {
        console.log(response, '성공');
        navigate.push('/login');
      })
      .catch(function (err) {
        console.log(err);
        setRegisterError('회원가입에 실패하였습니다. 다시한번 확인해 주세요.');
      });
  };

  const handleSubmit = e => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    console.log(data);
    const joinData = {
      id: data.get('id'),
      name: data.get('name'),
      nickname: data.get('nickname'),
      password: data.get('password'),
      rePassword: data.get('rePassword'),
      email: data.get('email'),
    };
    const { id, name, nickname, password, rePassword, email } = joinData;
    // id 유효성 체크(중복 체크)
    console.log(id);
    // nickname 유효성 체크(중복 체크)
    console.log(nickname);

    // 이메일 유효성 체크
    const emailRegex =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    if (!emailRegex.test(email))
      setEmailError('올바른 이메일 형식이 아닙니다.');
    else setEmailError('');

    // 비밀번호 유효성 체크
    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    if (!passwordRegex.test(password))
      setPasswordState(
        '숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!',
      );
    else setPasswordState('');

    // 비밀번호 같은지 체크
    if (password !== rePassword)
      setPasswordError('비밀번호가 일치하지 않습니다.');
    else setPasswordError('');

    // 이름 유효성 검사
    const nameRegex = /^[가-힣a-zA-Z]+$/;
    if (!nameRegex.test(name) || name.length < 1)
      setNameError('올바른 이름을 입력해주세요.');
    else setNameError('');

    // 회원가입 동의 체크
    if (!checked) alert('회원가입 약관에 동의해주세요.');

    if (
      emailRegex.test(email) &&
      passwordRegex.test(password) &&
      password === rePassword &&
      nameRegex.test(name) &&
      checked
    ) {
      onhandlePost(joinData);
    }
  };

  return (
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
            개인정보를 입력해주세요.
          </Typography>
          <Boxs
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <FormControl component="fieldset" variant="standard">
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    autoFocus
                    fullWidth
                    id="name"
                    name="name"
                    label="이름"
                    error={nameError !== '' || false}
                  />
                </Grid>
                <Grid item xs={12} sx={{ display: 'flex' }}>
                  <TextField
                    required
                    fullWidth
                    id="id"
                    name="id"
                    label="아이디"
                    error={idError !== '' || rawId.length > 12 || false}
                    helperText={rawId.length > 12 ? '아이디 12글자 이하' : ''}
                    onChange={onChangeId}
                    onBlur={() => {
                      console.log('포커스 아웃', rawId);
                      // 포커스 아웃될 때 입력여부를 먼저 검사하고
                      if (rawId !== '') {
                        setCheckedId(rawId);
                      } else {
                        alert('아이디를 입력해주세요!');
                      }
                      if (checkedId) {
                        console.log('체크확인2', checkedId);
                        console.log(setIdError);
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12} sx={{ display: 'flex' }}>
                  <TextField
                    required
                    fullWidth
                    id="nickname"
                    name="nickname"
                    label="닉네임"
                    error={nameError !== '' || false}
                    onChange={onChangeNickname}
                  />
                  <Button
                    onClick={() => {
                      if (rawNickname !== '') {
                        console.log('중복체크', rawNickname);
                      } else {
                        alert('닉네임을 입력해주세요!');
                      }
                    }}
                  >
                    중복 체크
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    type="email"
                    id="email"
                    name="email"
                    label="이메일 주소"
                    error={emailError !== '' || false}
                  />
                </Grid>
                <FormHelperTexts>{emailError}</FormHelperTexts>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    type="password"
                    id="password"
                    name="password"
                    label="비밀번호 (숫자+영문자+특수문자 8자리 이상)"
                    error={passwordState !== '' || false}
                  />
                </Grid>
                <FormHelperTexts>{passwordState}</FormHelperTexts>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    type="password"
                    id="rePassword"
                    name="rePassword"
                    label="비밀번호 재입력"
                    error={passwordError !== '' || false}
                  />
                </Grid>
                <FormHelperTexts>{passwordError}</FormHelperTexts>

                <FormHelperTexts>{nameError}</FormHelperTexts>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox onChange={handleAgree} color="primary" />
                    }
                    label="회원가입 약관에 동의합니다."
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                size="large"
              >
                회원가입
              </Button>
            </FormControl>
            <FormHelperTexts>{registerError}</FormHelperTexts>
          </Boxs>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default SignUp;
