import { useLocation, useMatch } from 'react-router-dom';
import Footer from './Footer';

function MainAppBar({ user }) {
  const pageUrl = useLocation().pathname;
  // const [appBar, setAppBar] = useState('/');
  // useEffect(() => {
  //   setAppBar(pageUrl);
  // }, [pageUrl]);
  console.log('이거다!', pageUrl);

  return (
    <div>
      {useMatch('/') && <Footer user={user} />}
      {useMatch('/stores') && <Footer user={user} />}
      {useMatch('/alarms') && <Footer user={user} />}
      {useMatch('/profile/buyer') && <Footer user={user} />}
      {useMatch('/profile/seller') && <Footer user={user} />}
    </div>
  );
}

export default MainAppBar;
