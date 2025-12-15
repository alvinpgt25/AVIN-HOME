import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaChartLine, 
  FaShoppingCart, 
  FaUsers, 
  FaBox, 
  FaDollarSign,
  FaArrowUp,
  FaArrowDown
} from 'react-icons/fa';
import './Dashboard.css';

const Dashboard = () => {
  const stats = [
    {
      title: 'Total Pendapatan',
      value: 'Rp 45.800.000',
      change: '+12.5%',
      trend: 'up',
      icon: <FaDollarSign />,
      color: '#27ae60'
    },
    {
      title: 'Total Pesanan',
      value: '128',
      change: '+8.2%',
      trend: 'up',
      icon: <FaShoppingCart />,
      color: '#3498db'
    },
    {
      title: 'Produk Terjual',
      value: '342',
      change: '+15.3%',
      trend: 'up',
      icon: <FaBox />,
      color: '#9b59b6'
    },
    {
      title: 'Pelanggan Baru',
      value: '24',
      change: '+5.7%',
      trend: 'up',
      icon: <FaUsers />,
      color: '#e74c3c'
    }
  ];

  const recentOrders = [
    { id: 'ORD-001', customer: 'Budi Santoso', amount: 4500000, status: 'completed', date: '2024-03-15' },
    { id: 'ORD-002', customer: 'Sari Wijaya', amount: 3200000, status: 'processing', date: '2024-03-15' },
    { id: 'ORD-003', customer: 'Ahmad Rizal', amount: 1850000, status: 'pending', date: '2024-03-14' },
    { id: 'ORD-004', customer: 'Lisa Anggraeni', amount: 6500000, status: 'completed', date: '2024-03-14' },
    { id: 'ORD-005', customer: 'Rudi Hartono', amount: 1250000, status: 'shipped', date: '2024-03-13' }
  ];

  const topProducts = [
    { name: 'Sofa Minimalis Velvet', sales: 45, revenue: 179955000 },
    { name: 'Meja Makan Kayu Jati', sales: 32, revenue: 89568000 },
    { name: 'Tempat Tidur King Size', sales: 28, revenue: 167972000 },
    { name: 'Kursi Kerja Ergonomis', sales: 56, revenue: 89544000 },
    { name: 'Lemari Pakaian 3 Pintu', sales: 24, revenue: 59976000 }
  ];

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h1>Dashboard Admin</h1>
        <p>Selamat datang kembali, Admin! Berikut adalah ringkasan performa toko Anda.</p>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="stat-icon" style={{ backgroundColor: `${stat.color}20`, color: stat.color }}>
              {stat.icon}
            </div>
            <div className="stat-info">
              <h3>{stat.title}</h3>
              <div className="stat-value">{stat.value}</div>
              <div className={`stat-change ${stat.trend}`}>
                {stat.trend === 'up' ? <FaArrowUp /> : <FaArrowDown />}
                <span>{stat.change}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-content">
        {/* Recent Orders */}
        <div className="dashboard-section">
          <div className="section-header">
            <h2>
              <FaShoppingCart /> Pesanan Terbaru
            </h2>
            <Link to="/admin/sales" className="view-all">
              Lihat Semua →
            </Link>
          </div>
          <div className="section-content">
            <div className="orders-table">
              <table>
                <thead>
                  <tr>
                    <th>ID Pesanan</th>
                    <th>Pelanggan</th>
                    <th>Tanggal</th>
                    <th>Jumlah</th>
                    <th>Status</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map(order => (
                    <tr key={order.id}>
                      <td>{order.id}</td>
                      <td>{order.customer}</td>
                      <td>{order.date}</td>
                      <td>Rp {order.amount.toLocaleString()}</td>
                      <td>
                        <span className={`status-badge status-${order.status}`}>
                          {order.status === 'completed' && 'Selesai'}
                          {order.status === 'processing' && 'Diproses'}
                          {order.status === 'pending' && 'Menunggu'}
                          {order.status === 'shipped' && 'Dikirim'}
                        </span>
                      </td>
                      <td>
                        <button className="action-btn view-btn">Lihat</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Top Products */}
        <div className="dashboard-section">
          <div className="section-header">
            <h2>
              <FaChartLine /> Produk Terlaris
            </h2>
            <Link to="/admin/products" className="view-all">
              Lihat Semua →
            </Link>
          </div>
          <div className="section-content">
            <div className="products-list">
              {topProducts.map((product, index) => (
                <div key={index} className="product-item">
                  <div className="product-rank">#{index + 1}</div>
                  <div className="product-info">
                    <h4>{product.name}</h4>
                    <div className="product-meta">
                      <span>{product.sales} terjual</span>
                      <span>Rp {product.revenue.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill"
                      style={{ width: `${(product.sales / 56) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="dashboard-section">
          <div className="section-header">
            <h2>Aksi Cepat</h2>
          </div>
          <div className="section-content">
            <div className="quick-actions">
              <Link to="/admin/products" className="quick-action">
                <div className="action-icon">
                  <FaBox />
                </div>
                <div className="action-info">
                  <h4>Kelola Produk</h4>
                  <p>Tambah, edit, atau hapus produk</p>
                </div>
              </Link>
              
              <Link to="/admin/sales" className="quick-action">
                <div className="action-icon">
                  <FaShoppingCart />
                </div>
                <div className="action-info">
                  <h4>Laporan Penjualan</h4>
                  <p>Lihat laporan dan analisis</p>
                </div>
              </Link>
              
              <div className="quick-action">
                <div className="action-icon">
                  <FaUsers />
                </div>
                <div className="action-info">
                  <h4>Kelola Pelanggan</h4>
                  <p>Lihat data pelanggan</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;