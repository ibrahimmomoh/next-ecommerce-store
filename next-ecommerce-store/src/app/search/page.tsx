'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductCard from '@/components/ProductCard/ProductCard';
import { Product } from '@/app/page';
import styles from '../page.module.css';

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/products/search?q=${encodeURIComponent(query || '')}`);
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Failed to fetch search results', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [query]);

  return (
    <div className="container" style={{ minHeight: '60vh' }}>
      <header className={styles.hero} style={{ padding: '60px 0 20px' }}>
        <h1>Search Results</h1>
        <p>Showing results for: &quot;<strong>{query}</strong>&quot;</p>
      </header>

      {loading ? (
        <p style={{ textAlign: 'center', margin: '40px 0' }}>Searching for products...</p>
      ) : products.length > 0 ? (
        <section className={styles.productGrid}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </section>
      ) : (
        <div style={{ textAlign: 'center', padding: '60px 20px' }}>
          <h3>No products found</h3>
          <p style={{ color: 'var(--text-light)', marginTop: '10px' }}>
            Try searching for something else, like &quot;iPhone&quot; or &quot;PS5&quot;.
          </p>
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="container" style={{ textAlign: 'center', padding: '100px' }}>Loading search...</div>}>
      <SearchResults />
    </Suspense>
  );
}
