import Brand from './Brand';
import './Category.css';
import { useState, useCallback, useEffect } from 'react';
import axios from 'axios';

export default function BrandList() {
  const [brandData, setBrandData] = useState([]);
  const getBrand = useCallback(async () => {
    await axios
      .get('https://i8b204.p.ssafy.io/be-api/cate/brand')
      .then(res => setBrandData(res.data));
  }, [setBrandData]);

  useEffect(() => {
    getBrand();
  }, [getBrand]);

  return (
    <div className="brands">
      {brandData.map(brand => (
        <Brand brand={brand} key={brand.id} />
      ))}
    </div>
  );
}
