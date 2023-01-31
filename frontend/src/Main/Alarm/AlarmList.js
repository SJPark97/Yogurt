import BackToTop from '../../AppBar/BackToTop';
import Alarm from './Alarm';
import dummy from '../../db/SJ.json';
import './AlarmList.css';

function AlarmList() {
  const alarm = dummy.Alarm;
  return (
    <div className="alarm-list">
      <BackToTop />
      <div>
        {alarm.map(data => (
          <Alarm alarmData={data} key={data.alarm_id} />
        ))}
      </div>
    </div>
  );
}

export default AlarmList;
