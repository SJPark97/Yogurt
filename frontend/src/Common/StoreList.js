import React from 'react';
import './StoreList.css';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

function StoreList(props) {
  const { data } = props;
  let likes = data.Store_likes;
  if (data.Store_likes >= 10000) {
    likes = `${Math.floor(data.Store_likes / 10000)}만`;
  } else if (data.Store_likes >= 1000) {
    likes = `${Math.floor(data.Store_likes / 1000)}천`;
  }
  return (
    <div>
      <div className="StoreList">
        <img className="StoreImg" src={data.Store_thumbnail} alt="#" />
        <div>
          <div className="StoreInfo">
            <div className="StoreName">{data.Store_name}</div>
            {data.Store_like ? (
              <FavoriteIcon className="StoreLikeIcon" />
            ) : (
              <FavoriteBorderIcon className="StoreLikeIcon" />
            )}
            <div className="StoreLikes">{likes}</div>
          </div>
          <div className="StoreOneline">
            {data.Store_oneline}한줄소개가 많이 길어질 수도 있으니 두줄 잘림을
            할건데 이것은 테스트 하는 것이여 그러니 잔말말고 보도록 해
          </div>
        </div>
      </div>
      <hr className="StoreHr" />
    </div>
  );
}

export default StoreList;
