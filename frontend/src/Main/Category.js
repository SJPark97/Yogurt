import '../App.css';
// import SubAppBar from '../AppBar/SubAppBar';
import Divider from '@mui/material/Divider';
import BrandList from '../Category/BrandList';
import BackToTop from '../AppBar/BackToTop';
import CategoryList from '../Category/CategoryList';

function Category() {
  return (
    <div>
      {/* <SubAppBar /> */}
      <BackToTop />
      <Divider />
      <BrandList />
      <CategoryList />
    </div>
  );
}

export default Category;
