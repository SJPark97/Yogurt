import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './LiveItemCarousel.css';
import LiveItemSeller from './Seller/LiveItemSeller';
import LiveItemBuyer from './Buyer/LiveItemBuyer';
import CloseIcon from '@mui/icons-material/Close';
import LiveButtonIcon from './LiveButtonIcon';

export default function ProfileDrawer(props) {
  const [state, setState] = React.useState({
    bottom: false,
  });
  const { liveId } = useParams();

  const [liveItems, setLiveItems] = React.useState(undefined);
  const owner = props.owner;

  const toggleDrawer = open => event => {
    axios
      .get('https://i8b204.p.ssafy.io/be-api/live/item', {
        params: {
          liveId: liveId,
        },
      })
      .then(res => setLiveItems(res.data))

    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, bottom: open });
  };
  return (
    <div>
      <React.Fragment key="bottom">
        <IconButton
          size="large"
          edge="end"
          color="inherit"
          aria-label="more"
          onClick={toggleDrawer(true)}
          id="LiveItemBox"
        >
          <LiveButtonIcon />
        </IconButton>
        <Drawer
          anchor="bottom"
          open={state.bottom}
          onClose={toggleDrawer(false)}
          className="drop-up"
        >
          <div id="box-3"></div>
          <CloseIcon id="drop-up-close" onClick={toggleDrawer(false)} />
          {owner ? (
            <LiveItemSeller liveItems={liveItems} />
          ) : (
            <LiveItemBuyer liveItems={liveItems} />
          )}
        </Drawer>
      </React.Fragment>
    </div>
  );
}
