import * as React from 'react';
import dummy from '../../../db/SJ.json'
import ItemInfo from '../ItemInfo'
import './LiveItemBuyer.css'

export default function LiveItemBuyer() {
  const liveItems = dummy.liveItems

  return (
    <div id="live-item">
      <h1>나는 구매자</h1>
      {liveItems.map((item, num) => {
        return <ItemInfo item={item} num={num} key={num} owner={false}/>
      })}
    </div>
  );
}
