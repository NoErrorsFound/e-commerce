import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import mockProducts from '../data/mockProducts';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        // Fallback for demo
        const foundProduct = mockProducts.find((p) => p._id === id);
        if (foundProduct) {
          setProduct(foundProduct);
        } else {
          setProduct({
            _id: id,
            name: 'Product Not Found',
            image: 'https://via.placeholder.com/800',
            description: 'Could not find the product you are looking for.',
            brand: 'Unknown',
            price: 0,
            countInStock: 0,
          });
        }
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <div className="loader-container"><div className="loader"></div></div>;
  }

  return (
    <>
      <Link to="/" className="btn" style={{ marginBottom: '2rem', border: '1px solid var(--border-color)' }}>
        Go Back
      </Link>
      <div className="product-details">
        <div className="details-image">
          <img src={product.image} alt={product.name} />
        </div>
        <div className="details-info">
          <div className="product-brand">{product.brand}</div>
          <h1>{product.name}</h1>
          <div className="details-price">${product.price?.toFixed(2)}</div>
          
          <div className={`status-badge ${product.countInStock > 0 ? 'status-in-stock' : 'status-out-stock'}`}>
            {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
          </div>

          <p className="details-description">{product.description}</p>
          
          {product.countInStock > 0 && (
            <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ fontWeight: '600' }}>Quantity:</span>
              <select 
                value={qty} 
                onChange={(e) => setQty(Number(e.target.value))}
                style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)', background: 'transparent', color: 'inherit' }}
              >
                {[...Array(product.countInStock).keys()].map((x) => (
                  <option key={x + 1} value={x + 1} style={{ color: '#000' }}>
                    {x + 1}
                  </option>
                ))}
              </select>
            </div>
          )}

          <button 
            className="btn btn-primary" 
            style={{ padding: '1rem 3rem', fontSize: '1.1rem' }}
            disabled={product.countInStock === 0}
            onClick={() => {
              addToCart(product, qty);
              navigate('/cart');
            }}
          >
            {product.countInStock > 0 ? 'Add to Cart' : 'Out of Stock'}
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
