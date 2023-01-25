import '../App.css';
import BackToTop from '../AppBar/BackToTop';
import StoreList from '../Common/StoreList';

function Store() {
  return (
    <div>
      <BackToTop />
      <h1>스토어</h1>
      <h2>여기에는 상점들</h2>
      <StoreList />
      <h1>아래</h1>
    </div>
  );
}

export default Store;
