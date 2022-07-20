import React from 'react';
import { useParams } from 'react-router-dom';
import './category.styles.scss';
import { useSelector } from 'react-redux';
import ProductCard from '../../components/product-card/product-card.component';
import { selectCategoriesMap } from '../../store/categories/category.selector';

const Category = () => {
  const { category } = useParams();
  const [products, setProducts] = React.useState([]);
  const categoriesMap = useSelector(selectCategoriesMap);

  React.useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);
  return (
    <>
      <h2 className="category-title">{category.toUpperCase()}</h2>
      <div className="category-container">
        {products &&
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
    </>
  );
};

export default Category;
