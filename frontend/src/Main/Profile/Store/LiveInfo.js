import { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Divider from '@mui/material/Divider';
import './LiveInfo.css';

function LiveInfo() {
  const navigate = useNavigate();
  const { sellerId } = useParams();
  const loginUser = useSelector(state => state.user.value);
  const [live, setLive] = useState('n');

  const getLive = useCallback(async () => {
    await axios
      .get(`https://i8b204.p.ssafy.io/be-api/live?sellerId=${sellerId}`, {
        headers: { Authorization: loginUser.token },
      })
      .then(res => {
        setLive(res.data[0]);
      })
  }, [loginUser, sellerId]);

  useEffect(() => {
    getLive();
  }, [getLive]);

  return (
    <div>
      {live === 'n' ? (
        <div className="totalLive">
          <p>등록된 라이브가 없습니다.</p>
        </div>
      ) : (
        <div>
          <div className="totalLive">
            <p>라이브 1개</p>
          </div>
          <div className="liveinfo-info">
            <p style={{ color: 'red' }}>{live?.time.slice(5, 7) + "/" + live?.time.slice(8, 10) + " " + live?.time.slice(11, 13) + ":" + live?.time.slice(14, 16) + " 라이브 예정"}</p>
            <img
              src={live?.thumbnail}
              alt="라이브대표이미지"
              className="liveinfoImg"
            />
            <p>{live?.title}</p>
          </div>
          <div className="liveinfo-postinfo">
            <Divider variant="middle" sx={{ marginBottom: '1rem' }} />
            <p>라이브 예정 상품</p>
            {live.liveLists?.map(liveItem => (
              <div
                key={liveItem.id}
                className="liveinfo-post"
                role="presentation"
                onClick={() => {
                  navigate(`/post/${liveItem.postDetailResponse.id}`);
                }}
              >
                <div className="liveinfo-post-img-div">
                  <img
                    className="liveinfo-post-img"
                    src={liveItem.postDetailResponse.postImages[0].url}
                    alt="이미지사진"
                  />
                </div>
                <div className="liveinfo-post-info">
                  <p>{liveItem.postDetailResponse.title}</p>
                  <div className="liveinfo-price">
                    {liveItem.postDetailResponse.price -
                      liveItem.postDetailResponse.sale_price ? (
                      <div className="liveinfo-sale-percent">
                        {Math.floor(
                          ((liveItem.postDetailResponse.price -
                            liveItem.postDetailResponse.sale_price) /
                            liveItem.postDetailResponse.price) *
                          100,
                        )}
                        %
                      </div>
                    ) : null}
                    <div className="liveinfo-post-sale-price">
                      {liveItem.postDetailResponse.sale_price.toLocaleString()}
                    </div>
                    <div className="liveinfo-post-price">
                      {liveItem.postDetailResponse.price.toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default LiveInfo;
