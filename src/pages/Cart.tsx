
import {Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CartItem from '../components/CartItem';
import { ArrowLeft, ShoppingCart } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { convertUSDtoINR, formatINR } from '../lib/currency';

const Cart = () => {
  const { items, total, clearCart } = useCart();
  const [isProcessingOrder, setIsProcessingOrder] = useState(false);
  
  // Convert total to INR
  const totalInINR = convertUSDtoINR(total);
  
  const handleCheckout = () => {
    if (items.length === 0) {
      toast.error('Your cart is empty');
      return;
    }
    
    setIsProcessingOrder(true);
    
    // Simulate processing delay
    setTimeout(() => {
      clearCart();
      toast.success('Order placed successfully!');
      setIsProcessingOrder(false);
    }, 1500);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link to="/" className="text-shop-text-light hover:text-shop-blue flex items-center">
          <ArrowLeft size={16} className="mr-1" />
          Continue shopping
        </Link>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h1 className="text-xl font-bold text-shop-text">Your Cart</h1>
        </div>
        
        {items.length > 0 ? (
          <div className="md:flex">
            {/* Cart Items */}
            <div className="md:w-2/3 p-6 border-r border-gray-200">
              <div className="divide-y divide-gray-200">
                {items.map((item) => (
                  <CartItem key={item.id} item={item} />
                ))}
              </div>
            </div>
            
            {/* Cart Summary */}
            <div className="md:w-1/3 p-6">
              <h2 className="text-lg font-medium text-shop-text mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-shop-text">
                  <span>Items ({items.length})</span>
                  <span>{formatINR(totalInINR)}</span>
                </div>
                <div className="flex justify-between text-shop-text">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="border-t border-gray-200 pt-3 flex justify-between text-lg font-medium">
                  <span>Total</span>
                  <div className="text-right">
                    <div>{formatINR(totalInINR)}</div>
                    <div className="text-xs text-shop-text-light">(${total.toFixed(2)} USD)</div>
                  </div>
                </div>
              </div>
              
              <button
                onClick={handleCheckout}
                disabled={isProcessingOrder || items.length === 0}
                className={`w-full py-3 px-4 rounded-md bg-shop-blue text-white text-center ${
                  isProcessingOrder || items.length === 0
                    ? 'opacity-70 cursor-not-allowed'
                    : 'hover:bg-shop-blue-dark'
                }`}
              >
                {isProcessingOrder ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  'Checkout'
                )}
              </button>
            </div>
          </div>
        ) : (
          <div className="p-8 text-center">
            <div className="mx-auto w-16 h-16 bg-shop-gray rounded-full flex items-center justify-center mb-4">
              <ShoppingCart size={24} className="text-shop-text-light" />
            </div>
            <h2 className="text-lg font-medium text-shop-text mb-2">Your cart is empty</h2>
            <p className="text-shop-text-light mb-6">Looks like you haven't added any products to your cart yet.</p>
            <Link
              to="/"
              className="inline-block py-2 px-4 rounded-md bg-shop-blue text-white hover:bg-shop-blue-dark"
            >
              Start Shopping
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
