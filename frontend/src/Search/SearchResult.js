import { useSearchParams, useNavigate } from 'react-router-dom';
import dummy from '../db/list.json';
import BackToTop from '../AppBar/BackToTop';
import SearchCard from './SearchCard';
import './SearchResult.css';

function SearchResult() {
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get('search');

  // paramas 내용으로 axios해서 불러오기?
  // 검색한 결과로 나올테고, 브랜드? 상품? 우선은 상품만
  const responses = dummy.Goods;
  console.log('gg', responses);
  // 무한 스크롤에서 사용?
  console.log('검색결과', search);
  console.log(setSearchParams);

  return (
    <div>
      <BackToTop />
      <div className="searchCardList">
        {responses.map(response => {
          return (
            <SearchCard
              result={response}
              key={response.postId}
              navigate={navigate}
            />
          );
        })}
      </div>
    </div>
  );
}

export default SearchResult;
