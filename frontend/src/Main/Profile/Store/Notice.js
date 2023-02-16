import { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import List from '@mui/material/List';
import NoticeItem from './NoticeItem';
import './Notice.css';
import { useNavigate } from 'react-router-dom';

function Notice() {
  const { sellerId } = useParams();
  const loginUser = useSelector(state => state.user.value);
  const [notices, setNotices] = useState([]);
  const [owner, setOwner] = useState(0);
  const navigate = useNavigate();
  const getNotices = useCallback(async () => {
    await axios
      .get(`https://i8b204.p.ssafy.io/be-api/notice/${sellerId}`, {
        headers: { Authorization: loginUser.token },
      })
      .then(res => {
        setOwner(res.data.id);
        setNotices(res.data.notices);
      })
      .catch(() => {
        alert('문제가 발생했습니다. \n 잠시후에 다시 시도해주세요.');
        navigate('/');
      });
  }, [loginUser, sellerId, navigate]);

  useEffect(() => {
    getNotices();
  }, [getNotices]);

  return (
    <div className="notices">
      <List
        sx={{ width: '100%', maxWidth: '100%', bgcolor: 'background.paper' }}
      >
        {notices.map(notice => (
          <NoticeItem
            key={notice.id}
            notice={notice}
            owner={owner}
            sellerId={sellerId}
          />
        ))}
      </List>
    </div>
  );
}

export default Notice;
