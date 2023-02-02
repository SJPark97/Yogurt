function Category({ sub }) {
  return (
    <div
      role="presentation"
      className="category"
      onClick={() => {
        console.log('서브카테고리', sub.name);
      }}
    >
      <img src={sub.image} alt="#" />
      <p>{sub.name}</p>
    </div>
  );
}

export default Category;
