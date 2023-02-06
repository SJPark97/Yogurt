import React from 'react';

function ProductCard({ product, navigate }) {
  const discount = Math.floor(
    ((product.post_price - product.post_sale_price) / product.post_price) * 100,
  );

  const handleClick = () => {
    navigate(`/post/${product.postId}`);
  };

  return (
    <div className="productCard" role="presentation" onClick={handleClick}>
      <img className="productCardImg" src={product.image} alt="#" />
      <div className="productCardBrand">브랜드</div>
      <div className="productCardName">{product.post_title}</div>
      <div className="productCardTag">
        {discount ? (
          <div className="productCardDiscount">{discount}%</div>
        ) : null}
        <div className="productCardPrice">
          {product.post_sale_price.toLocaleString()}
        </div>
        <div className="productCardBeforePrice">
          {product.post_price.toLocaleString()}
        </div>
      </div>
    </div>
  );
}
export default ProductCard;
