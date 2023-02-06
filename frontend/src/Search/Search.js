// 유저정보 받아와서 기존에 검색히스토리 가져와서 컴포넌트에 내려주기
// 검색 시 검색 히스토리 사라지고 그부분에 검색 내용 찾아주기
import { useState } from 'react';

import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import BackToTop from '../AppBar/BackToTop';
import SearchHistory from './SearchHistory';

const histories = [
  { id: 0, content: '프라다' },
  { id: 1, content: '봄옷' },
  { id: 2, content: '남친룩' },
  { id: 3, content: '선물하기 좋은 옷' },
];

const response1 = {
  brands: [
    { id: 0, name: '가까이 유니언즈' },
    { id: 1, name: '꼼데가르송 플레이' },
    { id: 2, name: '발렌시아가' },
  ],
  keywords: [
    { id: 0, name: '가디건' },
    { id: 1, name: '가방' },
    { id: 2, name: '가죽자켓' },
  ],
};

function Search() {
  const [text, setText] = useState('');

  return (
    <div>
      <BackToTop />
      {text === '' ? (
        <div>
          <Typography
            variant="p"
            component="div"
            sx={{
              fontWeight: '800',
              margin: '1rem',
              textAlign: 'start',
              fontSize: '1.2rem',
            }}
          >
            최근 검색
          </Typography>
          {histories.map(history => (
            <SearchHistory content={history.content} key={history.id} />
          ))}
        </div>
      ) : (
        ''
      )}
      <div>버튼은 입력되는 글자를 대신하고, 리덕스 적용하면 고칠게요 </div>
      <button
        type="button"
        onClick={() => {
          setText('가');
        }}
      >
        가
      </button>
      {text === '가' && (
        <div>
          <Typography
            variant="p"
            component="div"
            sx={{
              fontWeight: '800',
              margin: '1rem',
              textAlign: 'start',
              fontSize: '1.2rem',
            }}
          >
            브랜드
          </Typography>
          {response1.brands &&
            response1.brands.map(brand => (
              <SearchHistory content={brand.name} key={brand.id} />
            ))}
          <Divider />
          <Typography
            variant="p"
            component="div"
            sx={{
              fontWeight: '800',
              margin: '1rem',
              textAlign: 'start',
              fontSize: '1.2rem',
            }}
          >
            검색
          </Typography>
          {response1.keywords &&
            response1.keywords.map(keyword => (
              <SearchHistory content={keyword.name} key={keyword.id} />
            ))}
        </div>
      )}
    </div>
  );
}

export default Search;
