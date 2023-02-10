import * as React from 'react';
import dummy from '../../../db/SJ.json'
import ItemInfo from '../ItemInfo'
import './LiveItemSeller.css'

export default function LiveItemSeller() {
  const liveItems = dummy.liveItems

  return (
    <div id="live-item">
      {liveItems.map((item, num) => {
        return <ItemInfo item={item} num={num} key={num} owner={true}/> 
      })}
    </div>
  );
}
