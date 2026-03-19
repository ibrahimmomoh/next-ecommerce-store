'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import styles from './Navbar.module.css';

const Navbar = () => {
  const { getCartCount } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  return (
    <nav className={styles.navbar}>
      <div className={`container ${styles.navContainer}`}>
        <Link href="/" className={styles.logo}>
          <span>Big</span>Techs
        </Link>

        <form className={styles.searchBar} onSubmit={handleSearch}>
          <input 
            type="text" 
            placeholder="Search products..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit">🔍</button>
        </form>

        <div className={styles.navLinks}>
          <Link href="/">Home</Link>
          <Link href="/cart" className={styles.cartLink}>
            Cart <span className="badge">{getCartCount()}</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
