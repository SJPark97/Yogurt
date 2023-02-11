import { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';

import Typography from '@mui/material/Typography';
import './Notice.css';

function Notice() {
  const { sellerId } = useParams();
  const loginUser = useSelector(state => state.user.value);

  const [notices, setNotices] = useState([]);

  const getNotices = useCallback(async () => {
    await axios
      .get(`https://i8b204.p.ssafy.io/be-api/notice/${sellerId}`, {
        headers: { Authorization: loginUser.token },
      })
      .then(res => {
        setNotices(res.data.notices);
      })
      .catch(err => {
        console.log(err);
      });
  }, [loginUser, sellerId]);

  useEffect(() => {
    getNotices();
  }, [getNotices]);

  return (
    <div className="notices">
      <div className="totalNotice">공지사항 {notices.length}개</div>
      <List
        sx={{ width: '100%', maxWidth: '100%', bgcolor: 'background.paper' }}
      >
        {notices.map(notice => (
          <div key={notice.id}>
            <ListItem alignItems="flex-start">
              <ListItemText
                className="noticeTitle"
                primary={
                  <div
                    style={{
                      fontSize: '20px',
                      fontWeight: '700',
                      marginBottom: '0.5rem',
                    }}
                  >
                    {notice.title}
                  </div>
                }
                secondary={
                  <Typography
                    sx={{ display: 'inline', fontSize: '16px' }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {notice.content}
                  </Typography>
                }
              />
            </ListItem>
            <Divider variant="middle" component="li" />
          </div>
        ))}
      </List>
    </div>
  );
}

export default Notice;
