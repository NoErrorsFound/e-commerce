import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import mockProducts from '../data/mockProducts';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/products');
        setProducts(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
        // Fallback for demo if backend isn't running yet
        setProducts(mockProducts);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <section className="hero">
        <h1 className="hero-title">Discover the Extraordinary</h1>
        <p className="hero-subtitle">Experience our premium collection of handpicked electronics with unmatched quality and design.</p>
        <button className="btn btn-primary">Shop Now</button>
      </section>

      <h2>Latest Arrivals</h2>
      {loading ? (
        <div className="loader-container"><div className="loader"></div></div>
      ) : (
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </>
  );
};

export default Home;
