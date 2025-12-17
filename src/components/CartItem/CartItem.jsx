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
    if (window.confirm(`Hapus "${item.name}" dari keranjang?`)) {
      removeFromCart(item.id);
    }
  };

  return (
    <div className="cart-item">
      <div className="cart-item-top">
        <div className="cart-item-image">
          <img 
            src={item.image || '/default-product.jpg'} 
            alt={item.name} 
            loading="lazy"
          />
        </div>
        
        <div className="cart-item-info">
          <h3 className="cart-item-name">{item.name}</h3>
          <p className="cart-item-description">{item.description}</p>
          
          <div className="cart-item-price-container">
            <span className="cart-item-price-current">Rp {finalPrice.toLocaleString('id-ID')}</span>
            {item.discountPrice && item.discountPrice < item.price && (
              <span className="cart-item-price-original">Rp {item.price.toLocaleString('id-ID')}</span>
            )}
          </div>
        </div>
      </div>
      
      <div className="cart-item-bottom">
        <div className="cart-item-quantity">
          <div className="quantity-controls">
            <button 
              className="quantity-btn" 
              onClick={handleDecrement}
              aria-label="Kurangi jumlah"
              disabled={item.quantity <= 1}
              title="Kurangi"
            >
              <FaMinus />
            </button>
            
            <span className="quantity-display">{item.quantity}</span>
            
            <button 
              className="quantity-btn" 
              onClick={handleIncrement}
              aria-label="Tambah jumlah"
              title="Tambah"
            >
              <FaPlus />
            </button>
          </div>
        </div>
        
        <div className="cart-item-total">
          <span className="cart-item-total-label">Subtotal:</span>
          <span className="cart-item-total-price">Rp {totalPrice.toLocaleString('id-ID')}</span>
        </div>
        
        <div className="cart-item-actions">
          <button 
            className="remove-btn" 
            onClick={handleRemove}
            aria-label="Hapus item"
            title="Hapus dari keranjang"
          >
            <FaTrash />
            <span className="remove-btn-text">Hapus</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;