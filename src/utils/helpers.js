export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(amount);
};

export const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

export const calculateDiscount = (originalPrice, discountPrice) => {
  if (!discountPrice) return 0;
  const discount = ((originalPrice - discountPrice) / originalPrice) * 100;
  return Math.round(discount);
};

export const getCartSummary = (cartItems) => {
  const subtotal = cartItems.reduce(
    (total, item) => total + (item.discountPrice || item.price) * item.quantity,
    0
  );
  
  const shipping = subtotal > 2000000 ? 0 : 50000;
  const tax = subtotal * 0.11;
  const total = subtotal + shipping + tax;
  
  return {
    subtotal,
    shipping,
    tax,
    total,
    itemCount: cartItems.reduce((count, item) => count + item.quantity, 0)
  };
};

export const generateOrderNumber = () => {
  const timestamp = Date.now().toString().slice(-8);
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `ORD-${timestamp}-${random}`;
};

export const sortProducts = (products, sortBy) => {
  const sorted = [...products];
  
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

export const filterProducts = (products, filters) => {
  let filtered = [...products];
  
  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    filtered = filtered.filter(product =>
      product.name.toLowerCase().includes(searchLower) ||
      product.description.toLowerCase().includes(searchLower) ||
      product.category.toLowerCase().includes(searchLower)
    );
  }
  
  if (filters.category && filters.category !== 'all') {
    filtered = filtered.filter(product => product.category === filters.category);
  }
  
  if (filters.minPrice) {
    filtered = filtered.filter(product => 
      (product.discountPrice || product.price) >= filters.minPrice
    );
  }
  
  if (filters.maxPrice) {
    filtered = filtered.filter(product => 
      (product.discountPrice || product.price) <= filters.maxPrice
    );
  }
  
  if (filters.rating) {
    filtered = filtered.filter(product => product.rating >= filters.rating);
  }
  
  return filtered;
};