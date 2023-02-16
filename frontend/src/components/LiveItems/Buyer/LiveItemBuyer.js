import * as React from 'react';
import ItemInfo from '../ItemInfo'
import './LiveItemBuyer.css'

export default function LiveItemBuyer(props) {
  const { liveItems } = props

  return (
    <div id="live-item">
      {liveItems === undefined ? null : liveItems.map((item, num) => {
        return <ItemInfo
          item={item.postDetailResponse}
          num={num + 1}
          key={item.id}
          owner={false}
        />
      })}
    </div>
  );
}
