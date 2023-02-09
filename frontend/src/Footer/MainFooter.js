import { useLocation, useMatch } from 'react-router-dom';
import Footer from './Footer';

function MainAppBar({ userRole }) {
  const pageUrl = useLocation().pathname;
  // const [appBar, setAppBar] = useState('/');
  // useEffect(() => {
  //   setAppBar(pageUrl);
  // }, [pageUrl]);
  console.log('이거다!', pageUrl);

  return (
    <div>
      {useMatch('/') && <Footer userRole={userRole.role} />}
      {useMatch('/stores') && <Footer userRole={userRole.role} />}
      {useMatch('/alarms') && <Footer userRole={userRole.role} />}
      {useMatch('/profile/buyer') && <Footer userRole={userRole.role} />}
      {useMatch('/profile/seller') && <Footer userRole={userRole.role} />}
    </div>
  );
}

export default MainAppBar;
