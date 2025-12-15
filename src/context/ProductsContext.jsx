import React, { createContext, useState, useContext, useCallback } from 'react';
import products, { categories } from '../data/products';

const ProductsContext = createContext();

export const useProducts = () => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductsProvider');
  }
  return context;
};

export const ProductsProvider = ({ children }) => {
  const [allProducts, setAllProducts] = useState(products);
  const [filteredProducts, setFilteredProducts] = useState(products);

  const searchProducts = useCallback((query = '', category = 'all') => {
    let filtered = allProducts;
    
    // Filter by search query
    if (query) {
      const searchLower = query.toLowerCase();
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchLower) ||
        product.description.toLowerCase().includes(searchLower) ||
        product.category.toLowerCase().includes(searchLower)
      );
    }
    
    // Filter by category
    if (category !== 'all') {
      filtered = filtered.filter(product => product.category === category);
    }
    
    setFilteredProducts(filtered);
    return filtered;
  }, [allProducts]);

  const getProductById = (id) => {
    return allProducts.find(product => product.id === parseInt(id));
  };

  const getFeaturedProducts = () => {
    return allProducts.filter(product => product.featured);
  };

  const addProduct = (product) => {
    const newProduct = {
      ...product,
      id: Math.max(...allProducts.map(p => p.id)) + 1,
      rating: 0,
      reviewCount: 0,
      stock: product.stock || 10
    };
    
    setAllProducts(prev => [...prev, newProduct]);
    setFilteredProducts(prev => [...prev, newProduct]);
    return newProduct;
  };

  const updateProduct = (id, updatedData) => {
    setAllProducts(prev =>
      prev.map(product =>
        product.id === id ? { ...product, ...updatedData } : product
      )
    );
    setFilteredProducts(prev =>
      prev.map(product =>
        product.id === id ? { ...product, ...updatedData } : product
      )
    );
  };

  const deleteProduct = (id) => {
    setAllProducts(prev => prev.filter(product => product.id !== id));
    setFilteredProducts(prev => prev.filter(product => product.id !== id));
  };

  const value = {
    products: allProducts,
    filteredProducts,
    categories,
    searchProducts,
    getProductById,
    getFeaturedProducts,
    addProduct,
    updateProduct,
    deleteProduct
  };

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsContext;