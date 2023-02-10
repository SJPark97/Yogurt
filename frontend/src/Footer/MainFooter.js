import { useLocation, useMatch } from 'react-router-dom';
import Footer from './Footer';

function MainFooter() {
  const pageUrl = useLocation().pathname;
  // const [appBar, setAppBar] = useState('/');
  // useEffect(() => {
  //   setAppBar(pageUrl);
  // }, [pageUrl]);
  console.log('푸터에서 이동한 페이지 주소', pageUrl);

  return (
    <div>
      {useMatch('/') && <Footer />}
      {useMatch('/stores') && <Footer />}
      {useMatch('/alarms') && <Footer />}
      {useMatch('/profile/buyer') && <Footer />}
      {useMatch('/profile/seller') && <Footer />}
    </div>
  );
}

export default MainFooter;
