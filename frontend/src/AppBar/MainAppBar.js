// import { useLocation, useMatch } from 'react-router-dom';
import { useMatch } from 'react-router-dom';
import ButtonAppBar from './ButtonAppBar';
import SubAppBar from './SubAppBar';
import ProfileAppBar from './ProfileAppBar';

function MainAppBar() {
  // const pageUrl = useLocation().pathname;
  // console.log('appBar', pageUrl);

  return (
    <div>
      {useMatch('/') && <ButtonAppBar />}
      {useMatch('/stores') && <ButtonAppBar />}
      {useMatch('/stores/:storeId') && <SubAppBar />}
      {useMatch('/alarms') && <ButtonAppBar />}
      {useMatch('/profile/seller/:sellerId') && <ProfileAppBar />}
      {useMatch('/profile/buyer/:buyerId') && <ProfileAppBar />}
      {useMatch('/category') && <SubAppBar />}
      {useMatch('/category/:categoryId') && <SubAppBar />}
      {/** 아니 아래꺼 두개가 겹쳐서 join이라는 :storeId가 설정된다 */}
      {/* {useMatch('/post/join') && <SubAppBar />} */}
      {useMatch('/post/:postId') && <SubAppBar />}
      {/* {appBar.includes('post') && <SubAppBar />} */}
      {useMatch('/signup') && <SubAppBar />}
      {useMatch('/login') && <SubAppBar />}
      {/* {useMatch('/search') && <SearchAppBar />} */}
      {/* {useMatch('/search/result') && <SearchAppBar />} */}
      {useMatch('/noted/join') && <SubAppBar />}
      {useMatch('/review/join') && <SubAppBar />}
      {useMatch('/wishlist') && <SubAppBar />}
      {useMatch('/live/join') && <SubAppBar />}
      {useMatch('/payment') && <SubAppBar />}
      {useMatch('/payment2') && <SubAppBar />}
      {useMatch('/payment/result') && <SubAppBar />}
      {useMatch('/payresult') && <SubAppBar />}
      {useMatch('/profile/modify/:id') && <SubAppBar />}
      {useMatch('/brand/:brandId') && <SubAppBar />}
    </div>
  );
}

export default MainAppBar;
