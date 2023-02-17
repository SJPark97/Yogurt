import { useState } from 'react';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import DeleteIcon from '@mui/icons-material/Delete';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import axios from 'axios';

export default function NoticeItem({ notice, owner, sellerId }) {
  const [isDelete, setIsDelete] = useState(false);
  const data = { status: 'STATUS_DELETE' };

  const handleClick = async event => {
    setIsDelete(!isDelete);
    await axios
      .patch(`https://i8b204.p.ssafy.io/be-api/notice/${event}`, data)
  };
  return (
    <div style={{ display: isDelete ? 'none' : '' }}>
      <ListItem alignItems="flex-start">
        <ListItemText
          className="noticeTitle"
          primary={
            <div className="noticeFirst">
              <div
                style={{
                  fontSize: '18px',
                  fontWeight: '700',
                }}
              >
                {notice.title}
              </div>
              {owner === Number(sellerId) && (
                <IconButton
                  size="medium"
                  color="inherit"
                  aria-label="alarm-close"
                  onClick={() => {
                    handleClick(notice.id);
                  }}
                >
                  <DeleteIcon sx={{ color: 'gray' }} />
                </IconButton>
              )}
            </div>
          }
          secondary={
            <Typography
              sx={{ display: 'inline', fontSize: '16px' }}
              component="span"
              variant="body2"
              color="text.primary"
              className="notice-content"
            >
              {notice.content}
            </Typography>
          }
        />
      </ListItem>
      <Divider variant="middle" component="li" />
    </div>
  );
}
