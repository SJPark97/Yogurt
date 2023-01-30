import '../App.css';
import BackToTop from '../AppBar/BackToTop';
import StoreList from '../Common/StoreList';
import './Store.css';
import dummy from '../db/SJ.json';

function Store() {
  const store = dummy.Store;
  return (
    <div className="Store">
      <BackToTop />
      <div>
        {store.map(data => (
          <StoreList data={data} />
        ))}
      </div>
    </div>
  );
}

export default Store;
