
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import {ShoppingCart, LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';

const Header = () => {
  const { logout, isAuthenticated, user } = useAuth();
  const { itemCount } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  if (!isAuthenticated) {
    return null; // Don't show header on login page
  }

  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-shop-blue">StoreDelight</Link>

        {/* Mobile menu button */}
        <button className="md:hidden text-gray-600" onClick={toggleMenu}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-shop-text hover:text-shop-blue transition-colors">
            Products
          </Link>
          <div className="relative">
            <Link to="/cart" className="text-shop-text hover:text-shop-blue transition-colors">
              <ShoppingCart className="inline-block mr-1" size={20} />
              Cart
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-shop-blue text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {itemCount}
                </span>
              )}
            </Link>
          </div>
          <button 
            onClick={logout}
            className="flex items-center text-shop-text hover:text-shop-blue transition-colors"
          >
            <LogOut className="inline-block mr-1" size={18} />
            Logout
          </button>
          {user && (
            <span className="text-sm text-shop-text-light">
              Hi, {user}
            </span>
          )}
        </nav>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-md z-20">
            <div className="flex flex-col py-2">
              <Link 
                to="/" 
                className="px-4 py-2 text-shop-text hover:bg-gray-100"
                onClick={toggleMenu}
              >
                Products
              </Link>
              <Link 
                to="/cart" 
                className="px-4 py-2 text-shop-text hover:bg-gray-100 flex items-center justify-between"
                onClick={toggleMenu}
              >
                <div className="flex items-center">
                  <ShoppingCart className="inline-block mr-2" size={18} />
                  Cart
                </div>
                {itemCount > 0 && (
                  <span className="bg-shop-blue text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {itemCount}
                  </span>
                )}
              </Link>
              <button 
                onClick={() => {
                  logout();
                  toggleMenu();
                }}
                className="px-4 py-2 text-shop-text hover:bg-gray-100 flex items-center text-left"
              >
                <LogOut className="inline-block mr-2" size={18} />
                Logout
              </button>
              {user && (
                <div className="px-4 py-2 text-sm text-shop-text-light border-t border-gray-100 mt-2">
                  Signed in as: {user}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
