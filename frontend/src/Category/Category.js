import './Category.css';

function Category({ sub }) {
  const handleClick = () => {
    console.log('서브카테고리', sub);
  };

  return (
    <div role="presentation" className="category" onClick={handleClick}>
      <img src={sub.image} alt="#" className="categoryImg" />
      <div className="subName">{sub.name}</div>
    </div>
  );
}

export default Category;
