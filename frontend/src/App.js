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
import WishList from './WishList/WishList';
import PayMent from './Payment/PayMent';
import VideoRoomComponent from './components/VideoRoomComponent';

// 이거에 따라서 프로필이 다르게 들어가짐
const user = {
  // role: 'buyer',
  role: 'seller',
  id: 1,
};

function App() {
  return (
    <div className="App">
      <header>
        <MainAppBar />
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/video" element={<VideoRoomComponent />} />
        <Route path="/category" element={<Category />} />
        <Route path="/stores">
          <Route path="" element={<StoreList user={user} />} />
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
        <Route path="/wishlist" element={<WishList />} />
        <Route path="/payment" element={<PayMent />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/search" element={<Search />} />
        <Route path="/search/result" element={<SearchResult />} />
      </Routes>
      <footer>
        <MainFooter user={user} />
      </footer>
    </div>
  );
}

export default App;
