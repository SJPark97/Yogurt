// import { useState, useEffect } from 'react';
import { useLocation, useMatch } from 'react-router-dom';
import ButtonAppBar from './ButtonAppBar';
import SubAppBar from './SubAppBar';
import ProfileAppBar from './ProfileAppBar';

function MainAppBar() {
  const pageUrl = useLocation().pathname;
  // const [appBar, setAppBar] = useState('/');
  // useEffect(() => {
  //   setAppBar(pageUrl);
  // }, [pageUrl]);
  console.log('이거다!', pageUrl);

  return (
    <div>
      {useMatch('/') && <ButtonAppBar />}
      {useMatch('/stores') && <ButtonAppBar />}
      {useMatch('/stores/:storeId') && <SubAppBar />}
      {useMatch('/alarms') && <ButtonAppBar />}
      {useMatch('/profile/buyer') && <ButtonAppBar />}
      {useMatch('/profile/seller') && <ProfileAppBar />}
      {useMatch('/category') && <SubAppBar />}
      {/** 아니 아래꺼 두개가 겹쳐서 join이라는 :storeId가 설정된다 */}
      {/* {useMatch('/post/join') && <SubAppBar />} */}
      {useMatch('/post/:postId') && <SubAppBar />}
      {/* {appBar.includes('post') && <SubAppBar />} */}
      {useMatch('/signup') && <SubAppBar />}
      {useMatch('/login') && <SubAppBar />}
    </div>
  );
}

export default MainAppBar;
