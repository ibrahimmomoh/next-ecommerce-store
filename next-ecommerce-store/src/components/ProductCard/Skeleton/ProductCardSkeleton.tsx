import React from 'react';
import styles from './ProductCardSkeleton.module.css';

const ProductCardSkeleton = () => {
  return (
    <div className={styles.skeletonCard}>
      <div className={styles.skeletonImage}></div>
      <div className={styles.skeletonInfo}>
        <div className={styles.skeletonCategory}></div>
        <div className={styles.skeletonName}></div>
        <div className={styles.skeletonPrice}></div>
        <div className={styles.skeletonButton}></div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
