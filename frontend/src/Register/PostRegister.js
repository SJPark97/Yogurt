import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import axios from 'axios';
import FormData from 'form-data';
import BackToTop from '../AppBar/BackToTop';
import Divider from '@mui/material/Divider';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import './PostRegister.css';

function PostRegister() {
  const navigate = useNavigate();
  const loginUser = useSelector(state => state.user.value);
  const [images, setImages] = useState([]);
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState(0);
  const [sale, setSale] = useState(true);
  const [saleprice, setSalePrice] = useState(0);
  const [typecategoryId, setTypeCategoryId] = useState(0);
  const [typeDetailId, setTypeDetailId] = useState(0);
  const [size, setSize] = useState('');
  const [brandcategoryId, setBrandCategoryId] = useState(0);
  const [content, setContent] = useState('');
  const [imageupload, setImageUpload] = useState([]);
  const [brandcate, setBrandCate] = useState([]);
  const [typecate, setTypeCate] = useState([]);

  const token = loginUser.token;

  const handleAddImages = event => {
    const imageLists = event;
    let imageUrlLists = [...images];
    let imageUploadLists = [...imageupload];

    imageUploadLists.push(event[0]);

    for (let i = 0; i < imageLists.length; i += 1) {
      const currentImageUrl = URL.createObjectURL(imageLists[i]);
      imageUrlLists.push(currentImageUrl);
    }

    if (imageUrlLists.length > 10) {
      imageUrlLists = imageUrlLists.slice(0, 10);
    }

    setImages(imageUrlLists);
    setImageUpload(imageUploadLists);
  };

  const handleDeleteImage = id => {
    setImages(images.filter((_, index) => index !== id));
    setImageUpload(images.filter((_, index) => index !== id));
  };

  useEffect(() => {
    axios
      .get('https://i8b204.p.ssafy.io/be-api/cate/brand')
      .then(res => setBrandCate(res.data))
  }, []);

  useEffect(() => {
    axios
      .get('https://i8b204.p.ssafy.io/be-api/cate/type')
      .then(res => setTypeCate(res.data))
  }, []);

  const saleStates = [
    {
      type: false,
      title: '할인 안 함',
    },
    {
      type: true,
      title: '할인',
    },
  ];

  const submitHandler = event => {
    event.preventDefault();
    const formData = new FormData();

    for (let i = 0; i < imageupload.length; i += 1) {
      formData.append('images', imageupload[i]);
    }

    axios
      .post('https://i8b204.p.ssafy.io/be-api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Access-Control-Allow-Origin': '*',
        },
      })
      .then(res => {
        const data = {
          postImages: res.data,
          title,
          content,
          price,
          sale_price: saleprice,
          size,
          brandcategoryId,
          typecategoryId,
          typeDetailId,
        };
        // console.log(data)
        axios
          .post(`https://i8b204.p.ssafy.io/be-api/post`, data, {
            headers: { Authorization: token },
          })
          .then(res => {
            // console.log(res)
            navigate(`/post/${res.data}`);
          })
      })

    return false;
  };

  return (
    <div className="postregister">
      <BackToTop />
      <form onSubmit={submitHandler}>
        <div className="post_reg_file">
          <p>사진 등록(10장까지 가능)</p>
          <div className="post_reg_prev">
            {images.length < 10 && <label htmlFor="post_reg_file">+</label>}
            {images.map((image, id) => (
              <div key={id} className="post_reg_prev_img">
                <div>
                  <img src={image} alt="메인사진" />
                </div>
                <div>
                  <button type="button" onClick={() => handleDeleteImage(id)}>
                    X
                  </button>
                </div>
              </div>
            ))}
          </div>
          <input
            type="file"
            id="post_reg_file"
            multiple
            accept="image/*"
            onChange={event => handleAddImages(event.target.files)}
          />
        </div>
        <Divider sx={{ marginY: '1rem' }} />
        <div className="post_reg_title">
          <p>제품제목</p>
          <input
            type="text"
            id="post_reg_title"
            name="title"
            placeholder="상품명을 입력해주세요"
            onChange={event => setTitle(event.target.value)}
          />
        </div>
        <Divider sx={{ marginY: '1rem' }} />
        <div className="post_reg_price">
          <p>제품가격</p>
          <input
            type="number"
            id="post_reg_price"
            name="price"
            placeholder="제품가격을 입력해주세요"
            onChange={event => setPrice(event.target.value)}
          />
          <div className="post_reg_sale_state">
            <p>할인상태</p>
            {saleStates.map(state => (
              <button
                key={state.type}
                type="button"
                onClick={() => setSale(state.type)}
                className={`${sale === state.type
                    ? 'post_reg_sale_btn'
                    : 'post_reg_sale_state_btn'
                  }`}
              >
                {state.title}
              </button>
            ))}
          </div>
          {sale && (
            <div className="post_reg_sale_price">
              <p>할인가격</p>
              <input
                type="number"
                id="post_reg_sale_price"
                name="sale_price"
                placeholder="제품가격을 입력해주세요"
                onChange={event => setSalePrice(event.target.value)}
              />
            </div>
          )}
        </div>
        <Divider sx={{ marginY: '1rem' }} />
        <div className="post_reg_category">
          <p>카테고리</p>
          <div className="post_reg_category_div">
            <div className="post_reg_category_cloth">
              <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <InputLabel id="demo-select-small">category</InputLabel>
                <Select
                  labelId="demo-select-small"
                  id="demo-select-small"
                  value={typecategoryId}
                  label="category"
                  onChange={event => setTypeCategoryId(event.target.value)}
                >
                  <MenuItem value="0">선택해주세요</MenuItem>
                  {typecate.map(type => (
                    <MenuItem value={type.id} key={type.id}>
                      {type.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {typecategoryId === 1 && (
                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                  <InputLabel id="demo-select-small">category</InputLabel>
                  <Select
                    labelId="demo-select-small"
                    id="demo-select-small"
                    value={typeDetailId}
                    label="category"
                    onChange={event => setTypeDetailId(event.target.value)}
                  >
                    <MenuItem value="0">선택해주세요</MenuItem>
                    <MenuItem value="11">티셔츠</MenuItem>
                    <MenuItem value="12">맨투맨</MenuItem>
                    <MenuItem value="13">니트</MenuItem>
                    <MenuItem value="14">셔츠</MenuItem>
                    <MenuItem value="15">기타 상의</MenuItem>
                  </Select>
                </FormControl>
              )}
              {typecategoryId === 2 && (
                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                  <InputLabel id="demo-select-small">category</InputLabel>
                  <Select
                    labelId="demo-select-small"
                    id="demo-select-small"
                    value={typeDetailId}
                    label="category"
                    onChange={event => setTypeDetailId(event.target.value)}
                  >
                    <MenuItem value="0">선택해주세요</MenuItem>
                    <MenuItem value="21">후드 집업</MenuItem>
                    <MenuItem value="22">자켓</MenuItem>
                    <MenuItem value="23">카디건</MenuItem>
                    <MenuItem value="24">기타 아우터</MenuItem>
                  </Select>
                </FormControl>
              )}
              {typecategoryId === 3 && (
                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                  <InputLabel id="demo-select-small">category</InputLabel>
                  <Select
                    labelId="demo-select-small"
                    id="demo-select-small"
                    value={typeDetailId}
                    label="category"
                    onChange={event => setTypeDetailId(event.target.value)}
                  >
                    <MenuItem value="0">선택해주세요</MenuItem>
                    <MenuItem value="31">데님</MenuItem>
                    <MenuItem value="32">치마</MenuItem>
                    <MenuItem value="33">트레이닝</MenuItem>
                    <MenuItem value="34">숏 팬츠</MenuItem>
                    <MenuItem value="35">기타 바지</MenuItem>
                  </Select>
                </FormControl>
              )}
              {typecategoryId === 4 && (
                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                  <InputLabel id="demo-select-small">category</InputLabel>
                  <Select
                    labelId="demo-select-small"
                    id="demo-select-small"
                    value={typeDetailId}
                    label="category"
                    onChange={event => setTypeDetailId(event.target.value)}
                  >
                    <MenuItem value="0">선택해주세요 </MenuItem>
                    <MenuItem value="41">신발</MenuItem>
                    <MenuItem value="42">가방</MenuItem>
                    <MenuItem value="43">목걸이</MenuItem>
                    <MenuItem value="44">기타</MenuItem>
                  </Select>
                </FormControl>
              )}
            </div>
            <div className="post_reg_category_brand">
              <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <InputLabel id="demo-select-small">brand</InputLabel>
                <Select
                  labelId="demo-select-small"
                  id="demo-select-small"
                  value={brandcategoryId}
                  label="brand"
                  onChange={event => setBrandCategoryId(event.target.value)}
                >
                  <MenuItem value="0">선택해주세요 </MenuItem>
                  {brandcate.map(brand => (
                    <MenuItem value={brand.id} key={brand.id}>
                      {brand.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </div>
        </div>
        <Divider sx={{ marginY: '1rem' }} />
        <div className="post_reg_detail">
          <p>제품 상세정보</p>
          <textarea
            id="post_reg_detail"
            name="detail"
            placeholder="상세내용에 대해 기입해주세요&#13;&#10;ex) 옷의 상태, 어울리는 옷차림, 특별함을 어필하면 더 좋아요"
            onChange={event => setContent(event.target.value)}
          />
        </div>
        <Divider sx={{ marginY: '1rem' }} />
        <div className="post_reg_size">
          <p>사이즈</p>
          <textarea
            id="post_reg_size"
            name="size"
            placeholder="사이즈에 대해 설명해주세요&#13;&#10;ex)가슴둘레:40cm 총장:65cm"
            onChange={event => setSize(event.target.value)}
          />
        </div>
        <div className="submit_btn">
          <button type="submit">저장</button>
        </div>
      </form>
    </div>
  );
}

export default PostRegister;
