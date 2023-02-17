// 유저정보를 받아오는게 좋으려나 이전에서 props 받는게 좋으려나
// props를 받는거면 이게 appbar에서 오는거라 가능하려나?...
// 앞으로는 app바를 페이지 마다 넣는게 나으려나?...
import { useEffect, useState, useCallback, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Logo from '../../Images/Yogurt_Logo.png';
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
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import './ProfileModifiy.css';
import BackToTop from '../../AppBar/BackToTop';
// import Logo from '../../Images/Yogurt_Logo.png';

const FormHelperTexts = styled(FormHelperText)`
  width: 100%;
  padding-left: 16px;
  font-weight: 700 !important;
  color: #d32f2f !important;
`;

const Boxs = styled(Box)`
  padding-bottom: 40px !important;
`;

const ColorButton = styled(Button)(() => ({
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

export default function ProfileModify() {
  const theme = createTheme();
  const navigate = useNavigate();
  const { id } = useParams();
  const loginUser = useSelector(state => state.user.value);

  const [profile, setProfile] = useState([]);

  const getProfile = useCallback(async () => {
    await axios
      .get(`https://i8b204.p.ssafy.io/be-api/user/seller/${id}`, {
        headers: { Authorization: loginUser.token },
      })
      .then(res => {
        setProfile(res.data);
      })
  }, [loginUser, id]);

  useEffect(() => {
    getProfile();
  }, [getProfile]);
  // console.log('유저정보', profile);
  // role state에서 불러오기
  const [form, setForm] = useState({
    nickname: loginUser.loginUserNickname.trim(),
    nicknameConfirm: '',
    introduce: '',
    introduceConfirm: '',
  });

  const [error, setError] = useState({
    nickname: '',
    introduce: '',
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
      if (value.length > 8) {
        setError({
          ...error,
          [handling]: '8글자 이하로 입력해주세요.',
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
    // console.log(onlyOne.nickname);
    // 성공시
    setOnlyOne({ ...onlyOne, nickname: !onlyOne.nickname });
    setError({ ...error, nickname: '' });
    setForm({ ...form, nicknameConfirm: form.nickname });
  };

  // introduce
  const handleBlurIntroduce = () => {
    if (form.introduce === '') {
      setError({ ...error, introduce: '필수항목입니다.' });
    } else {
      setForm({ ...form, introduceConfirm: form.introduce });
      setError({ ...error, introduce: '' });
    }
  };
  const handleFocusIntroduce = () => {
    setForm({ ...form, introduceConfirm: '' });
  };

  let allowed = true;
  if (
    error.nickname === '' &&
    form.nicknameConfirm !== '' &&
    form.introduceConfirm !== ''
  ) {
    allowed = !allowed;
  }

  let buyerAllowed = true;
  if (error.nickname === '' && form.nicknameConfirm !== '') {
    buyerAllowed = !buyerAllowed;
  }
  // 기본이미지
  const basicData = new FormData();
  basicData.append('images', Logo);

  // 사진 등록
  const [Image, setImage] = useState(
    profile.profileImage ? profile.profileImage : Logo,
  );
  const [imageConfirm, setImageConfirm] = useState(basicData);
  const fileInput = useRef(null);

  const onChange = e => {
    if (e.target.files[0]) {
      const formData = new FormData();
      formData.append('images', e.target.files[0]);
      setImage(URL.createObjectURL(e.target.files[0]));
      setImageConfirm(formData);
    } else {
      // 업로드 취소할 시
      setImage(profile.profileImage ? profile.profileImage : Logo);
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

  const handleSubmit = e => {
    e.preventDefault();
    if (loginUser.loginUserRole === 'ROLE_SELLER') {
      axios
        .post('https://i8b204.p.ssafy.io/be-api/upload', imageConfirm, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Access-Control-Allow-Origin': '*',
          },
        })
        .then(res => {
          // console.log('gg', res.data);
          const data = {
            profileImage: res.data[0],
            nickName: form.nicknameConfirm,
            description: form.introduceConfirm,
          };
          // console.log('data', data);
          axios
            .put(`https://i8b204.p.ssafy.io/be-api/user/seller/${id}`, data, {
              headers: { Authorization: loginUser.token },
            })
            .then(res => {
              // console.log('수정 성공!', res.data);
              navigate(`/profile/seller/${id}?tab=0`);
            })
        });
    } else {
      axios
        .post('https://i8b204.p.ssafy.io/be-api/upload', imageConfirm, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Access-Control-Allow-Origin': '*',
          },
        })
        .then(res => {
          // console.log(res.data);
          const data = {
            profileImage: res.data[0],
            nickName: form.nicknameConfirm,
          };
          axios
            .put(`https://i8b204.p.ssafy.io/be-api/user/buyer/${id}`, data, {
              headers: { Authorization: loginUser.token },
            })
            .then(res => {
              // console.log('수정 성공!', res.data);
              navigate(`/profile/buyer/${id}?tab=0`);
            })
        });
    }
  };

  return (
    <div>
      <BackToTop />
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <Box
            sx={{
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
                <div className="modifyText">프로필 이미지 수정</div>
                <Stack
                  spacing={1}
                  justifyContent="center"
                  alignItems="center"
                  sx={{
                    marginBottom: '1rem',
                    border: '1px solid lightgray',
                    borderRadius: '8px',
                  }}
                >
                  <div style={{ fontSize: '12px' }}>
                    아래 사진을 클릭해주세요
                  </div>
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
                    accept="image/*"
                    name="profile_img"
                    onChange={onChange}
                    ref={fileInput}
                  />
                </Stack>
                <div className="modifyText">닉네임 수정</div>
                <Grid container spacing={2}>
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
                      value={form.nickname}
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
                          <ColorButton
                            variant="contained"
                            size="small"
                            disabled={
                              onlyOne.nickname ||
                              form.nickname === '' ||
                              form.nickname.length > 8 ||
                              false
                            }
                            // 컬러 바꾸기
                            sx={{ fontSize: '10px' }}
                            onClick={handleClickNickname}
                          >
                            중복확인
                          </ColorButton>
                        ),
                      }}
                    />
                    <FormHelperTexts>{error.nickname}</FormHelperTexts>
                  </Grid>
                  {loginUser.loginUserRole === 'ROLE_SELLER' ? (
                    <Grid item xs={12}>
                      <div className="modifyText">스토어 한줄 소개 수정</div>
                      <CssTextField
                        multiline
                        rows={3}
                        required
                        fullWidth
                        type="introduce"
                        id="introduce"
                        name="introduce"
                        label="스토어 한줄 소개"
                        onChange={handleChange}
                        onBlur={handleBlurIntroduce}
                        onFocus={handleFocusIntroduce}
                        error={error.introduce !== '' || false}
                      />
                      <FormHelperTexts>{error.introduce}</FormHelperTexts>
                    </Grid>
                  ) : (
                    ''
                  )}
                </Grid>
                <ColorButton
                  // type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  size="large"
                  disabled={
                    loginUser.loginUserRole === 'ROLE_SELLER'
                      ? allowed
                      : buyerAllowed
                  }
                  onClick={handleSubmit}
                >
                  회원정보 수정
                </ColorButton>
              </FormControl>
            </Boxs>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
}
