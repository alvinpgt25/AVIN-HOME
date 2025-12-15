import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useProducts } from '../../context/ProductsContext';
import ProductCard from '../../components/ProductCard/ProductCard';
import { FaSearch, FaFilter, FaSortAmountDown, FaSortAmountUp, FaTimes } from 'react-icons/fa';
import './Products.css';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { filteredProducts, categories, searchProducts } = useProducts();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
  const [sortBy, setSortBy] = useState('default');
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    
    const search = searchParams.get('search') || '';
    const category = searchParams.get('category') || 'all';
    
    setSearchQuery(search);
    setSelectedCategory(category);
    
    // Call searchProducts with both parameters
    searchProducts(search, category);
    
    const timer = setTimeout(() => {
      setLoading(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [searchParams, searchProducts]);

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery.trim()) params.set('search', searchQuery.trim());
    if (selectedCategory !== 'all') params.set('category', selectedCategory);
    setSearchParams(params);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    const params = new URLSearchParams();
    if (searchQuery.trim()) params.set('search', searchQuery.trim());
    if (category !== 'all') params.set('category', category);
    setSearchParams(params);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSearchParams({});
  };

  const getSortedProducts = () => {
    let sorted = [...filteredProducts];
    
    switch (sortBy) {
      case 'price-low':
        sorted.sort((a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price));
        break;
      case 'price-high':
        sorted.sort((a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price));
        break;
      case 'rating':
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case 'name':
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }
    
    return sorted;
  };

  const sortedProducts = getSortedProducts();

  const hasActiveFilters = searchQuery || selectedCategory !== 'all';

  return (
    <div className="products-page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Produk Kami</h1>
          <p className="page-subtitle">Temukan perabotan terbaik untuk rumah impian Anda</p>
        </div>

        <div className="products-content">
          {/* Filters Sidebar */}
          <aside className={`filters-sidebar ${showFilters ? 'active' : ''}`}>
            <div className="filters-header">
              <h3><FaFilter /> Filter</h3>
              <button 
                className="close-filters" 
                onClick={() => setShowFilters(false)}
                aria-label="Tutup filter"
              >
                <FaTimes />
              </button>
            </div>

            {/* Search */}
            <div className="filter-section">
              <h4>Cari Produk</h4>
              <form onSubmit={handleSearch} className="search-box">
                <input
                  type="text"
                  placeholder="Nama produk..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit" className="search-btn">
                  <FaSearch />
                </button>
              </form>
            </div>

            {/* Categories */}
            <div className="filter-section">
              <h4>Kategori</h4>
              <div className="category-filters">
                {categories.map(category => (
                  <button
                    key={category.id}
                    className={`category-filter ${selectedCategory === category.id ? 'active' : ''}`}
                    onClick={() => handleCategoryChange(category.id)}
                  >
                    {category.name}
                    <span className="filter-count">
                      {category.id === 'all' 
                        ? filteredProducts.length 
                        : filteredProducts.filter(p => p.category === category.id).length}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Clear Filters */}
            {hasActiveFilters && (
              <div className="filter-section">
                <button 
                  className="btn btn-secondary clear-filters-btn"
                  onClick={handleClearFilters}
                >
                  Reset Filter
                </button>
              </div>
            )}
          </aside>

          {/* Products List */}
          <main className="products-list">
            {/* Products Header */}
            <div className="products-header">
              <div className="products-info">
                <h2>Semua Produk</h2>
                <p>Menampilkan {sortedProducts.length} produk</p>
                {hasActiveFilters && (
                  <div className="active-filters">
                    {searchQuery && (
                      <span className="active-filter">
                        Pencarian: "{searchQuery}"
                      </span>
                    )}
                    {selectedCategory !== 'all' && (
                      <span className="active-filter">
                        Kategori: {categories.find(c => c.id === selectedCategory)?.name}
                      </span>
                    )}
                  </div>
                )}
              </div>
              
              <div className="products-controls">
                <button 
                  className="mobile-filter-btn"
                  onClick={() => setShowFilters(!showFilters)}
                  aria-label="Buka filter"
                >
                  <FaFilter /> Filter
                </button>
                
                <div className="sort-controls">
                  <label htmlFor="sort">
                    {sortBy.includes('price-high') ? <FaSortAmountUp /> : <FaSortAmountDown />}
                  </label>
                  <select 
                    id="sort" 
                    value={sortBy} 
                    onChange={handleSortChange}
                    className="sort-select"
                  >
                    <option value="default">Default</option>
                    <option value="price-low">Harga: Rendah ke Tinggi</option>
                    <option value="price-high">Harga: Tinggi ke Rendah</option>
                    <option value="rating">Rating Tertinggi</option>
                    <option value="name">Nama A-Z</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Loading State */}
            {loading ? (
              <div className="loading-products">
                <div className="loading-spinner"></div>
                <p>Memuat produk...</p>
              </div>
            ) : (
              <>
                {/* Products Grid */}
                {sortedProducts.length > 0 ? (
                  <div className="products-grid">
                    {sortedProducts.map(product => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                ) : (
                  <div className="no-products">
                    <h3>Produk tidak ditemukan</h3>
                    <p>Coba gunakan kata kunci atau kategori yang berbeda</p>
                    <button 
                      className="btn btn-primary"
                      onClick={handleClearFilters}
                    >
                      Reset Filter
                    </button>
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Products;