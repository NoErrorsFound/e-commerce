import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2 } from 'lucide-react';

const Cart = () => {
  const { cartItems, addToCart, removeFromCart } = useCart();
  const navigate = useNavigate();

  const getSubtotal = () => {
    return cartItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2);
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart-empty">
        <h2>Your Cart is Empty</h2>
        <p>Looks like you haven't added anything to your cart yet.</p>
        <Link to="/" className="btn btn-primary" style={{ marginTop: '1rem' }}>
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h1>Shopping Cart</h1>
      <div className="cart-container">
        <div className="cart-items">
          {cartItems.map((item) => (
            <div key={item.product} className="cart-item">
              <div className="cart-item-image">
                <img src={item.image} alt={item.name} />
              </div>
              <div className="cart-item-details">
                <Link to={`/product/${item.product}`}>
                  <h3>{item.name}</h3>
                </Link>
                <div className="cart-item-price">${item.price.toFixed(2)}</div>
              </div>
              <div className="cart-item-actions">
                <select
                  value={item.qty}
                  onChange={(e) => addToCart(item, Number(e.target.value))}
                  className="qty-select"
                >
                  {[...Array(item.countInStock || 10).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </select>
                <button
                  className="btn-remove"
                  onClick={() => removeFromCart(item.product)}
                  title="Remove Item"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="cart-summary">
          <h2>Order Summary</h2>
          <div className="summary-row">
            <span>Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)} items)</span>
            <span>${getSubtotal()}</span>
          </div>
          <button 
            className="btn btn-primary btn-block" 
            style={{ marginTop: '2rem', marginBottom: '1rem' }}
            onClick={() => navigate('/checkout')}
          >
            Proceed to Checkout
          </button>
          <Link to="/" className="btn btn-block" style={{ border: '1px solid var(--border-color)' }}>
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
