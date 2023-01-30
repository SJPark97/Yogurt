import BackToTop from '../../AppBar/BackToTop';
import AlarmList from './AlarmList';
import dummy from '../../db/SJ.json';
import './Alarm.css';

function Alarm() {
  const alarm = dummy.Alarm;
  return (
    <div className="AlarmList">
      <BackToTop />
      <div>
        {alarm.map(data => (
          <AlarmList data={data} />
        ))}
      </div>
    </div>
  );
}

export default Alarm;
