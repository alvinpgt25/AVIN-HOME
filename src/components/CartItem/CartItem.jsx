import React from 'react';
import { FaTrash, FaMinus, FaPlus } from 'react-icons/fa';
import { useCart } from '../../context/CartContext';
import './CartItem.css';

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();
  const finalPrice = item.discountPrice || item.price;
  const totalPrice = finalPrice * item.quantity;

  const handleIncrement = () => {
    updateQuantity(item.id, item.quantity + 1);
  };

  const handleDecrement = () => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
    }
  };

  const handleRemove = () => {
    removeFromCart(item.id);
  };

  return (
    <div className="cart-item">
      <div className="cart-item-image">
        <img src={item.image} alt={item.name} />
      </div>
      
      <div className="cart-item-info">
        <h3 className="cart-item-name">{item.name}</h3>
        <p className="cart-item-description">{item.description}</p>
        
        <div className="cart-item-price">
          <span className="current-price">Rp {finalPrice.toLocaleString()}</span>
          {item.discountPrice && (
            <span className="original-price">Rp {item.price.toLocaleString()}</span>
          )}
        </div>
      </div>
      
      <div className="cart-item-quantity">
        <button 
          className="quantity-btn" 
          onClick={handleDecrement}
          aria-label="Kurangi jumlah"
        >
          <FaMinus />
        </button>
        
        <span className="quantity">{item.quantity}</span>
        
        <button 
          className="quantity-btn" 
          onClick={handleIncrement}
          aria-label="Tambah jumlah"
        >
          <FaPlus />
        </button>
      </div>
      
      <div className="cart-item-total">
        <span className="total-price">Rp {totalPrice.toLocaleString()}</span>
      </div>
      
      <div className="cart-item-actions">
        <button 
          className="remove-btn" 
          onClick={handleRemove}
          aria-label="Hapus item"
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
};

export default CartItem;