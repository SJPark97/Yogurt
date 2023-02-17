import { useNavigate } from 'react-router-dom';
import './Category.css';

function Category({ sub }) {
  const navigate = useNavigate();

  let subName;

  if (sub.detail === 11) {
    subName = '티셔츠';
  } else if (sub.detail === 12) {
    subName = '맨투맨';
  } else if (sub.detail === 13) {
    subName = '니트';
  } else if (sub.detail === 14) {
    subName = '셔츠';
  } else if (sub.detail === 15) {
    subName = '기타 상의';
  } else if (sub.detail === 21) {
    subName = '후드 집업';
  } else if (sub.detail === 22) {
    subName = '자켓';
  } else if (sub.detail === 23) {
    subName = '카디건';
  } else if (sub.detail === 24) {
    subName = '기타 아우터';
  } else if (sub.detail === 31) {
    subName = '데님';
  } else if (sub.detail === 32) {
    subName = '치마';
  } else if (sub.detail === 33) {
    subName = '트레이닝';
  } else if (sub.detail === 34) {
    subName = '숏 팬츠';
  } else if (sub.detail === 35) {
    subName = '기타 바지';
  } else if (sub.detail === 41) {
    subName = '신발';
  } else if (sub.detail === 42) {
    subName = '가방';
  } else if (sub.detail === 43) {
    subName = '목걸이';
  } else if (sub.detail === 44) {
    subName = '기타';
  }

  return (
    <div
      role="presentation"
      className="category"
      onClick={() => {
        navigate(`/category/${sub.detail}`, {
          state: { cateName: subName, cateImg: sub.detail_image },
        });
      }}
    >
      <img src={sub.detail_image} alt="#" className="categoryImg" />
      <div className="subName">{subName}</div>
    </div>
  );
}

export default Category;
