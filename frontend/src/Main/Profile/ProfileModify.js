// 유저정보를 받아오는게 좋으려나 이전에서 props 받는게 좋으려나
// props를 받는거면 이게 appbar에서 오는거라 가능하려나?...
// 앞으로는 app바를 페이지 마다 넣는게 나으려나?...
import { useState, useRef } from 'react';
import {
  Button,
  TextField,
  FormControl,
  FormHelperText,
  Grid,
  Box,
  Container,
} from '@mui/material/';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';

import './ProfileModifiy.css';
import BackToTop from '../../AppBar/BackToTop';

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

const FormHelperTexts = styled(FormHelperText)`
  width: 100%;
  padding-left: 16px;
  font-weight: 700 !important;
  color: #d32f2f !important;
`;

const Boxs = styled(Box)`
  padding-bottom: 40px !important;
`;

export default function ProfileModify() {
  const theme = createTheme();

  const [bankname, setBankname] = useState('');

  const handleBankChange = e => {
    console.log('dd');
    setBankname(e.target.value);
  };

  // role state에서 불러오기
  const role = 'seller';
  const [form, setForm] = useState({
    nickname: '',
    nicknameConfirm: '',
    email: '',
    emailConfirm: '',
  });

  const [error, setError] = useState({
    nickname: '',
    email: '',
  });

  const [onlyOne, setOnlyOne] = useState({
    nickname: false,
  });
  // role

  const handleChange = e => {
    const handling = e.target.name;
    const { value } = e.target;
    // console.log('handlechange', handling, value);
    if (handling === 'nickname') {
      setOnlyOne({ ...onlyOne, nickname: false });
    }
    setForm({ ...form, [handling]: e.target.value });
    if (handling === 'nickname') {
      if (value.length > 6) {
        setError({
          ...error,
          [handling]: '6글자 이하로 입력해주세요.',
        });
      } else {
        setError({ ...error, [handling]: '' });
      }
    }
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
    error.nickname === '' &&
    form.nicknameConfirm !== '' &&
    form.emailConfirm !== ''
  ) {
    allowed = !allowed;
  }

  const [Image, setImage] = useState(
    'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
  );
  const fileInput = useRef(null);

  const onChange = e => {
    console.log(e.target.files);
    if (e.target.files[0]) {
      //   setFile(e.target.files[0]);
    } else {
      // 업로드 취소할 시
      setImage(
        'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
      );
      return;
    }
    // 화면에 프로필 사진 표시
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImage(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <div>
      <BackToTop />
      <h2>프로필 수정</h2>
      <Stack spacing={1} justifyContent="center" alignItems="center">
        <Avatar
          src={Image}
          onClick={() => {
            fileInput.current.click();
          }}
          sx={{
            width: '50%',
            height: '50%',
          }}
        />
        <input
          type="file"
          style={{ display: 'none' }}
          accept="image/jpg,impge/png,image/jpeg"
          name="profile_img"
          onChange={onChange}
          ref={fileInput}
        />
      </Stack>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <Box
            sx={{
              marginTop: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Boxs
              component="form"
              noValidate
              // onSubmit={handleSubmit}
            >
              <FormControl component="fieldset" variant="standard">
                <Grid container spacing={2}>
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
                        select
                        required
                        fullWidth
                        id="bank"
                        name="bank"
                        label="은행을 선택해주세요."
                        value={bankname}
                        onChange={handleBankChange}
                      >
                        {banks.map(bank => (
                          <MenuItem key={bank.bankId} value={bank.bankName}>
                            {bank.bankName}
                          </MenuItem>
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
                    console.log('회원정보 수정 axios로 Confirm데이터 전달');
                  }}
                >
                  회원정보 수정
                </Button>
              </FormControl>
            </Boxs>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
}
