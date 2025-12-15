import React, { useState } from 'react';
import { 
  FaMapMarkerAlt, 
  FaPhone, 
  FaEnvelope, 
  FaClock,
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
  FaPaperPlane,
  FaArrowRight,
  FaHeadset,
  FaWhatsapp,
  FaCheckCircle
} from 'react-icons/fa';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const contactInfo = [
    {
      icon: <FaMapMarkerAlt />,
      title: 'Alamat Kantor',
      details: ['Jl. Perabotan No. 123', 'Jakarta Selatan 12950', 'Indonesia'],
      color: '#4c51bf'
    },
    {
      icon: <FaPhone />,
      title: 'Telepon',
      details: ['(021) 1234-5678', '0812-3456-7890 (WhatsApp)'],
      color: '#38a169'
    },
    {
      icon: <FaEnvelope />,
      title: 'Email',
      details: ['info@avinhome.com', 'support@avinhome.com'],
      color: '#f56565'
    },
    {
      icon: <FaClock />,
      title: 'Jam Operasional',
      details: ['Senin - Jumat: 08:00 - 17:00', 'Sabtu: 09:00 - 15:00', 'Minggu: Tutup'],
      color: '#ed8936'
    }
  ];

  const socialMedia = [
    { icon: <FaWhatsapp />, name: 'WhatsApp', url: '#', color: '#25D366' },
    { icon: <FaInstagram />, name: 'Instagram', url: '#', color: '#E4405F' },
    { icon: <FaFacebook />, name: 'Facebook', url: '#', color: '#1877F2' },
    { icon: <FaTwitter />, name: 'Twitter', url: '#', color: '#1DA1F2' }
  ];

  const faqItems = [
    {
      question: 'Berapa lama waktu pengiriman?',
      answer: 'Pengiriman standar 3-7 hari kerja, tergantung lokasi pengiriman. Untuk Jakarta dan sekitarnya biasanya 1-3 hari kerja.'
    },
    {
      question: 'Apakah ada garansi untuk produk?',
      answer: 'Ya, semua produk kami bergaransi 2 tahun untuk material dan pengerjaan. Garansi mencakup kerusakan akibat cacat produksi.'
    },
    {
      question: 'Bagaimana cara mengajukan pengembalian?',
      answer: 'Anda dapat mengajukan pengembalian dalam 14 hari setelah barang diterima. Hubungi customer service kami di WhatsApp untuk proses yang lebih cepat.'
    },
    {
      question: 'Apakah tersedia metode pembayaran COD?',
      answer: 'Ya, kami menyediakan COD (Cash on Delivery) untuk area Jakarta, Bogor, Depok, Tangerang, dan Bekasi dengan biaya tambahan Rp 15.000.'
    }
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
    if (!formData.subject.trim()) newErrors.subject = 'Subjek wajib diisi';
    if (!formData.message.trim()) newErrors.message = 'Pesan wajib diisi';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
    
    // Reset success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <section className="contact-hero simple-hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title">Hubungi Kami</h1>
              
              <p className="hero-subtitle">
                Kami siap membantu Anda dalam setiap langkah menciptakan rumah impian.
              </p>
              
              <div className="hero-description">
                Tim customer service kami tersedia untuk menjawab pertanyaan Anda 
                dan membantu proses pemesanan dengan senang hati.
              </div>
              
              <div className="hero-stats">
                <div className="stat-item">
                  <div className="stat-number">24/7</div>
                  <div className="stat-label">Support WhatsApp</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">1 Jam</div>
                  <div className="stat-label">Respon Cepat</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">100%</div>
                  <div className="stat-label">Kepuasan</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">500+</div>
                  <div className="stat-label">Pertanyaan/Hari</div>
                </div>
              </div>
            </div>
            
            <div className="hero-image">
              <img 
                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800" 
                alt="Customer Service" 
                className="hero-main-image"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="contact-info-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Informasi Kontak</h2>
            <p className="section-subtitle">
              Beberapa cara untuk menghubungi tim support kami
            </p>
          </div>
          
          <div className="contact-info-grid">
            {contactInfo.map((info, index) => (
              <div key={index} className="contact-info-card">
                <div className="contact-icon" style={{ color: info.color }}>
                  {info.icon}
                </div>
                <h3>{info.title}</h3>
                <div className="contact-details">
                  {info.details.map((detail, idx) => (
                    <p key={idx}>{detail}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="contact-form-section">
        <div className="container">
          <div className="contact-form-wrapper">
            {/* Contact Form */}
            <div className="contact-form-container">
              <div className="section-header">
                <h2 className="section-title">Kirim Pesan</h2>
                <p className="section-subtitle">
                  Punya pertanyaan? Hubungi kami dengan mengisi form di bawah ini.
                </p>
              </div>

              {isSubmitted ? (
                <div className="success-message">
                  <FaCheckCircle className="success-icon" />
                  <h3>Pesan Terkirim!</h3>
                  <p>
                    Terima kasih telah menghubungi kami. Tim kami akan merespons 
                    pesan Anda dalam 1x24 jam.
                  </p>
                  <button 
                    className="btn btn-primary mt-3"
                    onClick={() => setIsSubmitted(false)}
                  >
                    Kirim Pesan Lain
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="contact-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="name">Nama Lengkap *</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={errors.name ? 'error' : ''}
                        placeholder="Masukkan nama lengkap"
                      />
                      {errors.name && <span className="error-message">{errors.name}</span>}
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
                  </div>
                  
                  <div className="form-row">
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
                    
                    <div className="form-group">
                      <label htmlFor="subject">Subjek *</label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        className={errors.subject ? 'error' : ''}
                        placeholder="Contoh: Pertanyaan produk, pemesanan, dll"
                      />
                      {errors.subject && <span className="error-message">{errors.subject}</span>}
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="message">Pesan *</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      className={errors.message ? 'error' : ''}
                      placeholder="Tulis pesan Anda di sini secara detail..."
                      rows="6"
                    />
                    {errors.message && <span className="error-message">{errors.message}</span>}
                  </div>
                  
                  <button 
                    type="submit" 
                    className="btn btn-primary submit-btn"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="btn-spinner"></span>
                        Mengirim...
                      </>
                    ) : (
                      <>
                        <FaPaperPlane /> Kirim Pesan
                      </>
                    )}
                  </button>
                  
                  <div className="form-note">
                    <p className="note-text">
                      * Semua bidang wajib diisi. Kami akan membalas dalam 1x24 jam.
                    </p>
                  </div>
                </form>
              )}
            </div>

            {/* Map & Social Media */}
            <div className="contact-sidebar">
              <div className="map-container">
                <div className="map-placeholder">
                  <div className="map-content">
                    <h3>Kunjungi Kantor Kami</h3>
                    <p>Jl. Perabotan No. 123, Jakarta Selatan</p>
                    <div className="map-directions">
                      <a 
                        href="https://maps.google.com" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="btn btn-secondary"
                      >
                        <FaMapMarkerAlt /> Buka di Google Maps
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="social-media-section">
                <h3>Ikuti Kami</h3>
                <p>Ikuti perkembangan terbaru dan promo spesial di media sosial kami.</p>
                <div className="social-media-links">
                  {socialMedia.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      className="social-media-link"
                      style={{ backgroundColor: social.color }}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.name}
                    >
                      {social.icon}
                      <span>{social.name}</span>
                    </a>
                  ))}
                </div>
              </div>
              
              <div className="whatsapp-cta">
                <div className="whatsapp-content">
                  <FaWhatsapp className="whatsapp-icon" />
                  <div>
                    <h4>Butuh Bantuan Cepat?</h4>
                    <p>Chat langsung dengan tim support kami</p>
                  </div>
                </div>
                <a 
                  href="https://wa.me/6281234567890" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn-success"
                >
                  <FaWhatsapp /> Chat Sekarang
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Pertanyaan yang Sering Diajukan</h2>
            <p className="section-subtitle">Temukan jawaban untuk pertanyaan umum di bawah ini</p>
          </div>
          
          <div className="faq-list">
            {faqItems.map((item, index) => (
              <div key={index} className="faq-item">
                <h3>{item.question}</h3>
                <p>{item.answer}</p>
              </div>
            ))}
          </div>
          
          <div className="faq-cta">
            <div className="faq-cta-content">
              <h3>Masih ada pertanyaan?</h3>
              <p>Jangan ragu untuk menghubungi tim support kami yang selalu siap membantu.</p>
              <div className="faq-buttons">
                <a href="tel:+622112345678" className="btn btn-primary">
                  <FaPhone /> Telepon Sekarang
                </a>
                <a href="mailto:info@avinhome.com" className="btn btn-secondary">
                  <FaEnvelope /> Kirim Email
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;