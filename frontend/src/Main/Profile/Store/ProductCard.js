import React from 'react';

function ProductCard({ post, navigate }) {
  const discount = Math.floor(
    ((post.price - post.sale_price) / post.price) * 100,
  );

  const handleClick = () => {
    navigate(`/post/${post.id}`);
  };

  return (
    <div className="productCard" role="presentation" onClick={handleClick}>
      <img className="productCardImg" src={post.postImages[0].url} alt="#" />
      <div className="productCardBrand">{post.brCateName}</div>
      <div className="productCardName">{post.title}</div>
      <div className="productCardTag">
        {discount ? (
          <div className="productCardDiscount">{discount}%</div>
        ) : null}
        <div className="productCardPrice">
          {post.sale_price.toLocaleString()}
        </div>
        <div className="productCardBeforePrice">
          {post.price.toLocaleString()}
        </div>
      </div>
    </div>
  );
}
export default ProductCard;
