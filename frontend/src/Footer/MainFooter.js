// import { useLocation, useMatch } from 'react-router-dom';
import { useMatch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Footer from './Footer';

function MainFooter() {
  // const pageUrl = useLocation().pathname;
  // console.log('footer', pageUrl);

  const loginUser = useSelector(state => state.user.value);
  const sellerId = useMatch('/profile/seller/:sellerId')?.params.sellerId;

  return (
    <div>
      {useMatch('/') && <Footer />}
      {useMatch('/stores') && <Footer />}
      {useMatch('/alarms') && <Footer />}
      {useMatch('/profile/buyer/:buyerId') && <Footer />}
      {useMatch('/profile/seller/:sellerId') &&
      Number(sellerId) === loginUser.loginUserPk ? (
        <Footer />
      ) : (
        ''
      )}
    </div>
  );
}

export default MainFooter;
