// ============================================================
// ForgeMES — App Entry
// ============================================================

import { RouterProvider } from 'react-router-dom';
import { router } from '@/routes';
import { useEffect } from 'react';

export default function App() {
  // Initialize dark mode from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('forgemes-dark-mode');
    if (saved === 'true') {
      document.documentElement.classList.add('dark');
    }
  }, []);

  return <RouterProvider router={router} />;
}
