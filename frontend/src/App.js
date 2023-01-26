import { Route, Routes } from 'react-router-dom';
import Home from './Main/Home/Home';
import Category from './Main/Category';
import Store from './Main/Store';
import Alarm from './Main/Alarm';
import Profile from './Main/Profile';
import ButtonAppBar from './AppBar/MainAppBar';
// import BackToTop from "./AppBar/BackToTop";
import FixedBottomNavigation from './Footer/Footer';
import GoodDetail from './GoodDetail/GoodDetail';
import GoodRegister from './Register/GoodRegister';

function App() {
  return (
    <div className="App">
      <header>
        <ButtonAppBar />
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category" element={<Category />} />
        <Route path="/stores" element={<Store />} />
        <Route path="/alarms" element={<Alarm />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/post/:postId" element={<GoodDetail />} />
        <Route path="/post/join" element={<GoodRegister />} />
      </Routes>
      <footer>
        <FixedBottomNavigation />
      </footer>
    </div>
  );
}

export default App;
