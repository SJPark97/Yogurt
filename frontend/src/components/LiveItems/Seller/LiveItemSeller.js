import * as React from 'react';
import ItemInfo from '../ItemInfo'
import './LiveItemSeller.css'

export default function LiveItemSeller(props) {
  const { liveItems } = props

  return (
    <div id="live-item">
      {liveItems === undefined ? null : liveItems.map((item, num) => {
        return <ItemInfo
          item={item.postDetailResponse}
          num={num + 1}
          key={item.id}
          owner={true}
        />
      })}
    </div>
  );
}
