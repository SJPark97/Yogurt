import * as React from 'react';
import dummy from '../../../db/SJ.json'
import ItemInfo from '../ItemInfo'
import './LiveItemBuyer.css'

export default function LiveItemBuyer() {
  const liveItems = dummy.liveItems

  return (
    <div id="live-item">
      {liveItems.map((item, num) => {
        return <ItemInfo item={item} num={num} key={num} owner={false}/>
      })}
    </div>
  );
}
