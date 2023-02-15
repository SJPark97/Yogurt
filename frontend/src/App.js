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
// import BackToTop from "./AppBar/BackToTop";
import MainFooter from './Footer/MainFooter';
import PostDetail from './PostDetail/PostDetail';
import PostRegister from './Register/PostRegister';
import NotedRegister from './Register/NotedRegister';
import ReviewRegister from './Register/ReviewRegister';
import WishList from './WishList/WishList';
import Payment from './Payment/Payment';
import Payment2 from './Payment/Payment2';
import ProfileModify from './Main/Profile/ProfileModify';
import LiveRegister from './Register/LiveRegister';
import ScrollToTop from './ScrollToTop';
import Room from './components/Room';
import BrandDetail from './Category/BrandDetail';
import SubCategory from './Category/SubCategory';
import SuccessResult from './Payment/SuccessResult';
import FailResult from './Payment/FailResult';

function App() {
  return (
    <div className="App">
      <header>
        <MainAppBar />
      </header>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/video/:liveId" element={<Room />} />
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
        <Route path="/kakaopay/success" element={<SuccessResult />} />
        <Route path="/kakaopay/fail" element={<FailResult />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogInPage />} />
        <Route path="/search" element={<Search />} />
        <Route path="/profile/modify/:id" element={<ProfileModify />} />
        <Route path="/brand/:brandId" element={<BrandDetail />} />
        <Route path="/category/:categoryId" element={<SubCategory />} />
      </Routes>
      <footer>
        <MainFooter />
      </footer>
    </div>
  );
}

export default App;
