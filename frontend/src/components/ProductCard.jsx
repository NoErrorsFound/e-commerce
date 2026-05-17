import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <Link to={`/product/${product._id}`}>
        <div className="product-image-container">
          <img src={product.image} alt={product.name} className="product-image" />
        </div>
      </Link>
      <div className="product-info">
        <Link to={`/product/${product._id}`}>
          <div className="product-brand">{product.brand}</div>
          <h3 className="product-name">{product.name}</h3>
        </Link>
        <div className="product-price">${product.price.toFixed(2)}</div>
        <Link to={`/product/${product._id}`} className="btn btn-primary btn-block">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
