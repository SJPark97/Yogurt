import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';

import Typography from '@mui/material/Typography';
import './Notice.css';

// 공지사항들 불러오기
const responses = [
  {
    noticeId: 3,
    noticeTitle: '폴로 랄프로렌 특전! 라이브',
    noticeContent:
      '2월 6일 13시 기다리고 기다리던 폴로 랄프로렌 라이브!! 폴로 랄프로렌 하나쯤은 있어야 하잖아요~ 아주 다양하게 준비했습니다!',
  },
  {
    noticeId: 2,
    noticeTitle: '봄옷 라이브',
    noticeContent:
      '2월 5일 13시 다가오는 봄을 맞이해서 산뜻한 분위기의 옷들을 준비했습니다!!!',
  },
  {
    noticeId: 1,
    noticeTitle: '겨울옷 창고 대방출 라이브 예정',
    noticeContent:
      '요새는 3월까지도 추운데, 트렌드를 앞선 겨울 옷들을 준비했습니다!',
  },
  {
    noticeId: 0,
    noticeTitle: '옷 주문 방법',
    noticeContent:
      '1. 옷을 고른다 2. 결제를 한다. 3. 주문 받은 옷을 잘 입는다.',
  },
];

function Notice() {
  return (
    <div className="notices">
      <List
        sx={{ width: '100%', maxWidth: '100%', bgcolor: 'background.paper' }}
      >
        {responses.map(notice => (
          <div key={notice.noticeId}>
            <ListItem alignItems="flex-start">
              <ListItemText
                className="noticeTitle"
                primary={
                  <div style={{ fontSize: '20px', fontWeight: '700' }}>
                    {notice.noticeTitle}
                  </div>
                }
                secondary={
                  <Typography
                    sx={{ display: 'inline', fontSize: '16px' }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {notice.noticeContent}
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
