import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ButtonAppBar from './ButtonAppBar';
import SubAppBar from './SubAppBar';
import StoreAppBar from './StoreAppBar';

function MainAppBar() {
  const pageUrl = useLocation().pathname;
  const [appBar, setAppBar] = useState('/');
  useEffect(() => {
    setAppBar(pageUrl);
  }, [pageUrl]);
  console.log('이거다!', pageUrl);
  return (
    <div>
      {appBar === '/' && <ButtonAppBar />}
      {appBar === '/stores' && <ButtonAppBar />}
      {appBar === '/alarms' && <ButtonAppBar />}
      {appBar === '/profile' && <StoreAppBar />}
      {appBar === '/category' && <SubAppBar />}
      {appBar.includes('post') && <SubAppBar />}
    </div>
  );
}

export default MainAppBar;
