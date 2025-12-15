export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePhone = (phone) => {
  const re = /^[0-9]{10,13}$/;
  return re.test(phone);
};

export const validatePostalCode = (code) => {
  const re = /^[0-9]{5}$/;
  return re.test(code);
};

export const validatePassword = (password) => {
  // At least 6 characters
  return password.length >= 6;
};

export const validateCreditCard = (cardNumber) => {
  // Remove spaces and dashes
  const cleaned = cardNumber.replace(/[\s-]/g, '');
  
  // Check if it's a number
  if (!/^\d+$/.test(cleaned)) {
    return false;
  }
  
  // Check length (typically 13-19 digits)
  if (cleaned.length < 13 || cleaned.length > 19) {
    return false;
  }
  
  // Luhn algorithm check
  let sum = 0;
  let isEven = false;
  
  for (let i = cleaned.length - 1; i >= 0; i--) {
    let digit = parseInt(cleaned.charAt(i), 10);
    
    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    
    sum += digit;
    isEven = !isEven;
  }
  
  return sum % 10 === 0;
};

export const validateCVV = (cvv) => {
  return /^[0-9]{3,4}$/.test(cvv);
};

export const validateExpiryDate = (date) => {
  const re = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
  if (!re.test(date)) return false;
  
  const [month, year] = date.split('/');
  const now = new Date();
  const currentYear = now.getFullYear() % 100;
  const currentMonth = now.getMonth() + 1;
  
  if (parseInt(year, 10) < currentYear) return false;
  if (parseInt(year, 10) === currentYear && parseInt(month, 10) < currentMonth) return false;
  
  return true;
};