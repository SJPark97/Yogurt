import { useNavigate } from 'react-router-dom';
import './Category.css';

function Brand({ brand }) {
  const navigate = useNavigate();
  return (
    <div
      role="presentation"
      className="brand"
      onClick={() => {
        navigate(`/brand/${brand.id}`, {
          state: { brandName: brand.name, brandImg: brand.img },
        });
      }}
    >
      <img src={brand.img} alt="#" className="brandImg" />
      <p className="brandName">{brand.name}</p>
    </div>
  );
}

export default Brand;
