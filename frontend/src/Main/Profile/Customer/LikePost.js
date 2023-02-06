import { useNavigate } from 'react-router-dom';

const responses = [
  {
    postId: 0,
    postStore: '승토어',
    postBrand: '구찌',
    postName: '브라운 레더 자켓',
    postPrice: 200000,
    postSalePrice: 180000,
    postImg:
      'http://snaptime.edaily.co.kr/wp-content/uploads/2019/12/50717-700x516.jpg',
  },
  {
    postId: 1,
    postStore: '승토어',
    postBrand: '구찌',
    postName: '브라운 레더 자켓',
    postPrice: 200000,
    postSalePrice: 180000,
    postImg:
      'http://snaptime.edaily.co.kr/wp-content/uploads/2019/12/50717-700x516.jpg',
  },
  {
    postId: 2,
    postStore: '박토어',
    postBrand: '버버리',
    postName: '트렌치 코트',
    postPrice: 250000,
    postSalePrice: 170000,
    postImg:
      'http://snaptime.edaily.co.kr/wp-content/uploads/2019/12/50717-700x516.jpg',
  },
  {
    postId: 3,
    postStore: '소토어',
    postBrand: '샤넬',
    postName: '손수건',
    postPrice: 200000,
    postSalePrice: 150000,
    postImg:
      'http://snaptime.edaily.co.kr/wp-content/uploads/2019/12/50717-700x516.jpg',
  },
  {
    postId: 4,
    postStore: '송토어',
    postBrand: '구찌',
    postName: '브라운 레더 자켓',
    postPrice: 200000,
    postSalePrice: 180000,
    postImg:
      'http://snaptime.edaily.co.kr/wp-content/uploads/2019/12/50717-700x516.jpg',
  },
];

export default function LikePost() {
  const navigate = useNavigate();
  const discount = response =>
    Math.floor(
      ((response.postPrice - response.postSalePrice) / response.postPrice) *
        100,
    );

  const handleClick = response => {
    navigate(`/post/${response.postId}`);
  };

  return (
    <div className="searchCardList">
      {responses.map(response => (
        <div
          className="searchCard"
          role="presentation"
          onClick={() => handleClick(response)}
          key={response.postId}
        >
          <img className="searchCardImg" src={response.postImg} alt="#" />
          <div className="searchCardStore">{response.postStore}</div>
          <div className="searchCardName">
            [{response.postBrand}] {response.postName}
          </div>
          <div className="searchCardTag">
            {discount(response) ? (
              <div className="searchCardDiscount">{discount(response)}%</div>
            ) : null}
            <div className="searchCardPrice">
              {response.postSalePrice.toLocaleString()}
            </div>
            <div className="searchCardBeforePrice">
              {response.postPrice.toLocaleString()}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
