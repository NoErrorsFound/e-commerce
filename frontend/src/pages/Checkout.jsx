import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useEffect } from 'react';

const Checkout = () => {
  const { cartItems, removeFromCart } = useCart();

  // Optionally clear the cart on successful checkout
  useEffect(() => {
    // We could clear the cart here if it was a real checkout
    // For demo purposes, we will leave it or you can uncomment below:
    // cartItems.forEach(item => removeFromCart(item.product));
  }, []);

  return (
    <div className="checkout-container" style={{ textAlign: 'center', padding: '5rem 0' }}>
      <div className="success-icon" style={{ fontSize: '5rem', marginBottom: '1rem' }}>🎉</div>
      <h1 style={{ marginBottom: '1rem' }}>Thank You For Your Order!</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '1.2rem' }}>
        Your payment has been processed successfully. We've sent a confirmation email with your order details.
      </p>
      <Link to="/" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>
        Continue Shopping
      </Link>
    </div>
  );
};

export default Checkout;
