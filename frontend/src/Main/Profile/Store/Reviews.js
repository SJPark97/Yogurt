import { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import './Reviews.css';

function Reviews() {
  const { sellerId } = useParams();
  const loginUser = useSelector(state => state.user.value);
  const [reviews, setReviews] = useState([]);

  const getReviews = useCallback(async () => {
    await axios
      .get(`https://i8b204.p.ssafy.io/be-api/review/${sellerId}`, {
        headers: { Authorization: loginUser.token },
      })
      .then(res => {
        setReviews(res.data.reviews);
      })
  }, [loginUser, sellerId]);

  useEffect(() => {
    getReviews();
  }, [getReviews]);

  return (
    <div>
      <div className="totalReview">리뷰 {reviews.length}개</div>
      {reviews.map(review => (
        <div key={review.post.id}>
          <Box
            sx={{
              marginBottom: '8px',
              margin: '16px',
              display: 'flex',
              height: '100%',
              maxWidth: '100%',
              alignItems: 'start',
              justifyContent: 'start',
              textAlign: 'start',
            }}
          >
            <img
              src={review.post.postImages[0].url}
              alt="#"
              className="reviewImg"
            />
            <div>
              <div className="reviewItemBrand">{review.post.brCateName}</div>
              <div className="reviewItem">{review.post.title}</div>
              <div className="review_star">
                <div className="review_star-ratings">
                  <div
                    className="review_star-ratings-fill"
                    style={{ width: review.rate * 15 }}
                  >
                    <span>★</span>
                    <span>★</span>
                    <span>★</span>
                    <span>★</span>
                    <span>★</span>
                  </div>
                  <div className="review_star-ratings-base">
                    <span>★</span>
                    <span>★</span>
                    <span>★</span>
                    <span>★</span>
                    <span>★</span>
                  </div>
                </div>
              </div>
            </div>
          </Box>
          <div className="reviewTitle">{review.title}</div>
          <div className="reviewContent">{review.content}</div>
          <Divider variant="middle" />
        </div>
      ))}
    </div>
  );
}

export default Reviews;
