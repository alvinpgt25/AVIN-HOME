import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProducts } from '../../context/ProductsContext';
import { useCart } from '../../context/CartContext';
import { FaStar, FaShoppingCart, FaTruck, FaShieldAlt, FaArrowLeft } from 'react-icons/fa';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProductById } = useProducts();
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('description');

  useEffect(() => {
    const fetchProduct = () => {
      setLoading(true);
      const foundProduct = getProductById(id);
      
      if (foundProduct) {
        setProduct(foundProduct);
        setSelectedImage(foundProduct.image);
      }
      
      setLoading(false);
    };

    fetchProduct();
  }, [id, getProductById]);

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= (product?.stock || 10)) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      // Show success message
      alert(`${product.name} telah ditambahkan ke keranjang!`);
    }
  };

  const handleBuyNow = () => {
    if (product) {
      addToCart(product, quantity);
      navigate('/cart');
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-not-found">
        <h2>Produk tidak ditemukan</h2>
        <button onClick={() => navigate('/products')} className="btn btn-primary">
          <FaArrowLeft /> Kembali ke Produk
        </button>
      </div>
    );
  }

  const finalPrice = product.discountPrice || product.price;
  const discountPercentage = product.discountPrice 
    ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
    : 0;

  return (
    <div className="product-detail">
      <div className="container">
        <button 
          onClick={() => navigate(-1)}
          className="back-btn"
        >
          <FaArrowLeft /> Kembali
        </button>

        <div className="product-detail-content">
          {/* Product Images */}
          <div className="product-images">
            <div className="main-image">
              <img src={selectedImage} alt={product.name} />
            </div>
            <div className="thumbnail-images">
              <img
                src={product.image}
                alt={`${product.name} utama`}
                className={`thumbnail ${selectedImage === product.image ? 'active' : ''}`}
                onClick={() => setSelectedImage(product.image)}
              />
              {product.images?.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`${product.name} ${index + 2}`}
                  className={`thumbnail ${selectedImage === img ? 'active' : ''}`}
                  onClick={() => setSelectedImage(img)}
                />
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="product-info">
            <div className="product-header">
              <h1 className="product-title">{product.name}</h1>
              <div className="product-rating">
                <div className="stars">
                  {[...Array(5)].map((_, index) => (
                    <FaStar 
                      key={index}
                      className={index < Math.floor(product.rating) ? 'star-filled' : 'star-empty'}
                    />
                  ))}
                </div>
                <span className="rating-value">{product.rating.toFixed(1)}</span>
                <span className="review-count">({product.reviewCount} ulasan)</span>
              </div>
            </div>

            <div className="product-price-section">
              {discountPercentage > 0 && (
                <span className="discount-badge">-{discountPercentage}%</span>
              )}
              <div className="price-container">
                <span className="current-price">Rp {finalPrice.toLocaleString()}</span>
                {product.discountPrice && (
                  <span className="original-price">Rp {product.price.toLocaleString()}</span>
                )}
              </div>
            </div>

            <div className="product-description">
              <p>{product.description}</p>
            </div>

            <div className="product-features">
              <div className="feature">
                <FaTruck />
                <span>Gratis Ongkir</span>
              </div>
              <div className="feature">
                <FaShieldAlt />
                <span>Garansi 2 Tahun</span>
              </div>
            </div>

            <div className="product-actions">
              <div className="quantity-selector">
                <button 
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                  className="quantity-btn"
                >
                  -
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => {
                    const value = parseInt(e.target.value);
                    if (!isNaN(value) && value >= 1 && value <= product.stock) {
                      setQuantity(value);
                    }
                  }}
                  min="1"
                  max={product.stock}
                  className="quantity-input"
                />
                <button 
                  onClick={() => handleQuantityChange(1)}
                  disabled={quantity >= product.stock}
                  className="quantity-btn"
                >
                  +
                </button>
              </div>

              <div className="stock-info">
                Stok: <span className={`stock-amount ${product.stock > 0 ? 'in-stock' : 'out-of-stock'}`}>
                  {product.stock > 0 ? `${product.stock} tersedia` : 'Habis'}
                </span>
              </div>

              <div className="action-buttons">
                <button 
                  className="btn btn-secondary add-cart-btn"
                  onClick={handleAddToCart}
                  disabled={product.stock <= 0}
                >
                  <FaShoppingCart /> Tambah ke Keranjang
                </button>
                <button 
                  className="btn btn-primary buy-now-btn"
                  onClick={handleBuyNow}
                  disabled={product.stock <= 0}
                >
                  Beli Sekarang
                </button>
              </div>
            </div>

            <div className="product-meta">
              <div className="meta-item">
                <strong>Kategori:</strong>
                <span>{product.category}</span>
              </div>
              <div className="meta-item">
                <strong>SKU:</strong>
                <span>AVIN-{product.id.toString().padStart(3, '0')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Tabs */}
        <div className="product-tabs">
          <div className="tab-headers">
            <button 
              className={`tab-header ${activeTab === 'description' ? 'active' : ''}`}
              onClick={() => setActiveTab('description')}
            >
              Deskripsi
            </button>
            <button 
              className={`tab-header ${activeTab === 'details' ? 'active' : ''}`}
              onClick={() => setActiveTab('details')}
            >
              Detail Produk
            </button>
            <button 
              className={`tab-header ${activeTab === 'reviews' ? 'active' : ''}`}
              onClick={() => setActiveTab('reviews')}
            >
              Ulasan ({product.reviewCount})
            </button>
          </div>

          <div className="tab-content">
            {activeTab === 'description' && (
              <div className="description-content">
                <p>{product.description}</p>
                <ul>
                  <li>Bahan berkualitas tinggi untuk ketahanan maksimal</li>
                  <li>Desain ergonomis untuk kenyamanan penggunaan</li>
                  <li>Proses produksi ramah lingkungan</li>
                  <li>Mudah dipasang dan dirawat</li>
                </ul>
              </div>
            )}

            {activeTab === 'details' && (
              <div className="details-content">
                <table>
                  <tbody>
                    <tr>
                      <td><strong>Dimensi</strong></td>
                      <td>180x90x75 cm</td>
                    </tr>
                    <tr>
                      <td><strong>Material</strong></td>
                      <td>Kayu jati solid dengan finishing premium</td>
                    </tr>
                    <tr>
                      <td><strong>Warna</strong></td>
                      <td>Natural, Dark Oak, Walnut</td>
                    </tr>
                    <tr>
                      <td><strong>Berat</strong></td>
                      <td>45 kg</td>
                    </tr>
                    <tr>
                      <td><strong>Garansi</strong></td>
                      <td>2 tahun untuk material dan pengerjaan</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="reviews-content">
                <div className="reviews-summary">
                  <div className="average-rating">
                    <h3>{product.rating.toFixed(1)}</h3>
                    <div className="stars">
                      {[...Array(5)].map((_, index) => (
                        <FaStar 
                          key={index}
                          className={index < Math.floor(product.rating) ? 'star-filled' : 'star-empty'}
                        />
                      ))}
                    </div>
                    <p>{product.reviewCount} ulasan</p>
                  </div>
                </div>

                <div className="review-list">
                  <div className="review-item">
                    <div className="review-header">
                      <div className="reviewer">
                        <strong>Budi Santoso</strong>
                        <div className="stars">
                          <FaStar className="star-filled" />
                          <FaStar className="star-filled" />
                          <FaStar className="star-filled" />
                          <FaStar className="star-filled" />
                          <FaStar className="star-filled" />
                        </div>
                      </div>
                      <span className="review-date">2 minggu lalu</span>
                    </div>
                    <p className="review-text">
                      Produk sangat bagus, kualitas sesuai dengan harga. Pengiriman cepat dan packing aman.
                    </p>
                  </div>

                  <div className="review-item">
                    <div className="review-header">
                      <div className="reviewer">
                        <strong>Sari Wijaya</strong>
                        <div className="stars">
                          <FaStar className="star-filled" />
                          <FaStar className="star-filled" />
                          <FaStar className="star-filled" />
                          <FaStar className="star-filled" />
                          <FaStar className="star-empty" />
                        </div>
                      </div>
                      <span className="review-date">1 bulan lalu</span>
                    </div>
                    <p className="review-text">
                      Desainnya elegan dan cocok dengan ruang makan kami. Hanya saja warna sedikit berbeda dengan foto.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;ProductDetail.css