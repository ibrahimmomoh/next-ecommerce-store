'use client';

import Link from 'next/link';
import Image from 'next/image';
import styles from './ProductCard.module.css';
import { Product } from '@/app/page';
import { useCart } from '@/context/CartContext';

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  const { addToCart } = useCart();

  return (
    <div className={styles.card}>
      <Link href={`/products/${product.id}`} className={styles.imageWrapper}>
        <Image 
          src={product.image} 
          alt={product.name} 
          className={styles.image}
          width={400}
          height={500}
          priority={false}
        />
      </Link>
      <div className={styles.info}>
        <p className={styles.category}>{product.category}</p>
        <h3 className={styles.name}>
          <Link href={`/products/${product.id}`}>{product.name}</Link>
        </h3>
        <p className={styles.price}>${product.price.toFixed(2)}</p>
        <button 
          onClick={() => addToCart(product)}
          className={`btn btn-primary ${styles.addButton}`}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
