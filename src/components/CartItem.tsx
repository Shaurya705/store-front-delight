
import { Minus, Plus, Trash2 } from 'lucide-react';
import { CartItem as CartItemType } from '../context/CartContext';
import { useCart } from '../context/CartContext';

interface CartItemProps {
  item: CartItemType;
}

const CartItem = ({ item }: CartItemProps) => {
  const { updateQuantity, removeItem } = useCart();

  const handleIncrement = () => {
    updateQuantity(item.id, item.quantity + 1);
  };

  const handleDecrement = () => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
    }
  };

  const handleRemove = () => {
    removeItem(item.id);
  };

  return (
    <div className="flex py-5 border-b border-gray-200">
      <div className="w-24 h-24 flex-shrink-0 bg-gray-50 rounded-md overflow-hidden">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-contain p-2"
        />
      </div>
      <div className="ml-4 flex-1 flex flex-col">
        <div>
          <div className="flex justify-between">
            <h3 className="text-base font-medium text-shop-text">
              {item.title}
            </h3>
            <p className="ml-4 text-base font-medium text-shop-text">
              ${(item.price * item.quantity).toFixed(2)}
            </p>
          </div>
          <p className="mt-1 text-sm text-shop-text-light line-clamp-2">
            {item.description}
          </p>
        </div>
        <div className="flex-1 flex items-end justify-between text-sm">
          <div className="flex items-center">
            <button
              onClick={handleDecrement}
              className="p-1 rounded-md hover:bg-shop-gray"
              disabled={item.quantity <= 1}
            >
              <Minus size={16} className={item.quantity <= 1 ? "text-gray-300" : "text-shop-text"} />
            </button>
            <span className="mx-2 w-8 text-center text-shop-text">{item.quantity}</span>
            <button
              onClick={handleIncrement}
              className="p-1 rounded-md hover:bg-shop-gray"
            >
              <Plus size={16} className="text-shop-text" />
            </button>
          </div>

          <button
            onClick={handleRemove}
            className="text-shop-text-light hover:text-red-500 flex items-center"
          >
            <Trash2 size={16} className="mr-1" />
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
