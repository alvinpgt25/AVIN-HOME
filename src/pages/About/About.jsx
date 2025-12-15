import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaUsers, 
  FaBullseye, 
  FaHandshake, 
  FaAward,
  FaArrowRight,
  FaStar,
  FaCheckCircle,
  FaTruck,
  FaShieldAlt,
  FaHeadset,
  FaLeaf
} from 'react-icons/fa';
import './About.css';

const About = () => {
  const values = [
    {
      icon: <FaStar />,
      title: 'Kualitas Terbaik',
      description: 'Kami hanya menggunakan material berkualitas tinggi untuk setiap produk'
    },
    {
      icon: <FaHandshake />,
      title: 'Kepercayaan Pelanggan',
      description: 'Pelanggan kami adalah prioritas utama dalam setiap keputusan'
    },
    {
      icon: <FaBullseye />,
      title: 'Inovasi Berkelanjutan',
      description: 'Terus berinovasi untuk memberikan solusi terbaik bagi rumah Anda'
    },
    {
      icon: <FaAward />,
      title: 'Keunggulan',
      description: 'Komitmen untuk memberikan yang terbaik dalam setiap detail'
    }
  ];

  const team = [
    {
      name: 'Alvin',
      role: 'Founder & CEO',
      image: '👨‍💼',
      bio: 'Memiliki visi untuk menciptakan rumah yang lebih nyaman bagi semua orang'
    },
    {
      name: 'Sarah Wijaya',
      role: 'Head of Design',
      image: '👩‍🎨',
      bio: 'Desainer interior berpengalaman dengan passion untuk estetika ruangan'
    },
    {
      name: 'Budi Santoso',
      role: 'Operations Manager',
      image: '👨‍💼',
      bio: 'Ahli dalam logistik dan manajemen operasional yang efisien'
    },
    {
      name: 'Lisa Anggraeni',
      role: 'Customer Service',
      image: '👩‍💼',
      bio: 'Siap membantu pelanggan dengan senyuman dan solusi terbaik'
    }
  ];

  const milestones = [
    { year: '2020', title: 'AVIN HOME Didirikan', description: 'Dimulai dari sebuah toko kecil di Jakarta' },
    { year: '2021', title: 'Ekspansi Online', description: 'Meluncurkan platform e-commerce pertama' },
    { year: '2022', title: '10.000 Pelanggan', description: 'Mencapai 10.000 pelanggan setia' },
    { year: '2023', title: 'Penghargaan Nasional', description: 'Mendapatkan penghargaan Best Furniture Retailer' },
    { year: '2024', title: '25.000 Produk Terjual', description: 'Mencapai tonggak 25.000 produk terjual' }
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

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero simple-hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title">Tentang AVIN HOME</h1>
              
              <p className="hero-subtitle">
                Harmoni antara perhatian & visi untuk menciptakan rumah yang lebih nyaman.
              </p>
              
              <div className="hero-description">
                Sejak 2020, AVIN HOME telah membantu ribuan keluarga Indonesia 
                menciptakan rumah impian mereka dengan perabotan berkualitas tinggi 
                dan desain yang timeless.
              </div>
              
              <div className="hero-stats">
                <div className="stat-item">
                  <div className="stat-number">25.000+</div>
                  <div className="stat-label">Produk Terjual</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">10.000+</div>
                  <div className="stat-label">Pelanggan Setia</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">4.8/5</div>
                  <div className="stat-label">Rating Pelanggan</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">98%</div>
                  <div className="stat-label">Kepuasan Pelanggan</div>
                </div>
              </div>
            </div>
            
            <div className="hero-image">
              <img 
                src="https://images.unsplash.com/photo-1615529328331-f8917597711f?w=800" 
                alt="About AVIN HOME" 
                className="hero-main-image"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
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

      {/* Mission & Vision */}
      <section className="mission-vision">
        <div className="container">
          <div className="mv-grid">
            <div className="mv-card mission">
              <div className="mv-content">
                <h2>Misi Kami</h2>
                <p>
                  Menyediakan perabotan rumah berkualitas tinggi dengan harga terjangkau, 
                  sambil memberikan pengalaman belanja yang mudah dan menyenangkan bagi 
                  setiap pelanggan.
                </p>
              </div>
              <div className="mv-icon">🎯</div>
            </div>
            <div className="mv-card vision">
              <div className="mv-content">
                <h2>Visi Kami</h2>
                <p>
                  Menjadi pemimpin pasar dalam industri perabotan rumah di Indonesia 
                  dengan menjadi merek pilihan utama untuk keluarga Indonesia yang 
                  mengutamakan kualitas dan kenyamanan.
                </p>
              </div>
              <div className="mv-icon">👁️</div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="values-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Nilai-Nilai Kami</h2>
            <p className="section-subtitle">Prinsip yang memandu setiap langkah kami</p>
          </div>
          
          <div className="values-grid">
            {values.map((value, index) => (
              <div key={index} className="value-card">
                <div className="value-icon">
                  {value.icon}
                </div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="story-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Perjalanan Kami</h2>
            <p className="section-subtitle">Dari awal yang sederhana hingga menjadi pemimpin pasar</p>
          </div>
          
          <div className="timeline">
            {milestones.map((milestone, index) => (
              <div key={index} className="timeline-item">
                <div className="timeline-year">{milestone.year}</div>
                <div className="timeline-content">
                  <h3>{milestone.title}</h3>
                  <p>{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="team-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Tim Kami</h2>
            <p className="section-subtitle">Orang-orang di balik kesuksesan AVIN HOME</p>
          </div>
          
          <div className="team-grid">
            {team.map((member, index) => (
              <div key={index} className="team-card">
                <div className="team-avatar">{member.image}</div>
                <h3>{member.name}</h3>
                <p className="team-role">{member.role}</p>
                <p className="team-bio">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="about-cta cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Siap Menciptakan Rumah Impian Anda?</h2>
            <p className="cta-text">
              Bergabunglah dengan ribuan keluarga Indonesia yang telah mempercayai 
              AVIN HOME untuk menciptakan rumah yang lebih nyaman dan indah.
            </p>
            <div className="cta-buttons">
              <Link to="/products" className="btn btn-primary">
                Lihat Produk <FaArrowRight />
              </Link>
              <Link to="/contact" className="btn btn-secondary">
                Hubungi Kami
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;