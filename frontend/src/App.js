import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Category from './pages/Category';
import Store from './pages/Store';
import Alarm from './pages/Alarm';
import Profile from './pages/Profile';
import ButtonAppBar from './AppBar/MainAppBar';
// import BackToTop from "./AppBar/BackToTop";
import FixedBottomNavigation from './Footer/Footer';
import GoodDetail from './GoodDetail/GoodDetail';

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
      </Routes>
      <footer>
        <FixedBottomNavigation />
      </footer>
    </div>
  );
}

export default App;
