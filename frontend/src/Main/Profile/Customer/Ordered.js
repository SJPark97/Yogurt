import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import PostAddOutlinedIcon from '@mui/icons-material/PostAddOutlined';
import './Ordered.css';
import { useNavigate } from 'react-router';

const responses = [
  {
    postId: 0,
    postName: 'GV-80 화이트 셔츠',
    postBrand: '폴로 랄프로렌',
    postPrice: 50000,
    postStore: '박토어',
    postImg:
      'http://snaptime.edaily.co.kr/wp-content/uploads/2019/12/50717-700x516.jpg',
  },
  {
    postId: 1,
    postName: 'C9944090 가죽백',
    postBrand: '샤넬',
    postPrice: 180000,
    postStore: '왕토어',
    postImg:
      'http://snaptime.edaily.co.kr/wp-content/uploads/2019/12/50717-700x516.jpg',
  },
  {
    postId: 2,
    postName: '트렌치코트',
    postBrand: '버버리',
    postPrice: 230000,
    postStore: '송토어',
    postImg:
      'http://snaptime.edaily.co.kr/wp-content/uploads/2019/12/50717-700x516.jpg',
  },
];

export default function Ordered() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/review/join`);
  };

  return (
    <div>
      {responses.map(ordered => (
        <div key={ordered.postId}>
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
            <img src={ordered.postImg} alt="#" className="orderedImg" />
            <div>
              <div className="orderedBrand">{ordered.postBrand}</div>
              <div className="orderedName">{ordered.postName}</div>
              <div className="orderedPrice">
                {ordered.postPrice.toLocaleString()}원
              </div>
            </div>
          </Box>
          <div className="reviewBtn">
            <Button
              fullWidth
              variant="contained"
              startIcon={<PostAddOutlinedIcon />}
              sx={{
                marginBottom: '16px',
              }}
              onClick={handleClick}
            >
              리뷰 작성
            </Button>
          </div>
          <Divider variant="middle" />
        </div>
      ))}
    </div>
  );
}
