import './Category.css';

function Category({ sub }) {
  return (
    <div
      role="presentation"
      className="category"
      onClick={() => {
        console.log('서브카테고리', sub.name);
      }}
    >
      <img src={sub.image} alt="#" className="categoryImg" />
      <div className="subName">{sub.name}</div>
    </div>
  );
}

export default Category;
