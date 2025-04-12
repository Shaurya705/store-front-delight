
import { Link } from 'react-router-dom';
import {Product } from '../services/api';
import { useCart } from '../context/CartContext';
import { ShoppingCart } from 'lucide-react';
import { convertUSDtoINR, formatINR } from '../lib/currency';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addItem } = useCart();
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
  };

  // Convert price to INR
  const priceInINR = convertUSDtoINR(product.price);

  return (
    <Link to={`/product/${product.id}`} className="group">
      <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
        <div className="relative pt-[100%] bg-gray-50">
          <img
            src={product.image}
            alt={product.title}
            className="absolute inset-0 w-full h-full object-contain p-4"
          />
        </div>
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-medium text-shop-text line-clamp-2 group-hover:text-shop-blue transition-colors">
              {product.title}
            </h3>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold text-shop-text flex items-center">
              {formatINR(priceInINR)}
            </span>
            <button
              onClick={handleAddToCart}
              className="p-2 rounded-full bg-shop-gray hover:bg-shop-blue hover:text-white transition-colors"
              aria-label="Add to cart"
            >
              <ShoppingCart size={18} />
            </button>
          </div>
          <div className="mt-2">
            <span className="inline-block px-2 py-1 text-xs bg-shop-gray rounded-full text-shop-text-light capitalize">
              {product.category}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
