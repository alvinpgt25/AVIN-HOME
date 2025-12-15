import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { FaLock, FaCreditCard, FaTruck, FaCheckCircle, FaShoppingBag, FaArrowLeft, FaHome, FaShoppingCart } from 'react-icons/fa';
import './Checkout.css';

const Checkout = () => {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  
  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
    city: '',
    province: '',
    postalCode: '',
    notes: ''
  });

  const [errors, setErrors] = useState({});

  const subtotal = getCartTotal();
  const shippingFee = subtotal > 2000000 ? 0 : 50000;
  const tax = subtotal * 0.11;
  const total = subtotal + shippingFee + tax;

  const provinces = [
    'DKI Jakarta', 'Jawa Barat', 'Jawa Tengah', 'Jawa Timur', 'Bali',
    'Sumatera Utara', 'Sumatera Selatan', 'Kalimantan Timur', 'Sulawesi Selatan'
  ];

  useEffect(() => {
    if (cartItems.length === 0 && !orderComplete) {
      // Jika keranjang kosong dan belum selesai order, tetap di halaman checkout
      // tapi tampilkan pesan
    }
  }, [cartItems.length, orderComplete]);

  const validateStep1 = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) newErrors.fullName = 'Nama lengkap wajib diisi';
    if (!formData.email.trim()) newErrors.email = 'Email wajib diisi';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email tidak valid';
    if (!formData.phone.trim()) newErrors.phone = 'Nomor telepon wajib diisi';
    if (!formData.address.trim()) newErrors.address = 'Alamat wajib diisi';
    if (!formData.city.trim()) newErrors.city = 'Kota wajib diisi';
    if (!formData.province) newErrors.province = 'Provinsi wajib dipilih';
    if (!formData.postalCode.trim()) newErrors.postalCode = 'Kode pos wajib diisi';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleNextStep = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    }
  };

  const handlePrevStep = () => {
    setStep(step - 1);
  };

  const handleSubmitOrder = () => {
    const newOrderNumber = `ORD-${Date.now().toString().slice(-8)}`;
    setOrderNumber(newOrderNumber);
    setOrderComplete(true);
    
    setTimeout(() => {
      clearCart();
    }, 3000);
  };

  // Jika keranjang kosong dan belum selesai order
  if (cartItems.length === 0 && !orderComplete) {
    return (
      <div className="empty-checkout-page">
        <div className="container">
          <div className="empty-checkout-content">
            <div className="empty-checkout-icon">
              <FaShoppingBag />
            </div>
            <h2>Keranjang Belanja Kosong</h2>
            <p>Tambahkan produk terlebih dahulu sebelum melanjutkan ke checkout</p>
            <div className="empty-checkout-actions">
              <button onClick={() => navigate('/products')} className="btn btn-primary">
                <FaShoppingCart style={{ marginRight: '10px' }} />
                Lihat Produk
              </button>
              <button onClick={() => navigate('/')} className="btn btn-secondary">
                <FaHome style={{ marginRight: '10px' }} />
                Kembali ke Beranda
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (orderComplete) {
    return (
      <div className="order-complete">
        <div className="container">
          <div className="success-content">
            <FaCheckCircle className="success-icon" />
            <h2>Pesanan Berhasil!</h2>
            <p className="order-number">Nomor Pesanan: {orderNumber}</p>
            <p className="success-message">
              Terima kasih telah berbelanja di AVIN HOME. Kami telah mengirimkan konfirmasi 
              pesanan ke email {formData.email}. Pesanan Anda akan diproses dalam 1x24 jam.
            </p>
            <div className="success-actions">
              <button onClick={() => navigate('/')} className="btn btn-primary">
                <FaHome style={{ marginRight: '10px' }} />
                Kembali ke Beranda
              </button>
              <button onClick={() => navigate('/products')} className="btn btn-secondary">
                <FaShoppingCart style={{ marginRight: '10px' }} />
                Lanjutkan Belanja
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Checkout</h1>
          <p className="page-subtitle">Langkah terakhir untuk mendapatkan produk impian Anda</p>
        </div>

        {/* Checkout Steps */}
        <div className="checkout-steps">
          <div className={`step ${step >= 1 ? 'active' : ''}`}>
            <div className="step-number">1</div>
            <div className="step-info">
              <h3>Informasi Pengiriman</h3>
              <p>Lengkapi data diri Anda</p>
            </div>
          </div>
          
          <div className={`step ${step >= 2 ? 'active' : ''}`}>
            <div className="step-number">2</div>
            <div className="step-info">
              <h3>Metode Pembayaran</h3>
              <p>Pilih cara pembayaran</p>
            </div>
          </div>
          
          <div className={`step ${step >= 3 ? 'active' : ''}`}>
            <div className="step-number">3</div>
            <div className="step-info">
              <h3>Konfirmasi Pesanan</h3>
              <p>Review dan selesaikan</p>
            </div>
          </div>
        </div>

        <div className="checkout-content">
          <div className="checkout-form-section">
            {/* Step 1: Shipping Information */}
            {step === 1 && (
              <div className="form-step">
                <h2 className="form-title">Informasi Pengiriman</h2>
                
                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="fullName">Nama Lengkap *</label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className={errors.fullName ? 'error' : ''}
                      placeholder="Masukkan nama lengkap"
                    />
                    {errors.fullName && <span className="error-message">{errors.fullName}</span>}
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="email">Email *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={errors.email ? 'error' : ''}
                      placeholder="contoh@email.com"
                    />
                    {errors.email && <span className="error-message">{errors.email}</span>}
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="phone">Nomor Telepon *</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={errors.phone ? 'error' : ''}
                      placeholder="081234567890"
                    />
                    {errors.phone && <span className="error-message">{errors.phone}</span>}
                  </div>
                  
                  <div className="form-group full-width">
                    <label htmlFor="address">Alamat Lengkap *</label>
                    <textarea
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className={errors.address ? 'error' : ''}
                      placeholder="Jl. Contoh No. 123, RT/RW, Kelurahan"
                      rows="3"
                    />
                    {errors.address && <span className="error-message">{errors.address}</span>}
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="city">Kota *</label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className={errors.city ? 'error' : ''}
                      placeholder="Nama kota"
                    />
                    {errors.city && <span className="error-message">{errors.city}</span>}
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="province">Provinsi *</label>
                    <select
                      id="province"
                      name="province"
                      value={formData.province}
                      onChange={handleInputChange}
                      className={errors.province ? 'error' : ''}
                    >
                      <option value="">Pilih Provinsi</option>
                      {provinces.map(province => (
                        <option key={province} value={province}>{province}</option>
                      ))}
                    </select>
                    {errors.province && <span className="error-message">{errors.province}</span>}
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="postalCode">Kode Pos *</label>
                    <input
                      type="text"
                      id="postalCode"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      className={errors.postalCode ? 'error' : ''}
                      placeholder="12345"
                    />
                    {errors.postalCode && <span className="error-message">{errors.postalCode}</span>}
                  </div>
                  
                  <div className="form-group full-width">
                    <label htmlFor="notes">Catatan (Opsional)</label>
                    <textarea
                      id="notes"
                      name="notes"
                      value={formData.notes}
                      onChange={handleInputChange}
                      placeholder="Catatan tambahan untuk pengiriman"
                      rows="2"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Payment Method */}
            {step === 2 && (
              <div className="form-step">
                <h2 className="form-title">Metode Pembayaran</h2>
                
                <div className="payment-methods">
                  <div 
                    className={`payment-method ${paymentMethod === 'credit-card' ? 'selected' : ''}`}
                    onClick={() => setPaymentMethod('credit-card')}
                  >
                    <div className="payment-icon">
                      <FaCreditCard />
                    </div>
                    <div className="payment-info">
                      <h4>Kartu Kredit/Debit</h4>
                      <p>Visa, Mastercard, JCB</p>
                    </div>
                    <div className="payment-check"></div>
                  </div>
                  
                  <div 
                    className={`payment-method ${paymentMethod === 'bank-transfer' ? 'selected' : ''}`}
                    onClick={() => setPaymentMethod('bank-transfer')}
                  >
                    <div className="payment-icon">🏦</div>
                    <div className="payment-info">
                      <h4>Transfer Bank</h4>
                      <p>BCA, Mandiri, BRI, BNI</p>
                    </div>
                    <div className="payment-check"></div>
                  </div>
                  
                  <div 
                    className={`payment-method ${paymentMethod === 'e-wallet' ? 'selected' : ''}`}
                    onClick={() => setPaymentMethod('e-wallet')}
                  >
                    <div className="payment-icon">📱</div>
                    <div className="payment-info">
                      <h4>E-Wallet</h4>
                      <p>OVO, GoPay, Dana, LinkAja</p>
                    </div>
                    <div className="payment-check"></div>
                  </div>
                  
                  <div 
                    className={`payment-method ${paymentMethod === 'cod' ? 'selected' : ''}`}
                    onClick={() => setPaymentMethod('cod')}
                  >
                    <div className="payment-icon">
                      <FaTruck />
                    </div>
                    <div className="payment-info">
                      <h4>COD (Cash on Delivery)</h4>
                      <p>Bayar saat barang sampai</p>
                    </div>
                    <div className="payment-check"></div>
                  </div>
                </div>

                {/* Payment Details */}
                {paymentMethod === 'credit-card' && (
                  <div className="payment-details">
                    <h4>Detail Kartu</h4>
                    <div className="form-grid">
                      <div className="form-group">
                        <label>Nomor Kartu</label>
                        <input type="text" placeholder="1234 5678 9012 3456" />
                      </div>
                      <div className="form-group">
                        <label>Nama di Kartu</label>
                        <input type="text" placeholder="Nama pemilik kartu" />
                      </div>
                      <div className="form-group">
                        <label>Tanggal Kadaluarsa</label>
                        <input type="text" placeholder="MM/YY" />
                      </div>
                      <div className="form-group">
                        <label>CVV</label>
                        <input type="text" placeholder="123" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Step 3: Order Review */}
            {step === 3 && (
              <div className="form-step">
                <h2 className="form-title">Konfirmasi Pesanan</h2>
                
                <div className="order-review">
                  <div className="review-section">
                    <h4>Informasi Pengiriman</h4>
                    <div className="review-info">
                      <p><strong>{formData.fullName}</strong></p>
                      <p>{formData.address}</p>
                      <p>{formData.city}, {formData.province} {formData.postalCode}</p>
                      <p>{formData.phone}</p>
                      <p>{formData.email}</p>
                    </div>
                  </div>
                  
                  <div className="review-section">
                    <h4>Metode Pembayaran</h4>
                    <div className="review-info">
                      <p><strong>
                        {paymentMethod === 'credit-card' && 'Kartu Kredit/Debit'}
                        {paymentMethod === 'bank-transfer' && 'Transfer Bank'}
                        {paymentMethod === 'e-wallet' && 'E-Wallet'}
                        {paymentMethod === 'cod' && 'COD (Cash on Delivery)'}
                      </strong></p>
                    </div>
                  </div>
                  
                  <div className="review-section">
                    <h4>Pesanan Anda</h4>
                    <div className="order-items">
                      {cartItems.map(item => (
                        <div key={item.id} className="order-item">
                          <div className="item-info">
                            <span className="item-name">{item.name}</span>
                            <span className="item-quantity">x{item.quantity}</span>
                          </div>
                          <span className="item-total">
                            Rp {((item.discountPrice || item.price) * item.quantity).toLocaleString()}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="secure-checkout">
                    <FaLock />
                    <span>Transaksi Anda aman dan terenkripsi</span>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="form-navigation">
              {step > 1 && (
                <button onClick={handlePrevStep} className="btn btn-secondary">
                  Kembali
                </button>
              )}
              
              {step < 3 ? (
                <button onClick={handleNextStep} className="btn btn-primary">
                  Lanjut
                </button>
              ) : (
                <button onClick={handleSubmitOrder} className="btn btn-success">
                  <FaLock /> Bayar Sekarang
                </button>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="order-summary">
            <div className="summary-card">
              <h3>Ringkasan Pesanan</h3>
              
              <div className="order-items-preview">
                {cartItems.slice(0, 3).map(item => (
                  <div key={item.id} className="preview-item">
                    <img src={item.image} alt={item.name} />
                    <div className="preview-info">
                      <span className="preview-name">{item.name}</span>
                      <span className="preview-price">
                        {item.quantity} x Rp {(item.discountPrice || item.price).toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))}
                
                {cartItems.length > 3 && (
                  <div className="more-items">
                    +{cartItems.length - 3} produk lainnya
                  </div>
                )}
              </div>
              
              <div className="summary-totals">
                <div className="total-row">
                  <span>Subtotal</span>
                  <span>Rp {subtotal.toLocaleString()}</span>
                </div>
                <div className="total-row">
                  <span>Pengiriman</span>
                  <span className={shippingFee === 0 ? 'free' : ''}>
                    {shippingFee === 0 ? 'Gratis' : `Rp ${shippingFee.toLocaleString()}`}
                  </span>
                </div>
                <div className="total-row">
                  <span>PPN (11%)</span>
                  <span>Rp {tax.toLocaleString()}</span>
                </div>
                <div className="total-divider"></div>
                <div className="total-row grand-total">
                  <strong>Total</strong>
                  <strong>Rp {total.toLocaleString()}</strong>
                </div>
              </div>
              
              <div className="summary-footer">
                <p>
                  <FaLock /> Pembayaran aman dengan enkripsi 256-bit
                </p>
                <p>
                  Dengan melanjutkan, Anda menyetujui Syarat & Ketentuan kami
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;