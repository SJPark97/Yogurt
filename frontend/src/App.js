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
import LogInPage from './User/Login';
import Search from './Search/Search';
import SearchResult from './Search/SearchResult';
// import BackToTop from "./AppBar/BackToTop";
import MainFooter from './Footer/MainFooter';
import PostDetail from './PostDetail/PostDetail';
import PostRegister from './Register/PostRegister';
import NotedRegister from './Register/NotedRegister';
import ReviewRegister from './Register/ReviewRegister';
import WishList from './WishList/WishList';
import Payment from './Payment/Payment';
import Payment2 from './Payment/Payment2';
import VideoRoomComponent from './components/VideoRoomComponent';
import ProfileModify from './Main/Profile/ProfileModify';
// import PayResult from './Payment/PayResult';
import LiveRegister from './Register/LiveRegister';
import ScrollToTop from './ScrollToTop';
import Room from './components/Room';

function App() {
  return (
    <div className="App">
      <header>
        <MainAppBar />
      </header>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/video"
          element={
            <VideoRoomComponent
            // sessionName={sessionId}
            // user={userId}
            // owner={owner}
            />
          }
        />
        {/* <Route path="/video" element={<VideoRoomComponent />} /> */}
        <Route path="/room" element={<Room />} />
        <Route path="/category" element={<Category />} />
        <Route path="/stores">
          <Route path="" element={<StoreList />} />
          <Route path=":sellerId" element={<StoreDetail />} />
        </Route>
        <Route path="/alarms" element={<AlarmList />} />
        <Route path="/profile">
          <Route path="seller/:sellerId" element={<SellerProfile />} />
          <Route path="buyer/:buyerId" element={<BuyerProfile />} />
        </Route>
        <Route path="/post">
          <Route path="join" element={<PostRegister />} />
          <Route path=":postId" element={<PostDetail />} />
        </Route>
        <Route path="/noted/join" element={<NotedRegister />} />
        <Route path="/review/join" element={<ReviewRegister />} />
        <Route path="/live/join" element={<LiveRegister />} />
        <Route path="/wishlist" element={<WishList />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/payment2" element={<Payment2 />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogInPage />} />
        <Route path="/search" element={<Search />} />
        <Route path="/search/result" element={<SearchResult />} />
        <Route path="/profile/modify" element={<ProfileModify />} />
        {/* <Route path="/kakaopay" element={<PayResult />} /> */}
      </Routes>
      <footer>
        <MainFooter />
      </footer>
    </div>
  );
}

export default App;
