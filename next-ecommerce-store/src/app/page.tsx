import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import styles from './page.module.css';
import ProductCard from '@/components/ProductCard/ProductCard';

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

const getProducts = (): Product[] => {
  const filePath = path.join(process.cwd(), 'data', 'products.json');
  const jsonData = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(jsonData);
};

export default function Home({ searchParams }: { searchParams: { category?: string } }) {
  const allProducts = getProducts();
  const selectedCategory = searchParams.category;
  
  const products = selectedCategory 
    ? allProducts.filter(p => p.category === selectedCategory)
    : allProducts;

  const categories = Array.from(new Set(allProducts.map(p => p.category)));

  return (
    <div className="container">
      <header className={styles.hero}>
        <h1>Discover Modern Style</h1>
        <p>Explore our curated collection of premium essentials.</p>
      </header>

      <div className={styles.categoryNav}>
        <Link 
          href="/" 
          className={`${styles.categoryBtn} ${!selectedCategory ? styles.activeCategory : ''}`}
        >
          All Products
        </Link>
        {categories.map(cat => (
          <Link 
            key={cat} 
            href={`/?category=${encodeURIComponent(cat)}`}
            className={`${styles.categoryBtn} ${selectedCategory === cat ? styles.activeCategory : ''}`}
          >
            {cat}
          </Link>
        ))}
      </div>

      <section className={styles.productGrid}>
        {products.map((product, index) => (
          <div 
            key={product.id} 
            className={styles.productCardWrapper}
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <ProductCard product={product} />
          </div>
        ))}
      </section>
      
      {products.length === 0 && (
        <div style={{ textAlign: 'center', padding: '60px' }}>
          <h3>No products in this category yet.</h3>
          <Link href="/" className="btn btn-primary" style={{ marginTop: '20px' }}>
            Show All Products
          </Link>
        </div>
      )}
    </div>
  );
}
