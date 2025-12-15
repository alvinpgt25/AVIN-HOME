import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { 
  FaShoppingCart, 
  FaUser, 
  FaSearch, 
  FaBars, 
  FaTimes,
  FaHeart,
  FaHome,
  FaBox,
  FaChartBar,
  FaSignOutAlt,
  FaArrowRight,
  FaCouch,
  FaStar
} from 'react-icons/fa';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { user, logout } = useAuth();
  const { getItemCount } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const cartItemCount = getItemCount();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    setIsSearchOpen(false);
  }, [location.pathname]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setIsSearchOpen(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const adminMenu = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: <FaHome /> },
    { path: '/admin/products', label: 'Produk', icon: <FaBox /> },
    { path: '/admin/sales', label: 'Laporan', icon: <FaChartBar /> },
  ];

  const customerMenu = [
    { path: '/', label: 'Beranda', icon: <FaHome /> },
    { path: '/products', label: 'Produk', icon: <FaBox /> },
    { path: '/cart', label: 'Keranjang', icon: <FaShoppingCart /> },
    { path: '/checkout', label: 'Checkout', icon: <FaArrowRight /> },
  ];

  const quickSearchTerms = ['Sofa', 'Meja Makan', 'Tempat Tidur', 'Lemari', 'Kursi', 'Lampu', 'Dapur'];

  return (
    <>
      <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container">
          <div className="header-content">
            {/* Logo */}
            <div className="logo">
              <Link to="/" className="logo-link">
                <div className="logo-icon-container">
                  <div className="logo-icon">
                    <FaCouch className="couch-icon" />
                    <div className="logo-sparkle">
                      <FaStar className="sparkle-star" />
                    </div>
                  </div>
                  <div className="logo-glow"></div>
                </div>
                <div className="logo-text">
                  <h1 className="logo-title">
                    <span className="logo-avin">AVIN</span>
                    <span className="logo-home">HOME</span>
                  </h1>
                  <p className="tagline">Rumah Impian, Nyata dalam Genggaman</p>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="nav-desktop">
              <ul className="nav-list">
                <li><Link to="/" className="nav-link">Beranda</Link></li>
                <li><Link to="/products" className="nav-link">Produk</Link></li>
                <li><Link to="/about" className="nav-link">Tentang</Link></li>
                <li><Link to="/contact" className="nav-link">Kontak</Link></li>
                {user?.role === 'admin' && (
                  <li className="nav-dropdown">
                    <span className="nav-link">Admin</span>
                    <div className="dropdown-menu">
                      {adminMenu.map((item) => (
                        <Link key={item.path} to={item.path} className="dropdown-item">
                          {item.icon}
                          <span>{item.label}</span>
                        </Link>
                      ))}
                    </div>
                  </li>
                )}
              </ul>
            </nav>

            {/* Header Actions */}
            <div className="header-actions">
              {/* Search Toggle */}
              <button 
                className="action-btn search-toggle"
                onClick={() => setIsSearchOpen(true)}
                aria-label="Search"
              >
                <FaSearch />
              </button>

              {/* Cart */}
              <Link to="/cart" className="action-btn cart-btn">
                <FaShoppingCart />
                {cartItemCount > 0 && (
                  <span className="cart-badge">{cartItemCount}</span>
                )}
              </Link>

              {/* User Menu */}
              <div className="user-menu">
                <button className="action-btn user-btn">
                  <FaUser />
                </button>
                <div className="user-dropdown">
                  {user ? (
                    <>
                      <div className="user-info">
                        <div className="user-avatar">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="user-details">
                          <h4>{user.name}</h4>
                          <p className="user-role">{user.role === 'admin' ? 'Administrator' : 'Customer'}</p>
                        </div>
                      </div>
                      <div className="dropdown-divider"></div>
                      {user.role === 'admin' && (
                        <>
                          {adminMenu.map((item) => (
                            <Link key={item.path} to={item.path} className="dropdown-item">
                              {item.icon}
                              <span>{item.label}</span>
                            </Link>
                          ))}
                          <div className="dropdown-divider"></div>
                        </>
                      )}
                      <Link to="/profile" className="dropdown-item">
                        <FaUser />
                        <span>Profil Saya</span>
                      </Link>
                      <button onClick={handleLogout} className="dropdown-item logout">
                        <FaSignOutAlt />
                        <span>Keluar</span>
                      </button>
                    </>
                  ) : (
                    <>
                      <Link to="/login" className="dropdown-item">
                        <FaUser />
                        <span>Masuk</span>
                      </Link>
                      <Link to="/register" className="dropdown-item">
                        <FaUser />
                        <span>Daftar</span>
                      </Link>
                    </>
                  )}
                </div>
              </div>

              {/* Mobile Menu Toggle */}
              <button 
                className="mobile-toggle"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Menu"
              >
                {isMenuOpen ? <FaTimes /> : <FaBars />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Sidebar Navigation */}
        <div className={`mobile-sidebar ${isMenuOpen ? 'open' : ''}`}>
          <div className="mobile-sidebar-header">
            <div className="mobile-user-info">
              {user ? (
                <>
                  <div className="mobile-user-avatar">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h4>{user.name}</h4>
                    <p>{user.role === 'admin' ? 'Administrator' : 'Customer'}</p>
                  </div>
                </>
              ) : (
                <div className="mobile-auth-buttons">
                  <Link to="/login" className="btn btn-primary" onClick={() => setIsMenuOpen(false)}>Masuk</Link>
                  <Link to="/register" className="btn btn-secondary" onClick={() => setIsMenuOpen(false)}>Daftar</Link>
                </div>
              )}
            </div>
            <button className="close-sidebar" onClick={() => setIsMenuOpen(false)}>
              <FaTimes />
            </button>
          </div>

          <nav className="mobile-sidebar-nav">
            {customerMenu.map((item) => (
              <Link 
                key={item.path} 
                to={item.path} 
                className="mobile-nav-item"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="mobile-nav-icon">{item.icon}</span>
                <span className="mobile-nav-label">{item.label}</span>
              </Link>
            ))}
            
            <Link to="/about" className="mobile-nav-item" onClick={() => setIsMenuOpen(false)}>
              <span className="mobile-nav-icon">ℹ️</span>
              <span className="mobile-nav-label">Tentang Kami</span>
            </Link>
            
            <Link to="/contact" className="mobile-nav-item" onClick={() => setIsMenuOpen(false)}>
              <span className="mobile-nav-icon">📞</span>
              <span className="mobile-nav-label">Kontak</span>
            </Link>
            
            {user?.role === 'admin' && (
              <>
                <div className="mobile-nav-divider">Admin Panel</div>
                {adminMenu.map((item) => (
                  <Link 
                    key={item.path} 
                    to={item.path} 
                    className="mobile-nav-item admin"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="mobile-nav-icon">{item.icon}</span>
                    <span className="mobile-nav-label">{item.label}</span>
                  </Link>
                ))}
              </>
            )}
          </nav>

          <div className="mobile-sidebar-footer">
            {user && (
              <button onClick={() => { handleLogout(); setIsMenuOpen(false); }} className="btn btn-secondary logout-btn">
                <FaSignOutAlt /> Keluar
              </button>
            )}
          </div>
        </div>

        {/* Overlay for mobile sidebar */}
        {isMenuOpen && (
          <div className="sidebar-overlay" onClick={() => setIsMenuOpen(false)}></div>
        )}
      </header>

      {/* Search Overlay */}
      {isSearchOpen && (
        <div className="search-overlay" onClick={() => setIsSearchOpen(false)}>
          <div className="search-modal" onClick={(e) => e.stopPropagation()}>
            <div className="search-modal-header">
              <h3>Cari Produk</h3>
              <button className="close-search" onClick={() => setIsSearchOpen(false)}>
                <FaTimes />
              </button>
            </div>
            
            <form onSubmit={handleSearch} className="search-modal-form">
              <div className="search-input-group">
                <FaSearch className="search-icon" />
                <input
                  type="text"
                  placeholder="Cari produk, kategori, atau brand..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="search-modal-input"
                />
                <button type="submit" className="search-modal-submit">
                  Cari
                </button>
              </div>
            </form>
            
            <div className="search-suggestions">
              <h4>Pencarian Populer</h4>
              <div className="suggestion-tags">
                {quickSearchTerms.map((term, index) => (
                  <button 
                    key={index}
                    type="button"
                    onClick={() => {
                      setSearchQuery(term);
                      navigate(`/products?search=${encodeURIComponent(term)}`);
                      setIsSearchOpen(false);
                    }}
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;