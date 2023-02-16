import { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import ProductCard from './ProductCard';
import './ProductCard.css';
import './ProductInfo.css';

function ProductInfo() {
  const { sellerId } = useParams();
  const loginUser = useSelector(state => state.user.value);
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const getPosts = useCallback(async () => {
    await axios
      .get(`https://i8b204.p.ssafy.io/be-api/post/user/${sellerId}`, {
        headers: { Authorization: loginUser.token },
      })
      .then(res => {
        setPosts(res.data[0].posts);
      })
      .catch(() => {
        alert('문제가 발생했습니다. \n 잠시후에 다시 시도해주세요.');
        navigate('/');
      });
  }, [loginUser, sellerId, navigate]);

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return (
    <div>
      <div className="totalPost">상품 {posts.length}개</div>
      <div className="productCardList">
        {posts.map(post => {
          return <ProductCard post={post} key={post.id} navigate={navigate} />;
        })}
      </div>
    </div>
  );
}

export default ProductInfo;
