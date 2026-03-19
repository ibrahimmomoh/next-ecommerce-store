import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import styles from './ProductDetail.module.css';
import { Product } from '@/app/page';
import AddToCartAction from '@/components/AddToCartAction/AddToCartAction';

const getProduct = (id: string): Product | undefined => {
  const filePath = path.join(process.cwd(), 'data', 'products.json');
  const jsonData = fs.readFileSync(filePath, 'utf8');
  const products: Product[] = JSON.parse(jsonData);
  return products.find((p) => p.id === id);
};

export async function generateStaticParams() {
  const filePath = path.join(process.cwd(), 'data', 'products.json');
  const jsonData = fs.readFileSync(filePath, 'utf8');
  const products: Product[] = JSON.parse(jsonData);
  
  return products.map((p) => ({
    id: p.id,
  }));
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = getProduct(params.id);

  if (!product) {
    notFound();
  }

  return (
    <div className="container">
      <div className={styles.breadcrumb}>
        <Link href="/">Home</Link> / <Link href="/">{product.category}</Link> / {product.name}
      </div>

      <div className={styles.productLayout}>
        <div className={styles.imageSection}>
          <Image 
            src={product.image} 
            alt={product.name} 
            className={styles.mainImage}
            width={600}
            height={700}
            priority={true}
          />
        </div>

        <div className={styles.infoSection}>
          <p className={styles.categoryBadge}>{product.category}</p>
          <h1 className={styles.title}>{product.name}</h1>
          <p className={styles.price}>${product.price.toFixed(2)}</p>
          
          <div className={styles.description}>
            <h3>Description</h3>
            <p>{product.description}</p>
          </div>

          <AddToCartAction product={product} />

          <div className={styles.features}>
            <div className={styles.featureItem}>
              <span>🚚</span> Free shipping on orders over $50
            </div>
            <div className={styles.featureItem}>
              <span>🔄</span> 30-day money-back guarantee
            </div>
            <div className={styles.featureItem}>
              <span>🛡️</span> Secure payment processing
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
