import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FaUser, FaLock, FaHome, FaStore } from 'react-icons/fa';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('customer');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const redirect = location.state?.from?.pathname || '/';

  useEffect(() => {
    if (user) {
      navigate(user.role === 'admin' ? '/admin/dashboard' : redirect);
    }
  }, [user, navigate, redirect]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      // Navigation will happen in the useEffect above
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = (type) => {
    if (type === 'customer') {
      setEmail('customer@example.com');
      setPassword('customer123');
      setUserType('customer');
    } else {
      setEmail('admin@avinhome.com');
      setPassword('admin123');
      setUserType('admin');
    }
  };

  return (
    <div className="login-page">
      <div className="container">
        <div className="login-content">
          <div className="login-header">
            <h1>Selamat Datang di AVIN HOME</h1>
            <p>Harmoni antara perhatian & visi untuk menciptakan rumah yang lebih nyaman.</p>
          </div>

          <div className="login-container">
            <div className="login-card">
              <div className="login-tabs">
                <button 
                  type="button"
                  className={`login-tab ${userType === 'customer' ? 'active' : ''}`}
                  onClick={() => setUserType('customer')}
                >
                  <FaUser /> Pelanggan
                </button>
                <button 
                  type="button"
                  className={`login-tab ${userType === 'admin' ? 'active' : ''}`}
                  onClick={() => setUserType('admin')}
                >
                  <FaStore /> Admin
                </button>
              </div>

              <form onSubmit={handleSubmit} className="login-form">
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <div className="input-with-icon">
                    <FaUser className="input-icon" />
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Masukkan email Anda"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <div className="input-with-icon">
                    <FaLock className="input-icon" />
                    <input
                      type="password"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Masukkan password Anda"
                      required
                    />
                  </div>
                </div>

                {error && (
                  <div className="error-message">
                    {error}
                  </div>
                )}

                <div className="form-options">
                  <label className="checkbox-label">
                    <input 
                      type="checkbox" 
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    <span>Ingat saya</span>
                  </label>
                  <a href="/forgot-password" className="forgot-password">
                    Lupa password?
                  </a>
                </div>

                <button 
                  type="submit" 
                  className="btn btn-primary login-btn"
                  disabled={loading}
                >
                  {loading ? 'Memproses...' : 'Masuk'}
                </button>

                <div className="demo-login">
                  <p>Login demo:</p>
                  <div className="demo-buttons">
                    <button 
                      type="button" 
                      className="btn btn-secondary"
                      onClick={() => handleDemoLogin('customer')}
                    >
                      <FaUser /> Pelanggan Demo
                    </button>
                    <button 
                      type="button" 
                      className="btn btn-secondary"
                      onClick={() => handleDemoLogin('admin')}
                    >
                      <FaStore /> Admin Demo
                    </button>
                  </div>
                </div>

                <div className="login-footer">
                  <p>
                    Belum punya akun?{' '}
                    <a href="/register" className="register-link">Daftar di sini</a>
                  </p>
                </div>
              </form>
            </div>

            <div className="login-info">
              <div className="info-card">
                <FaHome className="info-icon" />
                <h3>Mengapa AVIN HOME?</h3>
                <ul>
                  <li>Produk berkualitas premium</li>
                  <li>Garansi 2 tahun untuk semua produk</li>
                  <li>Pengiriman cepat dan aman</li>
                  <li>Dukungan pelanggan 24/7</li>
                  <li>Harga terbaik di kelasnya</li>
                </ul>
              </div>

              {userType === 'admin' && (
                <div className="admin-features">
                  <h4>Fitur Admin:</h4>
                  <ul>
                    <li>Kelola produk dan stok</li>
                    <li>Lihat laporan penjualan</li>
                    <li>Kelola pesanan pelanggan</li>
                    <li>Analisis bisnis lengkap</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;