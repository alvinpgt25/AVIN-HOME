import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaStar, FaShoppingCart, FaHeart, FaEye, FaCheck } from 'react-icons/fa';
import { useCart } from '../../context/CartContext';
import './ProductCard.css';

const ProductCard = ({ product, isLoading = false }) => {
  const { addToCart, cartItems } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  
  const finalPrice = product.discountPrice || product.price;
  const discountPercentage = product.discountPrice 
    ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
    : 0;
  
  const isInCart = cartItems.some(item => item.id === product.id);

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isAdding) return;
    
    setIsAdding(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    addToCart(product, 1);
    setIsAdded(true);
    setIsAdding(false);
    
    // Reset added state after 2 seconds
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  const handleQuickView = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // Implement quick view modal here
  };

  if (isLoading) {
    return (
      <div className="product-card skeleton">
        <div className="product-image"></div>
        <div className="product-info">
          <div className="product-name"></div>
          <div className="product-price"></div>
          <div className="product-rating"></div>
          <button className="add-to-cart-btn">Loading...</button>
        </div>
      </div>
    );
  }

  return (
    <div className="product-card animate-fadeIn">
      <div className="product-image">
        <img src={product.image} alt={product.name} loading="lazy" />
        
        {discountPercentage > 0 && (
          <div className="discount-badge animate-pulse">-{discountPercentage}%</div>
        )}
        
        <div className="quick-actions">
          <button 
            className="quick-action-btn"
            onClick={handleQuickView}
            aria-label="Quick view"
          >
            <FaEye /> Lihat
          </button>
          <button 
            className="quick-action-btn"
            onClick={handleWishlist}
            aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          >
            <FaHeart style={{ color: isWishlisted ? '#e53e3e' : 'inherit' }} /> 
            {isWishlisted ? 'Disukai' : 'Suka'}
          </button>
        </div>
      </div>
      
      <div className="product-info">
        <span className="product-category">{product.category}</span>
        
        <h3 className="product-name">
          <Link to={`/product/${product.id}`}>{product.name}</Link>
        </h3>
        
        <div className="product-rating">
          <div className="rating-stars">
            {[...Array(5)].map((_, index) => (
              <FaStar 
                key={index}
                className={index < Math.floor(product.rating) ? 'star-filled' : 'star-empty'}
              />
            ))}
          </div>
          <span className="rating-value">{product.rating.toFixed(1)}</span>
          <span className="rating-count">({product.reviewCount})</span>
        </div>
        
        <div className="product-price">
          <span className="current-price">Rp {finalPrice.toLocaleString()}</span>
          {product.discountPrice && (
            <span className="original-price">Rp {product.price.toLocaleString()}</span>
          )}
        </div>
        
        <div className="product-stock">
          <span className={`stock-indicator ${product.stock > 0 ? 'in-stock' : 'out-stock'}`}></span>
          <span className="stock-text">
            {product.stock > 0 ? `${product.stock} tersedia` : 'Stok habis'}
          </span>
        </div>
        
        <button 
          className={`add-to-cart-btn ${isAdded ? 'added' : ''} ${isAdding ? 'loading' : ''}`}
          onClick={handleAddToCart}
          disabled={product.stock <= 0 || isAdding || isAdded}
        >
          {isAdding ? (
            <>
              <span className="btn-spinner"></span>
              Menambahkan...
            </>
          ) : isAdded || isInCart ? (
            <>
              <FaCheck /> Ditambahkan
            </>
          ) : product.stock <= 0 ? (
            'Stok Habis'
          ) : (
            <>
              <FaShoppingCart /> Tambah ke Keranjang
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;