// src/utils/auth.js
export const isAdmin = () => {
  if (typeof window === 'undefined') return false;
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  return user.role === 'admin';
};

export const getCurrentUser = () => {
  if (typeof window === 'undefined') return null;
  return JSON.parse(localStorage.getItem('user') || 'null');
};

export const isAuthenticated = () => {
  if (typeof window === 'undefined') return false;
  return !!localStorage.getItem('token');
};