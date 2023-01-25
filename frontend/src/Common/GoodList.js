import React from 'react';
import dummy from '../db/list.json';
import './GoodList.css';

function GoodList() {
  const wordList = dummy.words;

  return (
    <div>
      {wordList.map(word => (
        <div className="GoodListdiv" key={word.id}>
          <img src={word.image} alt="" />
          <div className="GoodListdivdiv">
            <div className="Good-name">{word.kor}</div>
            <div className="Good-price">
              <span>{word.price.toLocaleString()}원</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default GoodList;
