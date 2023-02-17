import * as React from 'react';
import axios from 'axios';
import './ItemInfo.css';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'

export default function ItemInfo(props) {
  const navigate = useNavigate();
  const { item, num, owner } = props;
  const [itemState, setItemState] = React.useState(item.status);
  const logInUser = useSelector(state => state.user.value)
  const percent = Math.floor(
    ((item.price - item.sale_price) / item.price) * 100,
  );

  const wishPost = () => {
    axios
      .post(`https://i8b204.p.ssafy.io/be-api/wishlist/${item.id}`, {
        headers: {
          Authorization: logInUser.token,
        },
      })
      .then(() => alert('상품이 장바구니에 담겼습니다.'))
      .catch(() => alert('상품이 이미 장바구니에 있습니다.'));
  };

  const sellOrNotSell = () => {
    axios
      .patch(`https://i8b204.p.ssafy.io/be-api/post/live/${item.id}`)
      .then(res => setItemState(res.data.status))
  };

  return (
    <div>
      <h2 id="item-number">상품 {num}</h2>
      <div id="live-item-info">
        {/* {console.log(item.postImages[0].url)} */}
        <img id="item-thumbnail" src={item.postImages[0].url} alt="#" />
        <div id="item-infomations">
          <p id="item-title">{item.title}</p>
          <div id="item-price-info">
            <p id="item-percent">{percent}%</p>
            <p id="item-sale-price">{item.sale_price.toLocaleString()}원</p>
            <p id="item-price">{item.price.toLocaleString()}원</p>
          </div>
        </div>
      </div>
      {owner && itemState === 'STATUS_LIVE_SOON' ? (
        <button id="button-sell-start" onClick={sellOrNotSell}>
          판매시작
        </button>
      ) : null}
      {owner && itemState === 'STATUS_SELL' ? (
        <button id="button-sell-ing" onClick={sellOrNotSell}>
          판매중
        </button>
      ) : null}
      {itemState === 'STATUS_END' ? (
        <button id="button-sell-end">판매완료</button>
      ) : null}
      {!owner && itemState === 'STATUS_LIVE_SOON' ? (
        <button id="button-sell-waitting">라이브 대기중</button>
      ) : null}
      {!owner && itemState === 'STATUS_SELL' ? (
        <button
          id="button-sell-buy"
          onClick={() =>
            navigate('/payment2', {
              state: {
                post: item,
                checkItems: [item?.id],
                totalPrice: item?.sale_price,
              },
            })
          }
        >
          구매하기
        </button>
      ) : null}
      {!owner && itemState === 'STATUS_SELL' ? (
        <button id="button-sell-basket" onClick={wishPost}>
          장바구니
        </button>
      ) : null}
      <hr id="live-hr-tag" />
    </div>
  );
}
