import React, { useState } from 'react';
import { 
  FaChartLine, 
  FaCalendarAlt, 
  FaFilter,
  FaDownload,
  FaPrint,
  FaFileExport
} from 'react-icons/fa';
import './AdminSales.css';

const AdminSales = () => {
  const [dateRange, setDateRange] = useState('week');
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  // Sample sales data
  const salesData = [
    { date: '2024-03-01', orders: 12, revenue: 4500000, customers: 10 },
    { date: '2024-03-02', orders: 8, revenue: 3200000, customers: 8 },
    { date: '2024-03-03', orders: 15, revenue: 5800000, customers: 13 },
    { date: '2024-03-04', orders: 10, revenue: 4200000, customers: 10 },
    { date: '2024-03-05', orders: 14, revenue: 5100000, customers: 12 },
    { date: '2024-03-06', orders: 9, revenue: 3800000, customers: 9 },
    { date: '2024-03-07', orders: 11, revenue: 4600000, customers: 11 },
  ];

  const topProducts = [
    { name: 'Sofa Minimalis Velvet', sold: 45, revenue: 179955000 },
    { name: 'Meja Makan Kayu Jati', sold: 32, revenue: 89568000 },
    { name: 'Tempat Tidur King Size', sold: 28, revenue: 167972000 },
    { name: 'Kursi Kerja Ergonomis', sold: 56, revenue: 89544000 },
    { name: 'Lemari Pakaian 3 Pintu', sold: 24, revenue: 59976000 },
  ];

  const paymentMethods = [
    { method: 'Transfer Bank', count: 45, percentage: 45 },
    { method: 'Kartu Kredit', count: 32, percentage: 32 },
    { method: 'E-Wallet', count: 18, percentage: 18 },
    { method: 'COD', count: 5, percentage: 5 },
  ];

  const calculateTotals = () => {
    return salesData.reduce((totals, day) => ({
      orders: totals.orders + day.orders,
      revenue: totals.revenue + day.revenue,
      customers: totals.customers + day.customers,
      averageOrder: Math.round((totals.revenue + day.revenue) / (totals.orders + day.orders))
    }), { orders: 0, revenue: 0, customers: 0, averageOrder: 0 });
  };

  const totals = calculateTotals();

  const exportReport = (format) => {
    alert(`Report akan diexport dalam format ${format.toUpperCase()}`);
  };

  const months = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];

  const years = [2022, 2023, 2024];

  return (
    <div className="admin-sales">
      <div className="admin-header">
        <h1>Laporan Penjualan</h1>
        <div className="header-actions">
          <button className="btn btn-secondary" onClick={() => exportReport('pdf')}>
            <FaFileExport /> Export PDF
          </button>
          <button className="btn btn-secondary" onClick={() => exportReport('excel')}>
            <FaDownload /> Export Excel
          </button>
          <button className="btn btn-secondary" onClick={() => window.print()}>
            <FaPrint /> Cetak
          </button>
        </div>
      </div>

      {/* Date Range Selector */}
      <div className="date-selector">
        <div className="date-controls">
          <div className="date-range-buttons">
            <button 
              className={`date-btn ${dateRange === 'day' ? 'active' : ''}`}
              onClick={() => setDateRange('day')}
            >
              Hari Ini
            </button>
            <button 
              className={`date-btn ${dateRange === 'week' ? 'active' : ''}`}
              onClick={() => setDateRange('week')}
            >
              7 Hari
            </button>
            <button 
              className={`date-btn ${dateRange === 'month' ? 'active' : ''}`}
              onClick={() => setDateRange('month')}
            >
              30 Hari
            </button>
            <button 
              className={`date-btn ${dateRange === 'quarter' ? 'active' : ''}`}
              onClick={() => setDateRange('quarter')}
            >
              90 Hari
            </button>
          </div>
          
          <div className="month-year-selector">
            <div className="filter-group">
              <FaCalendarAlt />
              <select 
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
              >
                {months.map((month, index) => (
                  <option key={index} value={index}>{month}</option>
                ))}
              </select>
            </div>
            <div className="filter-group">
              <select 
                value={selectedYear}
                onChange={(e) => setSelectedYear(parseInt(e.target.value))}
              >
                {years.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="sales-stats">
        <div className="stat-card">
          <div className="stat-icon" style={{ backgroundColor: '#e3f2fd', color: '#1976d2' }}>
            <FaChartLine />
          </div>
          <div className="stat-info">
            <h3>Total Pendapatan</h3>
            <div className="stat-value">Rp {totals.revenue.toLocaleString()}</div>
            <div className="stat-change up">
              <span>+12.5% dari bulan lalu</span>
            </div>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon" style={{ backgroundColor: '#e8f5e9', color: '#388e3c' }}>
            <span>📦</span>
          </div>
          <div className="stat-info">
            <h3>Total Pesanan</h3>
            <div className="stat-value">{totals.orders}</div>
            <div className="stat-change up">
              <span>+8.2% dari bulan lalu</span>
            </div>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon" style={{ backgroundColor: '#f3e5f5', color: '#7b1fa2' }}>
            <span>👥</span>
          </div>
          <div className="stat-info">
            <h3>Pelanggan Baru</h3>
            <div className="stat-value">{totals.customers}</div>
            <div className="stat-change up">
              <span>+5.7% dari bulan lalu</span>
            </div>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon" style={{ backgroundColor: '#fff3e0', color: '#f57c00' }}>
            <span>💰</span>
          </div>
          <div className="stat-info">
            <h3>Rata-rata Pesanan</h3>
            <div className="stat-value">Rp {totals.averageOrder.toLocaleString()}</div>
            <div className="stat-change up">
              <span>+3.2% dari bulan lalu</span>
            </div>
          </div>
        </div>
      </div>

      {/* Sales Chart and Tables */}
      <div className="sales-content">
        {/* Daily Sales Table */}
        <div className="sales-section">
          <div className="section-header">
            <h2>Penjualan Harian</h2>
            <span className="period">{dateRange === 'week' ? '7 Hari Terakhir' : '30 Hari Terakhir'}</span>
          </div>
          <div className="section-content">
            <div className="sales-table-container">
              <table className="sales-table">
                <thead>
                  <tr>
                    <th>Tanggal</th>
                    <th>Pesanan</th>
                    <th>Pendapatan</th>
                    <th>Pelanggan</th>
                    <th>Rata-rata</th>
                  </tr>
                </thead>
                <tbody>
                  {salesData.map((day, index) => (
                    <tr key={index}>
                      <td>{new Date(day.date).toLocaleDateString('id-ID', { 
                        weekday: 'short', 
                        day: 'numeric', 
                        month: 'short' 
                      })}</td>
                      <td>{day.orders}</td>
                      <td>Rp {day.revenue.toLocaleString()}</td>
                      <td>{day.customers}</td>
                      <td>Rp {Math.round(day.revenue / day.orders).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Top Products */}
        <div className="sales-section">
          <div className="section-header">
            <h2>Produk Terlaris</h2>
            <span className="period">Bulan Ini</span>
          </div>
          <div className="section-content">
            <div className="top-products-list">
              {topProducts.map((product, index) => (
                <div key={index} className="product-item">
                  <div className="product-rank">#{index + 1}</div>
                  <div className="product-info">
                    <h4>{product.name}</h4>
                    <div className="product-stats">
                      <span>{product.sold} terjual</span>
                      <span>Rp {product.revenue.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill"
                      style={{ width: `${(product.sold / 56) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="sales-section">
          <div className="section-header">
            <h2>Metode Pembayaran</h2>
            <span className="period">100 transaksi</span>
          </div>
          <div className="section-content">
            <div className="payment-methods-list">
              {paymentMethods.map((method, index) => (
                <div key={index} className="payment-method-item">
                  <div className="method-info">
                    <h4>{method.method}</h4>
                    <span className="method-count">{method.count} transaksi</span>
                  </div>
                  <div className="method-stats">
                    <div className="percentage-bar">
                      <div 
                        className="percentage-fill"
                        style={{ width: `${method.percentage}%` }}
                      ></div>
                    </div>
                    <span className="percentage-value">{method.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="sales-section">
          <div className="section-header">
            <h2>Ringkasan Performa</h2>
          </div>
          <div className="section-content">
            <div className="performance-stats">
              <div className="perf-stat">
                <div className="perf-label">Conversion Rate</div>
                <div className="perf-value">4.2%</div>
                <div className="perf-change up">+0.3%</div>
              </div>
              <div className="perf-stat">
                <div className="perf-label">Cart Abandonment</div>
                <div className="perf-value">28%</div>
                <div className="perf-change down">-2.1%</div>
              </div>
              <div className="perf-stat">
                <div className="perf-label">Customer Retention</div>
                <div className="perf-value">65%</div>
                <div className="perf-change up">+5.2%</div>
              </div>
              <div className="perf-stat">
                <div className="perf-label">Avg. Delivery Time</div>
                <div className="perf-value">3.2 hari</div>
                <div className="perf-change down">-0.5 hari</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSales;