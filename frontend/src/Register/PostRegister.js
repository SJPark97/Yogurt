import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import BackToTop from '../AppBar/BackToTop';
import './PostRegister.css';

function PostRegister() {
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState(0);
  const [sale, setSale] = useState(true);
  const [saleprice, setSalePrice] = useState(0);
  const [postState, setPostState] = useState(0);
  const [catecloth, setCateCloth] = useState('');
  const [catebrand, setBrand] = useState('');
  const [content, setContent] = useState('');

  const handleAddImages = event => {
    const imageLists = event.target.files;
    let imageUrlLists = [...images];

    for (let i = 0; i < imageLists.length; i += 1) {
      const currentImageUrl = URL.createObjectURL(imageLists[i]);
      imageUrlLists.push(currentImageUrl);
    }

    if (imageUrlLists.length > 10) {
      imageUrlLists = imageUrlLists.slice(0, 10);
    }

    setImages(imageUrlLists);
  };

  const handleDeleteImage = id => {
    setImages(images.filter((_, index) => index !== id));
  };

  const submitHandler = event => {
    event.preventDefault();
    console.log(event);
    navigate(`/post/2`);
    // navigate(`/post/${postId}`);

    const body = {
      title,
      price,
      sale,
      saleprice,
      postState,
      catecloth,
      catebrand,
      content,
    };

    console.log(body);

    return false;
  };

  // const handleDeleteIamge = event => {
  // const imageLists = event.target.files;
  // const imageUrls = [...images];

  // for (let i = 0; i < imageLists.lenth; i++) {
  //   const currentImageUrls = URL.createObjectURL(imageUrls[i])
  //   imageUrls.push(currentImageUrls)
  // }

  // if(imageUrls.length > )

  const States = [
    {
      type: 1,
      title: '판매 중',
    },
    {
      type: 2,
      title: '라이브 예정',
    },
    {
      type: 3,
      title: '판매 완료',
    },
  ];

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

  return (
    <div className="postregister">
      <BackToTop />
      <form onSubmit={submitHandler}>
        <div className="post_reg_file">
          <p>사진 등록(10장까지 가능)</p>
          <div className="post_reg_prev">
            {images.map((image, id) => (
              <div key={image.id} className="post_reg_prev_img">
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
            {images.length < 10 && <label htmlFor="post_reg_file">+</label>}
          </div>
          <input
            type="file"
            id="post_reg_file"
            multiple
            accept="image/*"
            onChange={handleAddImages}
          />
        </div>
        <hr />
        <div className="post_reg_title">
          <p>제품제목</p>
          <input
            type="text"
            id="post_reg_title"
            name="title"
            placeholder="상품명을 입력해주세요"
            onClick={event => setTitle(event.target.value)}
          />
        </div>
        <hr />
        <div className="post_reg_price">
          <p>제품가격</p>
          <input
            type="number"
            id="post_reg_price"
            name="price"
            placeholder="제품가격을 입력해주세요"
            onClick={event => setPrice(event.target.value)}
          />
          <div className="post_reg_sale_state">
            <p>할인상태</p>
            {saleStates.map(state => (
              <button
                key={state.type}
                type="button"
                onClick={() => setSale(state.type)}
                className={`${
                  sale === state.type
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
                onClick={event => setSalePrice(event.target.value)}
              />
            </div>
          )}
        </div>
        <hr />
        <div className="post_reg_state">
          <p>제품상태</p>
          <div className="post_reg_state_div">
            {States.map(state => (
              <button
                key={state.type}
                type="button"
                onClick={() => setPostState(state.type)}
                className={`${
                  postState === state.type
                    ? 'post_reg_state_btn'
                    : 'post_reg_state_state_btn'
                }`}
              >
                {state.title}
              </button>
            ))}
          </div>
        </div>
        <hr />
        <div className="post_reg_category">
          <p>카테고리</p>
          <div className="post_reg_category_div">
            {/* 카테고리 db만들어지면 가져오기 */}
            <div className="post_reg_category_cloth">
              옷
              <input
                type="text"
                onClick={event => setCateCloth(event.target.value)}
              />
            </div>
            <div className="post_reg_category_brand">
              브랜드
              <input
                type="text"
                onClick={event => setBrand(event.target.value)}
              />
            </div>
          </div>
        </div>
        <hr />
        <div className="post_reg_detail">
          <p>제품 상세정보</p>
          <textarea
            id="post_reg_detail"
            name="detail"
            placeholder="상세내용에 대해 기입해주세요&#13;&#10;ex) 옷의 상태, 어울리는 옷차림, 특별함을 어필하면 더 좋아요"
            onClick={event => setContent(event.target.value)}
          />
        </div>
        <hr />
        <div className="post_reg_size">
          <p>사이즈</p>
          <textarea
            id="post_reg_size"
            name="size"
            placeholder="사이즈에 대해 설명해주세요&#13;&#10;ex)가슴둘레:40cm 총장:65cm"
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
