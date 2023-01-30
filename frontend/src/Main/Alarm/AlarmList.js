import React from 'react';
import './AlarmList.css';
import CloseIcon from '@mui/icons-material/Close';

function AlarmList(props) {
  const { data } = props;
  return (
    <div>
      <div className="AlarmTag">
        <img className="AlarmImg" src={data.alarm_thumbnail} alt="#" />
        <div className="AlarmContent">
          <span>{data.alarm_content}</span>
        </div>
        <CloseIcon className="AlarmCloseIcon" />
      </div>
      <hr />
    </div>
  );
}

export default AlarmList;
