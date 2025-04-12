
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getProduct } from '../services/api';
import { useCart } from '../context/CartContext';
import { ArrowLeft, Star, ShoppingCart, Check } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [quantity, setQuantity] = useState(1);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const { addItem } = useCart();

  const { data: product, isLoading, error } = useQuery({
    queryKey: ['product', id],
    queryFn: () => getProduct(Number(id)),
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-t-shop-blue border-gray-200 rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-shop-text">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    toast.error('Failed to load product details');
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-red-500 mb-4">Failed to load product details</p>
        <Link to="/" className="text-shop-blue hover:underline flex items-center justify-center">
          <ArrowLeft size={16} className="mr-1" />
          Back to products
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addItem(product, quantity);
    setIsAddedToCart(true);
    
    // Reset the added indicator after 2 seconds
    setTimeout(() => setIsAddedToCart(false), 2000);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link to="/" className="text-shop-text-light hover:text-shop-blue flex items-center">
          <ArrowLeft size={16} className="mr-1" />
          Back to products
        </Link>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="md:flex">
          {/* Product Image */}
          <div className="md:w-1/2 bg-gray-50 p-8 flex items-center justify-center">
            <img 
              src={product.image} 
              alt={product.title} 
              className="max-h-80 object-contain" 
            />
          </div>
          
          {/* Product Details */}
          <div className="md:w-1/2 p-6 md:p-8">
            <div className="mb-2">
              <span className="inline-block px-2 py-1 text-xs bg-shop-gray rounded-full text-shop-text-light capitalize">
                {product.category}
              </span>
            </div>
            <h1 className="text-2xl font-bold text-shop-text mb-2">{product.title}</h1>
            
            <div className="flex items-center mb-4">
              <div className="flex items-center mr-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    fill={i < Math.floor(product.rating.rate) ? "#FFD700" : "none"}
                    stroke={i < Math.floor(product.rating.rate) ? "#FFD700" : "#9CA3AF"}
                    className="mr-1"
                  />
                ))}
              </div>
              <span className="text-shop-text-light text-sm">
                {product.rating.rate} ({product.rating.count} reviews)
              </span>
            </div>
            
            <p className="text-shop-text-light mb-6">{product.description}</p>
            
            <div className="text-2xl font-bold text-shop-text mb-6">
              ${product.price.toFixed(2)}
            </div>
            
            <div className="flex items-center mb-6">
              <label htmlFor="quantity" className="mr-3 text-shop-text">
                Quantity:
              </label>
              <div className="flex border border-gray-300 rounded-md">
                <button
                  type="button"
                  className="px-3 py-1 text-shop-text hover:bg-gray-100"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </button>
                <input
                  type="number"
                  id="quantity"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-12 text-center border-x border-gray-300 focus:outline-none"
                />
                <button
                  type="button"
                  className="px-3 py-1 text-shop-text hover:bg-gray-100"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </button>
              </div>
            </div>
            
            <button
              onClick={handleAddToCart}
              className={`w-full py-3 px-4 rounded-md flex items-center justify-center ${
                isAddedToCart
                  ? 'bg-green-500 hover:bg-green-600'
                  : 'bg-shop-blue hover:bg-shop-blue-dark'
              } text-white transition-colors duration-300`}
            >
              {isAddedToCart ? (
                <>
                  <Check size={20} className="mr-2" /> Added to cart
                </>
              ) : (
                <>
                  <ShoppingCart size={20} className="mr-2" /> Add to cart
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
