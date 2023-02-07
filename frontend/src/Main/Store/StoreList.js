import '../../App.css';
import BackToTop from '../../AppBar/BackToTop';
// import StoreList from '../Common/StoreList';
import dummy from '../../db/SJ.json';
import Store from './Store';
import './StoreList.css';

function StoreList() {
  const store = dummy.Stores;

  return (
    <div className="Store">
      <BackToTop />
      <div>
        {store.map(data => (
          // <StoreList data={data} />
          <Store sellerData={data} key={data.Store_id} />
        ))}
      </div>
    </div>
  );
}

export default StoreList;
