import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import CloseIcon from '@mui/icons-material/Close';
import './Alarm.css';

function Alarm({ alarmData }) {
  return (
    <div>
      <Box
        sx={{
          marginBottom: '8px',
          margin: '16px',
          display: 'inline-grid',
          gridTemplateColumns: '2fr 8fr 1fr',
          height: '100%',
          maxWidth: '100%',
          alignItems: 'center',
          justifyItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <img src={alarmData.alarm_thumbnail} alt="#" className="alarm-img" />
        <p className="alarm-contetn">{alarmData.alarm_content}</p>
        <IconButton
          size="medium"
          color="inherit"
          aria-label="alarm-close"
          onClick={() => console.log('알람 삭제하기!')}
        >
          <CloseIcon />
        </IconButton>
      </Box>
      <Divider variant="middle" />
    </div>
  );
}

export default Alarm;
