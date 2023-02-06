import { useNavigate } from 'react-router-dom';
import ProductCard from './ProductCard';
import './ProductCard.css';

function ProductInfo({ products }) {
  console.log(products);
  const navigate = useNavigate();
  return (
    <div className="productCardList">
      {products.map(product => {
        return (
          <ProductCard
            product={product}
            key={product.postId}
            navigate={navigate}
          />
        );
      })}
    </div>
  );
}

export default ProductInfo;
