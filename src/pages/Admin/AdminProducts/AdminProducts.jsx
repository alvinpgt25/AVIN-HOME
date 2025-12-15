import React, { useState } from 'react';
import { useProducts } from '../../../context/ProductsContext';
import { FaEdit, FaTrash, FaPlus, FaSearch, FaFilter } from 'react-icons/fa';
import './AdminProducts.css';

const AdminProducts = () => {
  const { products, categories, addProduct, updateProduct, deleteProduct } = useProducts();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [editingProduct, setEditingProduct] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const [newProduct, setNewProduct] = useState({
    name: '',
    category: 'living-room',
    price: 0,
    discountPrice: 0,
    description: '',
    stock: 10,
    image: ''
  });

  // Filter products
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddProduct = () => {
    if (newProduct.name && newProduct.price > 0) {
      addProduct(newProduct);
      setNewProduct({
        name: '',
        category: 'living-room',
        price: 0,
        discountPrice: 0,
        description: '',
        stock: 10,
        image: ''
      });
      setShowAddModal(false);
    }
  };

  const handleEditProduct = (product) => {
    setEditingProduct({ ...product });
  };

  const handleUpdateProduct = () => {
    if (editingProduct) {
      updateProduct(editingProduct.id, editingProduct);
      setEditingProduct(null);
    }
  };

  const handleDeleteClick = (product) => {
    setProductToDelete(product);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = () => {
    if (productToDelete) {
      deleteProduct(productToDelete.id);
      setShowDeleteModal(false);
      setProductToDelete(null);
    }
  };

  const handleInputChange = (e, isEdit = false) => {
    const { name, value } = e.target;
    if (isEdit && editingProduct) {
      setEditingProduct(prev => ({
        ...prev,
        [name]: name === 'price' || name === 'discountPrice' || name === 'stock' 
                ? parseFloat(value) || 0 
                : value
      }));
    } else {
      setNewProduct(prev => ({
        ...prev,
        [name]: name === 'price' || name === 'discountPrice' || name === 'stock' 
                ? parseFloat(value) || 0 
                : value
      }));
    }
  };

  return (
    <div className="admin-products">
      <div className="admin-header">
        <h1>Manajemen Produk</h1>
        <button 
          className="btn btn-primary"
          onClick={() => setShowAddModal(true)}
        >
          <FaPlus /> Tambah Produk
        </button>
      </div>

      {/* Filters */}
      <div className="filters-bar">
        <div className="search-box">
          <FaSearch />
          <input
            type="text"
            placeholder="Cari produk..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="filter-group">
          <FaFilter />
          <select 
            value={selectedCategory} 
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="all">Semua Kategori</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="products-table-container">
        <table className="products-table">
          <thead>
            <tr>
              <th>Gambar</th>
              <th>Nama Produk</th>
              <th>Kategori</th>
              <th>Harga</th>
              <th>Stok</th>
              <th>Rating</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map(product => (
              <tr key={product.id}>
                <td>
                  <img src={product.image} alt={product.name} className="product-thumb" />
                </td>
                <td>{product.name}</td>
                <td>
                  <span className="category-badge">{product.category}</span>
                </td>
                <td>
                  <div className="price-display">
                    {product.discountPrice ? (
                      <>
                        <span className="discounted">Rp {product.discountPrice.toLocaleString()}</span>
                        <span className="original">Rp {product.price.toLocaleString()}</span>
                      </>
                    ) : (
                      <span>Rp {product.price.toLocaleString()}</span>
                    )}
                  </div>
                </td>
                <td>
                  <span className={`stock-badge ${product.stock > 0 ? 'in-stock' : 'out-stock'}`}>
                    {product.stock}
                  </span>
                </td>
                <td>
                  <div className="rating-display">
                    <span className="stars">{"★".repeat(Math.floor(product.rating))}</span>
                    <span className="rating-value">{product.rating.toFixed(1)}</span>
                  </div>
                </td>
                <td>
                  <div className="action-buttons">
                    <button 
                      className="btn-edit"
                      onClick={() => handleEditProduct(product)}
                    >
                      <FaEdit />
                    </button>
                    <button 
                      className="btn-delete"
                      onClick={() => handleDeleteClick(product)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Tambah Produk Baru</h2>
            <div className="form-grid">
              <div className="form-group">
                <label>Nama Produk</label>
                <input
                  type="text"
                  name="name"
                  value={newProduct.name}
                  onChange={handleInputChange}
                  placeholder="Masukkan nama produk"
                />
              </div>
              <div className="form-group">
                <label>Kategori</label>
                <select
                  name="category"
                  value={newProduct.category}
                  onChange={handleInputChange}
                >
                  {categories.filter(c => c.id !== 'all').map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Harga Normal (Rp)</label>
                <input
                  type="number"
                  name="price"
                  value={newProduct.price}
                  onChange={handleInputChange}
                  placeholder="0"
                />
              </div>
              <div className="form-group">
                <label>Harga Diskon (Rp) - Optional</label>
                <input
                  type="number"
                  name="discountPrice"
                  value={newProduct.discountPrice}
                  onChange={handleInputChange}
                  placeholder="0"
                />
              </div>
              <div className="form-group full-width">
                <label>Deskripsi</label>
                <textarea
                  name="description"
                  value={newProduct.description}
                  onChange={handleInputChange}
                  placeholder="Deskripsi produk"
                  rows="3"
                />
              </div>
              <div className="form-group">
                <label>Stok</label>
                <input
                  type="number"
                  name="stock"
                  value={newProduct.stock}
                  onChange={handleInputChange}
                  placeholder="10"
                />
              </div>
              <div className="form-group full-width">
                <label>URL Gambar</label>
                <input
                  type="text"
                  name="image"
                  value={newProduct.image}
                  onChange={handleInputChange}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
            </div>
            <div className="modal-actions">
              <button 
                className="btn btn-secondary"
                onClick={() => setShowAddModal(false)}
              >
                Batal
              </button>
              <button 
                className="btn btn-primary"
                onClick={handleAddProduct}
              >
                Simpan Produk
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Product Modal */}
      {editingProduct && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Edit Produk</h2>
            <div className="form-grid">
              <div className="form-group">
                <label>Nama Produk</label>
                <input
                  type="text"
                  name="name"
                  value={editingProduct.name}
                  onChange={(e) => handleInputChange(e, true)}
                />
              </div>
              <div className="form-group">
                <label>Kategori</label>
                <select
                  name="category"
                  value={editingProduct.category}
                  onChange={(e) => handleInputChange(e, true)}
                >
                  {categories.filter(c => c.id !== 'all').map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Harga Normal (Rp)</label>
                <input
                  type="number"
                  name="price"
                  value={editingProduct.price}
                  onChange={(e) => handleInputChange(e, true)}
                />
              </div>
              <div className="form-group">
                <label>Harga Diskon (Rp)</label>
                <input
                  type="number"
                  name="discountPrice"
                  value={editingProduct.discountPrice || 0}
                  onChange={(e) => handleInputChange(e, true)}
                />
              </div>
              <div className="form-group full-width">
                <label>Deskripsi</label>
                <textarea
                  name="description"
                  value={editingProduct.description}
                  onChange={(e) => handleInputChange(e, true)}
                  rows="3"
                />
              </div>
              <div className="form-group">
                <label>Stok</label>
                <input
                  type="number"
                  name="stock"
                  value={editingProduct.stock}
                  onChange={(e) => handleInputChange(e, true)}
                />
              </div>
              <div className="form-group full-width">
                <label>URL Gambar</label>
                <input
                  type="text"
                  name="image"
                  value={editingProduct.image}
                  onChange={(e) => handleInputChange(e, true)}
                />
              </div>
            </div>
            <div className="modal-actions">
              <button 
                className="btn btn-secondary"
                onClick={() => setEditingProduct(null)}
              >
                Batal
              </button>
              <button 
                className="btn btn-primary"
                onClick={handleUpdateProduct}
              >
                Update Produk
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Hapus Produk</h2>
            <p>Apakah Anda yakin ingin menghapus produk "{productToDelete?.name}"?</p>
            <p className="warning-text">Tindakan ini tidak dapat dibatalkan.</p>
            <div className="modal-actions">
              <button 
                className="btn btn-secondary"
                onClick={() => setShowDeleteModal(false)}
              >
                Batal
              </button>
              <button 
                className="btn btn-danger"
                onClick={handleDeleteConfirm}
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;