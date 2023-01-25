import React from 'react';
import dummy from '../db/list.json';
import './StoreList.css';

function StoreList() {
  const wordList = dummy.words;

  return (
    <div>
      {wordList.map(word => (
        <div>
          <div className="StoreListdiv" key={word.id}>
            <img src={word.image} alt="" />
            <div className="StoreListdivdiv">
              <div className="storeListdivdivdiv">
                <div className="store-name">{word.kor}</div>
                <div className="store-love">{word.love}</div>
              </div>
              <div className="store-price">{word.oneline}</div>
            </div>
          </div>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default StoreList;
