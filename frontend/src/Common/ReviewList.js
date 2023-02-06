import React from 'react';
import dummy from '../db/list.json';
import './ReviewList.css';

function ReviewList() {
  const wordList = dummy.words;

  return (
    <div>
      {wordList.map(word => (
        <div className="bgdiv" key={word.id}>
          <div className="ReviewListdiv">
            <img src={word.image} alt="" />
            <div className="ReviewListdivdiv">
              <div className="review-name">{word.kor}</div>
              <div className="review-price">
                <span>{word.price.toLocaleString()}원</span>
              </div>
            </div>
          </div>
          <div className="review-online">{word.oneline}</div>
        </div>
      ))}
    </div>
  );
}

export default ReviewList;
