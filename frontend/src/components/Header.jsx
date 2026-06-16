import React, { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

export default function Header() {
  const location = useLocation();

  // 1. Dynamic Page Title Generation based on current URL path
  const pageTitle = useMemo(() => {
    // Basic formatting: Capitalize and remove leading slash
    const formatTitle = (path) => {
      if (path === '/') return 'Dashboard'; // Special case for root path
      return path.charAt(1).toUpperCase() + path.slice(2).replace(/-/g, ' '); // Capitalize and replace hyphens with spaces
    };

    return formatTitle(location.pathname);
  }, [location.pathname]);


  // 2. Dynamic Today's Date Calculation (re-calculated on render, always current)
  const todayDateFormatted = useMemo(() => {
    return new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }, []); // Re-calculated only on initial mount or full page refresh


  return (
    <header className="bg-white px-8 py-6 flex justify-between items-center border-b">
      <div>
        {/* DISPLAY CURRENT PAGE TITLE DYNAMICALLY */}
        <h2 className="text-2xl font-bold text-brand-burgundy">{pageTitle}</h2>
        {/* DISPLAY TODAY'S DATE DYNAMICALLY */}
        <p className="text-sm text-brand-burgundy">{todayDateFormatted}</p>
      </div>
    </header>
  );
}