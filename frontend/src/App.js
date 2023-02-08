import { Route, Routes } from 'react-router-dom';
import Home from './Main/Home/Home';
import Category from './Main/Category';
import StoreList from './Main/Store/StoreList';
import StoreDetail from './Store/StoreDetail';
import AlarmList from './Main/Alarm/AlarmList';
import SellerProfile from './Main/Profile/SellerProfile';
import BuyerProfile from './Main/Profile/BuyerProfile';
import MainAppBar from './AppBar/MainAppBar';
import SignUp from './User/Singup';
import LogIn from './User/Login';
import Search from './Search/Search';
import SearchResult from './Search/SearchResult';
// import BackToTop from "./AppBar/BackToTop";
import MainFooter from './Footer/MainFooter';
import PostDetail from './PostDetail/PostDetail';
import PostRegister from './Register/PostRegister';
import NotedRegister from './Register/NotedRegister';
import ReviewRegister from './Register/ReviewRegister';
import WishList from './WishList/WishList';
import PayMent from './Payment/PayMent';
// import VideoRoomComponent from './components/VideoRoomComponent';
import ProfileModify from './Main/Profile/ProfileModify';
import PayResult from './Payment/PayResult';
import LiveRegister from './Register/LiveRegister';
import ScrollToTop from './ScrollToTop';
import Lgc from './components/Lgc';

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
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/video" element={<VideoRoomComponent />} /> */}
        <Route path="/lgc" element={<Lgc />} />
        <Route path="/category" element={<Category />} />
        <Route path="/stores">
          <Route path="" element={<StoreList />} />
          <Route path=":storeId" element={<StoreDetail />} />
        </Route>
        <Route path="/alarms" element={<AlarmList />} />
        <Route path="/profile">
          <Route path="seller" element={<SellerProfile />} />
          <Route path="buyer" element={<BuyerProfile />} />
        </Route>
        <Route path="/post">
          <Route path="join" element={<PostRegister />} />
          <Route path=":postId" element={<PostDetail />} />
        </Route>
        <Route path="/noted/join" element={<NotedRegister />} />
        <Route path="/review/join" element={<ReviewRegister />} />
        <Route path="/live/join" element={<LiveRegister />} />
        <Route path="/wishlist" element={<WishList />} />
        <Route path="/payment" element={<PayMent />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/search" element={<Search />} />
        <Route path="/search/result" element={<SearchResult />} />
        <Route path="/profile/modify" element={<ProfileModify />} />
        <Route path="/kakaopay" element={<PayResult />} />
      </Routes>
      <footer>
        <MainFooter user={user} />
      </footer>
    </div>
  );
}

export default App;
