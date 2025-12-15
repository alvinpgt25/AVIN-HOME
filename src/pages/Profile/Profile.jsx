import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  FaUser, 
  FaEnvelope, 
  FaPhone, 
  FaMapMarkerAlt,
  FaEdit,
  FaSave,
  FaHistory,
  FaBox,
  FaTruck,
  FaCheckCircle,
  FaTimesCircle,
  FaCalendarAlt,
  FaShoppingBag,
  FaCreditCard,
  FaArrowRight,
  FaStar
} from 'react-icons/fa';
import './Profile.css';

const Profile = () => {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || ''
  });
  const [errors, setErrors] = useState({});

  const orders = [
    {
      id: 'ORD-001',
      date: '15 Maret 2024',
      items: [
        { name: 'Sofa Minimalis Velvet', quantity: 1, price: 3999000 },
        { name: 'Meja Kopi Marble', quantity: 1, price: 1599000 }
      ],
      total: 5598000,
      status: 'completed',
      tracking: 'DEL-123456789'
    },
    {
      id: 'ORD-002',
      date: '10 Maret 2024',
      items: [
        { name: 'Kursi Kerja Ergonomis', quantity: 2, price: 1599000 }
      ],
      total: 3198000,
      status: 'shipped',
      tracking: 'DEL-987654321'
    },
    {
      id: 'ORD-003',
      date: '5 Maret 2024',
      items: [
        { name: 'Lemari Pakaian 3 Pintu', quantity: 1, price: 2499000 },
        { name: 'Rak Buku Floating', quantity: 2, price: 699000 }
      ],
      total: 3897000,
      status: 'processing',
      tracking: null
    }
  ];

  const stats = [
    { number: orders.length, label: 'Total Pesanan', icon: <FaBox />, color: '#4c51bf' },
    { number: `Rp ${orders.reduce((total, order) => total + order.total, 0).toLocaleString()}`, label: 'Total Pengeluaran', icon: <FaCreditCard />, color: '#38a169' },
    { number: 'Member Emas', label: 'Tier Membership', icon: <FaStar />, color: '#ed8936' },
    { number: '2024', label: 'Member Sejak', icon: <FaCalendarAlt />, color: '#9f7aea' }
  ];

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

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Nama wajib diisi';
    if (!formData.email.trim()) newErrors.email = 'Email wajib diisi';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email tidak valid';
    if (!formData.phone.trim()) newErrors.phone = 'Nomor telepon wajib diisi';
    if (!formData.address.trim()) newErrors.address = 'Alamat wajib diisi';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) return;
    
    updateUser(formData);
    setIsEditing(false);
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      completed: { 
        label: 'Selesai', 
        color: '#38a169', 
        bgColor: '#c6f6d5',
        icon: <FaCheckCircle /> 
      },
      shipped: { 
        label: 'Dikirim', 
        color: '#3182ce', 
        bgColor: '#bee3f8',
        icon: <FaTruck /> 
      },
      processing: { 
        label: 'Diproses', 
        color: '#d69e2e', 
        bgColor: '#feebc8',
        icon: <FaBox /> 
      },
      cancelled: { 
        label: 'Dibatalkan', 
        color: '#e53e3e', 
        bgColor: '#fed7d7',
        icon: <FaTimesCircle /> 
      }
    };
    
    const config = statusConfig[status] || { 
      label: status, 
      color: '#718096', 
      bgColor: '#e2e8f0',
      icon: <FaBox /> 
    };
    
    return (
      <span 
        className="status-badge"
        style={{ 
          backgroundColor: config.bgColor,
          color: config.color
        }}
      >
        {config.icon}
        {config.label}
      </span>
    );
  };

  return (
    <div className="profile-page">
      {/* Hero Section */}
      <section className="profile-hero simple-hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title">Profil Saya</h1>
              
              <div className="profile-hero-content">
                <div className="profile-avatar">
                  {user?.name?.charAt(0).toUpperCase() || 'U'}
                </div>
                <div className="profile-info">
                  <p className="hero-subtitle">
                    Selamat datang kembali, {user?.name}!
                  </p>
                  <div className="profile-details">
                    <span className="profile-email">{user?.email}</span>
                    <span className="profile-role">
                      {user?.role === 'admin' ? 'Administrator' : 'Customer VIP'}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="hero-stats">
                {stats.map((stat, index) => (
                  <div key={index} className="stat-item">
                    <div className="stat-number">{stat.number}</div>
                    <div className="stat-label">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="hero-image">
              <img 
                src="https://mohamadalvinmakmun.github.io/dist/img/hobi/gunung.jpg" 
                alt="Profile" 
                className="hero-main-image"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="container">
        <div className="profile-content">
          {/* Main Content */}
          <div className="profile-main-content">
            {/* Profile Information */}
            <div className="profile-section">
              <div className="section-header">
                <h2 className="section-title">
                  <FaUser /> Informasi Profil
                </h2>
                <button 
                  className={`btn ${isEditing ? 'btn-primary' : 'btn-secondary'}`}
                  onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                >
                  {isEditing ? <><FaSave /> Simpan</> : <><FaEdit /> Edit Profil</>}
                </button>
              </div>
              
              <div className="profile-form">
                <div className="form-grid">
                  <div className="form-group">
                    <label>
                      <FaUser /> Nama Lengkap
                    </label>
                    {isEditing ? (
                      <>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className={errors.name ? 'error' : ''}
                          placeholder="Masukkan nama lengkap"
                        />
                        {errors.name && <span className="error-message">{errors.name}</span>}
                      </>
                    ) : (
                      <p className="profile-value">{user?.name}</p>
                    )}
                  </div>
                  
                  <div className="form-group">
                    <label>
                      <FaEnvelope /> Email
                    </label>
                    {isEditing ? (
                      <>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className={errors.email ? 'error' : ''}
                          placeholder="contoh@email.com"
                        />
                        {errors.email && <span className="error-message">{errors.email}</span>}
                      </>
                    ) : (
                      <p className="profile-value">{user?.email}</p>
                    )}
                  </div>
                  
                  <div className="form-group">
                    <label>
                      <FaPhone /> Nomor Telepon
                    </label>
                    {isEditing ? (
                      <>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className={errors.phone ? 'error' : ''}
                          placeholder="081234567890"
                        />
                        {errors.phone && <span className="error-message">{errors.phone}</span>}
                      </>
                    ) : (
                      <p className="profile-value">{user?.phone || 'Belum diisi'}</p>
                    )}
                  </div>
                  
                  <div className="form-group full-width">
                    <label>
                      <FaMapMarkerAlt /> Alamat
                    </label>
                    {isEditing ? (
                      <>
                        <textarea
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          className={errors.address ? 'error' : ''}
                          rows="3"
                          placeholder="Masukkan alamat lengkap"
                        />
                        {errors.address && <span className="error-message">{errors.address}</span>}
                      </>
                    ) : (
                      <p className="profile-value">{user?.address || 'Belum diisi'}</p>
                    )}
                  </div>
                </div>
                
                <div className="form-actions">
                  {isEditing && (
                    <button 
                      className="btn btn-secondary"
                      onClick={() => {
                        setIsEditing(false);
                        setFormData({
                          name: user?.name || '',
                          email: user?.email || '',
                          phone: user?.phone || '',
                          address: user?.address || ''
                        });
                      }}
                    >
                      Batal
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Order History */}
            <div className="profile-section">
              <div className="section-header">
                <h2 className="section-title">
                  <FaHistory /> Riwayat Pesanan
                </h2>
                <a href="/orders" className="btn btn-secondary">
                  Lihat Semua <FaArrowRight />
                </a>
              </div>
              
              {orders.length === 0 ? (
                <div className="empty-orders">
                  <div className="empty-icon">
                    <FaShoppingBag />
                  </div>
                  <h3>Belum Ada Pesanan</h3>
                  <p>Mulai jelajahi produk kami dan buat pesanan pertama Anda.</p>
                  <a href="/products" className="btn btn-primary">Mulai Belanja</a>
                </div>
              ) : (
                <div className="orders-list">
                  {orders.map((order) => (
                    <div key={order.id} className="order-card">
                      <div className="order-header">
                        <div className="order-info">
                          <h3>{order.id}</h3>
                          <p className="order-date">{order.date}</p>
                        </div>
                        <div className="order-status">
                          {getStatusBadge(order.status)}
                          <span className="order-total">Rp {order.total.toLocaleString()}</span>
                        </div>
                      </div>
                      
                      <div className="order-items">
                        {order.items.map((item, index) => (
                          <div key={index} className="order-item">
                            <div className="item-info">
                              <span className="item-name">{item.name}</span>
                              <div className="item-meta">
                                <span className="item-quantity">x{item.quantity}</span>
                                <span className="item-price">Rp {item.price.toLocaleString()}/pcs</span>
                              </div>
                            </div>
                            <div className="item-total">
                              Rp {(item.price * item.quantity).toLocaleString()}
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="order-footer">
                        <div className="order-actions">
                          {order.tracking && (
                            <div className="tracking-info">
                              <FaTruck />
                              <span>No. Resi: {order.tracking}</span>
                            </div>
                          )}
                          <button className="btn btn-secondary btn-sm">
                            Lihat Detail
                          </button>
                        </div>
                        <div className="order-note">
                          {order.status === 'completed' && (
                            <button className="btn-review">
                              <FaStar /> Beri Ulasan
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="profile-sidebar">
            {/* Quick Actions */}
            <div className="sidebar-section">
              <h3 className="sidebar-title">Aksi Cepat</h3>
              <div className="quick-actions">
                <button className="quick-action">
                  <FaShoppingBag />
                  <span>Lanjutkan Belanja</span>
                </button>
                <button className="quick-action">
                  <FaStar />
                  <span>Ulasan Saya</span>
                </button>
                <button className="quick-action">
                  <FaCreditCard />
                  <span>Metode Pembayaran</span>
                </button>
                <button className="quick-action">
                  <FaTruck />
                  <span>Lacak Pesanan</span>
                </button>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="sidebar-section">
              <h3 className="sidebar-title">Aktivitas Terbaru</h3>
              <div className="activity-list">
                <div className="activity-item">
                  <div className="activity-icon">
                    <FaShoppingBag />
                  </div>
                  <div className="activity-content">
                    <p>Pesanan ORD-002 dikirim</p>
                    <span className="activity-time">2 hari yang lalu</span>
                  </div>
                </div>
                <div className="activity-item">
                  <div className="activity-icon">
                    <FaStar />
                  </div>
                  <div className="activity-content">
                    <p>Ulasan Anda ditambahkan</p>
                    <span className="activity-time">5 hari yang lalu</span>
                  </div>
                </div>
                <div className="activity-item">
                  <div className="activity-icon">
                    <FaUser />
                  </div>
                  <div className="activity-content">
                    <p>Profil diperbarui</p>
                    <span className="activity-time">1 minggu yang lalu</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Account Security */}
            <div className="sidebar-section">
              <h3 className="sidebar-title">Keamanan Akun</h3>
              <div className="security-status">
                <div className="security-item">
                  <FaCheckCircle className="security-icon" />
                  <span>Email diverifikasi</span>
                </div>
                <div className="security-item">
                  <FaCheckCircle className="security-icon" />
                  <span>Nomor telepon terdaftar</span>
                </div>
                <button className="btn btn-secondary full-width">
                  Ubah Password
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;