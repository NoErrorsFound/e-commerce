import { Link } from 'react-router-dom';
import { ShoppingCart, User, LogOut } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { cartItems } = useCart();
  const { userInfo, logout } = useAuth();
  
  const cartItemCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

  return (
    <header className="navbar">
      <Link to="/" className="navbar-brand">
        Aura E-Comm
      </Link>
      <nav className="navbar-links">
        <Link to="/cart" className="nav-link cart-link">
          <ShoppingCart size={20} />
          <span>Cart</span>
          {cartItemCount > 0 && <span className="cart-badge">{cartItemCount}</span>}
        </Link>
        {userInfo ? (
          <div className="nav-user-menu">
            <span className="nav-link user-name">
              <User size={20} />
              {userInfo.name}
            </span>
            <button onClick={logout} className="nav-link logout-btn">
              <LogOut size={20} />
            </button>
          </div>
        ) : (
          <Link to="/login" className="nav-link">
            <User size={20} />
            <span>Sign In</span>
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
