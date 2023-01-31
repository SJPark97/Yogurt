import { Route, Routes } from 'react-router-dom';
import Home from './Main/Home/Home';
import Category from './Main/Category';
import StoreList from './Main/Store/StoreList';
import Alarm from './Main/Alarm/Alarm';
import SellerProfile from './Main/Profile/SellerProfile';
import BuyerProfile from './Main/Profile/BuyerProfile';
import MainAppBar from './AppBar/MainAppBar';
// import BackToTop from "./AppBar/BackToTop";
import MainFooter from './Footer/MainFooter';
import PostDetail from './PostDetail/PostDetail';
import PostRegister from './Register/PostRegister';
import NotedRegister from './Register/NotedRegister';

// 이거에 따라서 프로필이 다르게 들어가짐
const user = {
  // role: 'buyer',
  role: 'seller',
  id: 0,
};

function App() {
  return (
    <div className="App">
      <header>
        <MainAppBar />
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category" element={<Category />} />
        <Route path="/stores" element={<StoreList user={user} />} />
        <Route path="/alarms" element={<Alarm />} />
        <Route path="/profile/seller" element={<SellerProfile />} />
        <Route path="/profile/buyer" element={<BuyerProfile />} />
        <Route path="/post/:postId" element={<PostDetail />} />
        <Route path="/post/join" element={<PostRegister />} />
        <Route path="/noted/join" element={<NotedRegister />} />
      </Routes>
      <footer>
        <MainFooter user={user} />
      </footer>
    </div>
  );
}

export default App;
