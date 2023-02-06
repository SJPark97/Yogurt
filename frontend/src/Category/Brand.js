import './Category.css';

function Brand({ brand }) {
  return (
    <div
      role="presentation"
      className="brand"
      onClick={() => {
        console.log('브랜드 검색');
        console.log(brand.name);
      }}
    >
      <img src={brand.image} alt="#" className="brandImg" />
      <p className="brandName">{brand.name}</p>
    </div>
  );
}

export default Brand;
