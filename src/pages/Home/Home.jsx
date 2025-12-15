import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '../../context/ProductsContext';
import ProductCard from '../../components/ProductCard/ProductCard';
import { 
  FaArrowRight, 
  FaTruck, 
  FaShieldAlt, 
  FaHeadset, 
  FaLeaf,
  FaStar,
  FaTag,
  FaShoppingCart,
  FaArrowCircleRight
} from 'react-icons/fa';
import './Home.css';

const Home = () => {
  const { getFeaturedProducts } = useProducts();
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const categories = [
    { id: 'living-room', name: 'Ruang Tamu', icon: '🛋️', count: 45, color: '#667eea' },
    { id: 'bedroom', name: 'Kamar Tidur', icon: '🛏️', count: 38, color: '#f093fb' },
    { id: 'dining-room', name: 'Ruang Makan', icon: '🍽️', count: 28, color: '#4facfe' },
    { id: 'kitchen', name: 'Dapur', icon: '👨‍🍳', count: 32, color: '#f5576c' },
    { id: 'office', name: 'Kantor', icon: '💼', count: 24, color: '#38a169' },
    { id: 'decor', name: 'Dekorasi', icon: '🎨', count: 56, color: '#ed8936' }
  ];

  const features = [
    {
      icon: <FaTruck />,
      title: 'Gratis Ongkir',
      description: 'Gratis pengiriman untuk pembelian di atas Rp 2.000.000',
      color: '#4299e1'
    },
    {
      icon: <FaShieldAlt />,
      title: 'Garansi 2 Tahun',
      description: 'Garansi produk selama 2 tahun untuk semua produk kami',
      color: '#38a169'
    },
    {
      icon: <FaHeadset />,
      title: 'Dukungan 24/7',
      description: 'Customer service siap membantu kapan saja',
      color: '#9f7aea'
    },
    {
      icon: <FaLeaf />,
      title: 'Eco-Friendly',
      description: 'Produk ramah lingkungan dari bahan berkualitas',
      color: '#48bb78'
    }
  ];

  const testimonials = [
    {
      name: 'Budi Santoso',
      role: 'Pengusaha',
      text: 'Sofa yang saya beli sangat nyaman dan tahan lama. Pengiriman cepat dan pelayanan memuaskan!',
      rating: 5,
      image: '👨‍💼'
    },
    {
      name: 'Sari Wijaya',
      role: 'Ibu Rumah Tangga',
      text: 'Meja makan dari AVIN HOME membuat keluarga kami semakin betah di rumah. Kualitas luar biasa!',
      rating: 5,
      image: '👩‍🍳'
    },
    {
      name: 'Ahmad Rizal',
      role: 'Desainer Interior',
      text: 'Sebagai desainer, saya sangat mempercayai AVIN HOME untuk proyek klien. Produk premium dengan harga terjangkau.',
      rating: 5,
      image: '👨‍🎨'
    }
  ];

  const stats = [
    { number: '5000+', label: 'Produk Terjual' },
    { number: '4.9', label: 'Rating Pelanggan' },
    { number: '100%', label: 'Garansi Produk' },
    { number: '50+', label: 'Merek Terpercaya' },
  ];

  useEffect(() => {
    const products = getFeaturedProducts();
    setFeaturedProducts(products);
    setLoading(false);
  }, [getFeaturedProducts]);

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
        <p>Memuat halaman...</p>
      </div>
    );
  }

  return (
    <div className="home">
      {/* Hero Section - Simple */}
      <section className="hero-section simple-hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title">
                Perabotan Premium untuk Rumah Impian Anda
              </h1>
              
              <p className="hero-subtitle">
                Kualitas terbaik dengan harga terjangkau. Temukan furniture yang membuat rumah Anda lebih nyaman dan elegan.
              </p>
              
              <div className="discount-tags">
                <span className="discount-tag">-11%</span>
                <span className="discount-tag">-13%</span>
                <span className="discount-tag">-18%</span>
              </div>
              
              <div className="hero-buttons">
                <Link to="/products" className="btn btn-primary">
                  <FaShoppingCart /> Belanja Sekarang
                </Link>
                <Link to="/categories" className="btn btn-outline">
                  Lihat Kategori <FaArrowCircleRight />
                </Link>
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
                src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800" 
                alt="Perabotan Premium" 
                className="hero-main-image"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="features-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Mengapa Memilih AVIN HOME?</h2>
            <p className="section-subtitle">Kami memberikan yang terbaik untuk kenyamanan rumah Anda</p>
          </div>
          
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon" style={{ color: feature.color }}>
                  {feature.icon}
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="categories-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Kategori Produk</h2>
            <p className="section-subtitle">Temukan produk terbaik untuk setiap ruangan</p>
          </div>
          
          <div className="categories-grid">
            {categories.map((category) => (
              <Link 
                key={category.id} 
                to={`/products?category=${category.id}`}
                className="category-card"
                style={{ '--category-color': category.color }}
              >
                <div className="category-icon">{category.icon}</div>
                <div className="category-info">
                  <h3>{category.name}</h3>
                  <p>{category.count} produk</p>
                </div>
                <div className="category-arrow">
                  <FaArrowRight />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="products-section">
        <div className="container">
          <div className="section-header">
            <div className="section-title-row">
              <div className="title-wrapper">
                <h2 className="section-title">Produk Unggulan</h2>
                <p className="section-subtitle">Produk terbaik dengan kualitas premium</p>
              </div>
              
              <Link to="/products" className="view-all-link">
                <span>Lihat Semua</span>
                <FaArrowRight />
              </Link>
            </div>
          </div>
          
          {/* Product Cards - Hanya gambar yang bisa diklik ke detail */}
          <div className="products-grid">
            {featuredProducts.map((product) => (
              <div key={product.id} className="product-card-wrapper">
                <ProductCard product={product} />
                <Link to={`/product/${product.id}`} className="product-image-link">
                  <span className="sr-only">Lihat detail {product.name}</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Apa Kata Pelanggan Kami</h2>
            <p className="section-subtitle">Ribuan pelanggan telah mempercayai AVIN HOME</p>
          </div>
          
          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card">
                <div className="testimonial-header">
                  <div className="testimonial-avatar">
                    {testimonial.image}
                  </div>
                  <div className="testimonial-info">
                    <h4>{testimonial.name}</h4>
                    <p>{testimonial.role}</p>
                  </div>
                  <div className="testimonial-rating">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <FaStar key={i} className="star" />
                    ))}
                  </div>
                </div>
                <p className="testimonial-text">"{testimonial.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Siap Membuat Rumah Impian Anda?</h2>
            <p className="cta-text">
              Bergabung dengan ribuan pelanggan yang telah mempercayai AVIN HOME 
              untuk menciptakan rumah yang lebih nyaman dan indah.
            </p>
            <div className="cta-buttons">
              <Link to="/products" className="btn btn-primary">
                Belanja Sekarang <FaArrowRight />
              </Link>
              <Link to="/about" className="btn btn-secondary">
                Pelajari Lebih Lanjut
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;