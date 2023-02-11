import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';

function MyReview() {
  const responses = [
    {
      reviewId: 0,
      reviewImg:
        'http://snaptime.edaily.co.kr/wp-content/uploads/2019/12/50717-700x516.jpg',
      reviewRate: 5,
      reviewItem: '폴로 랄프로렌 화이트 셔츠',
      reviewItemBrand: '폴로 랄프로렌',
      reviewContent:
        '정말 패셔너블 하네요 오래 됐는데도 세탁상태도 너무 좋고 여기 사장님이 너무 친절하고 정말 좋은 옷들을 많이 가져오시네요 ',
    },
    {
      reviewId: 1,
      reviewImg:
        'https://www.elandrs.com/upload/prd/img/710/600/2110722710_0000001.jpg',
      reviewRate: 4,
      reviewItem: '폴로 랄프로렌 화이트 셔츠',
      reviewItemBrand: '폴로 랄프로렌',
      reviewContent:
        '세탁이 아주 잘되어있고 질이 좋아요세탁이 아주 잘되어있고 질이 좋아요세탁이 아주 잘되어있고 질이 좋아요세탁이 아주 잘되어있고 질이 좋아요세탁이 ',
    },
    {
      reviewId: 2,
      reviewImg:
        'http://snaptime.edaily.co.kr/wp-content/uploads/2019/12/50717-700x516.jpg',
      reviewRate: 3,
      reviewItem: '폴로 랄프로렌 화이트 셔츠',
      reviewItemBrand: '폴로 랄프로렌',
      reviewContent: '세탁이 아주 잘되어있고 질이 좋아요',
    },
    {
      reviewId: 3,
      reviewImg:
        'http://snaptime.edaily.co.kr/wp-content/uploads/2019/12/50717-700x516.jpg',
      reviewRate: 2,
      reviewItem: '폴로 랄프로렌 화이트 셔츠',
      reviewItemBrand: '폴로 랄프로렌',
      reviewContent: '세탁이 아주 잘되어있고 질이 좋아요',
    },
    {
      reviewId: 4,
      reviewImg:
        'https://www.elandrs.com/upload/prd/img/710/600/2110722710_0000001.jpg',
      reviewRate: 1,
      reviewItem: '폴로 랄프로렌 화이트 셔츠',
      reviewItemBrand: '폴로 랄프로렌',
      reviewContent: '세탁이 아주 잘되어있고 질이 좋아요',
    },
    {
      reviewId: 5,
      reviewImg:
        'https://www.elandrs.com/upload/prd/img/710/600/2110722710_0000001.jpg',
      reviewNickname: '소채린',
      reviewRate: 5,
      reviewItem: '폴로 랄프로렌 화이트 셔츠',
      reviewContent: '세탁이 아주 잘되어있고 질이 좋아요',
    },
  ];

  return (
    <div>
      {responses.map(review => (
        <div key={review.reviewId}>
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
            <img src={review.reviewImg} alt="#" className="reviewImg" />
            <div>
              <div className="reviewItemBrand">{review.reviewItemBrand}</div>
              <div className="reviewItem">{review.reviewItem}</div>
              <div className="review_star">
                <div className="review_star-ratings">
                  <div
                    className="review_star-ratings-fill"
                    style={{ width: review.reviewRate * 15 }}
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
          <div className="reviewContent">{review.reviewContent}</div>
          <Divider variant="middle" />
        </div>
      ))}
    </div>
  );
}

export default MyReview;
