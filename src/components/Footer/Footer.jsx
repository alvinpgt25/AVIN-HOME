import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaFacebook, 
  FaInstagram, 
  FaTwitter, 
  FaYoutube,
  FaPhone, 
  FaEnvelope, 
  FaMapMarkerAlt,
  FaArrowUp,
  FaCreditCard,
  FaShieldAlt,
  FaHeadset
} from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      // Simulate subscription
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setEmail('');
      }, 3000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const paymentMethods = [
    { name: 'Visa', icon: '💳' },
    { name: 'Mastercard', icon: '💳' },
    { name: 'PayPal', icon: '💰' },
    { name: 'Bank Transfer', icon: '🏦' },
    { name: 'OVO', icon: '📱' },
    { name: 'GoPay', icon: '📱' },
    { name: 'Dana', icon: '📱' }
  ];

  return (
    <footer className="footer">
      {/* Back to Top */}
      <button className="back-to-top" onClick={scrollToTop}>
        <FaArrowUp />
      </button>

      {/* Trust Badges */}
      <div className="trust-badges">
        <div className="container">
          <div className="badges-grid">
            <div className="trust-badge">
              <FaShieldAlt />
              <div>
                <h4>Garansi 2 Tahun</h4>
                <p>Produk Berkualitas</p>
              </div>
            </div>
            <div className="trust-badge">
              <FaCreditCard />
              <div>
                <h4>Pembayaran Aman</h4>
                <p>100% Terlindungi</p>
              </div>
            </div>
            <div className="trust-badge">
              <FaHeadset />
              <div>
                <h4>Support 24/7</h4>
                <p>Bantuan Cepat</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="footer-main">
        <div className="container">
          <div className="footer-grid">
            {/* Company Info */}
            <div className="footer-section company-info">
              <div className="footer-logo">
                <div className="logo-icon">🛋️</div>
                <div>
                  <h3>AVIN HOME</h3>
                  <p className="tagline">
                    Harmoni antara perhatian & visi untuk menciptakan rumah yang lebih nyaman.
                  </p>
                </div>
              </div>
              
              <div className="social-links">
                <a href="#" className="social-link" aria-label="Facebook">
                  <FaFacebook />
                </a>
                <a href="#" className="social-link" aria-label="Instagram">
                  <FaInstagram />
                </a>
                <a href="#" className="social-link" aria-label="Twitter">
                  <FaTwitter />
                </a>
                <a href="#" className="social-link" aria-label="YouTube">
                  <FaYoutube />
                </a>
              </div>
              
              <div className="newsletter">
                <h4>Berlangganan Newsletter</h4>
                <p>Dapatkan promo dan tips dekorasi terbaru</p>
                <form onSubmit={handleSubscribe} className="subscribe-form">
                  <input
                    type="email"
                    placeholder="Email Anda"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <button type="submit" className="btn btn-primary">
                    {subscribed ? 'Terima Kasih!' : 'Berlangganan'}
                  </button>
                </form>
              </div>
            </div>

            {/* Quick Links */}
            <div className="footer-section">
              <h4>Menu Cepat</h4>
              <ul className="footer-links">
                <li><Link to="/">Beranda</Link></li>
                <li><Link to="/products">Produk</Link></li>
                <li><Link to="/about">Tentang Kami</Link></li>
                <li><Link to="/contact">Kontak</Link></li>
                <li><Link to="/faq">FAQ</Link></li>
                <li><Link to="/blog">Blog & Tips</Link></li>
              </ul>
            </div>

            {/* Categories */}
            <div className="footer-section">
              <h4>Kategori</h4>
              <ul className="footer-links">
                <li><Link to="/products?category=living-room">Ruang Tamu</Link></li>
                <li><Link to="/products?category=bedroom">Kamar Tidur</Link></li>
                <li><Link to="/products?category=dining-room">Ruang Makan</Link></li>
                <li><Link to="/products?category=kitchen">Dapur</Link></li>
                <li><Link to="/products?category=office">Kantor</Link></li>
                <li><Link to="/products?category=decor">Dekorasi</Link></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="footer-section">
              <h4>Kontak Kami</h4>
              <ul className="contact-info">
                <li>
                  <FaMapMarkerAlt />
                  <span>Jl. Perabotan No. 123, Jakarta Selatan 12950</span>
                </li>
                <li>
                  <FaPhone />
                  <span>(021) 1234-5678</span>
                </li>
                <li>
                  <FaEnvelope />
                  <span>info@avinhome.com</span>
                </li>
              </ul>
              
              <div className="business-hours">
                <h5>Jam Operasional</h5>
                <p>Senin - Jumat: 08:00 - 17:00</p>
                <p>Sabtu: 09:00 - 15:00</p>
                <p>Minggu: Tutup</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="payment-methods">
        <div className="container">
          <h5>Metode Pembayaran</h5>
          <div className="payment-icons">
            {paymentMethods.map((method, index) => (
              <span key={index} className="payment-icon" title={method.name}>
                {method.icon}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <div className="container">
          <div className="footer-bottom-content">
            <p>&copy; {new Date().getFullYear()} AVIN HOME. Hak Cipta Dilindungi.</p>
            <div className="legal-links">
              <Link to="/privacy">Kebijakan Privasi</Link>
              <Link to="/terms">Syarat & Ketentuan</Link>
              <Link to="/return-policy">Kebijakan Pengembalian</Link>
              <Link to="/sitemap">Sitemap</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;