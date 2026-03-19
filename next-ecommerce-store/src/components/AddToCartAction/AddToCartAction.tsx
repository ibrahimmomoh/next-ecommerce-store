'use client';

import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { Product } from '@/app/page';
import styles from './AddToCartAction.module.css';

interface Props {
  product: Product;
}

const AddToCartAction = ({ product }: Props) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const handleIncrement = () => setQuantity(prev => prev + 1);
  const handleDecrement = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = () => {
    addToCart(product, quantity);
    alert(`${quantity} ${product.name} added to cart!`);
  };

  return (
    <div className={styles.actions}>
      <div className={styles.quantity}>
        <button onClick={handleDecrement}>-</button>
        <span>{quantity}</span>
        <button onClick={handleIncrement}>+</button>
      </div>
      <button 
        className="btn btn-primary" 
        style={{ padding: '10px 30px', fontSize: '1.1rem' }}
        onClick={handleAddToCart}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default AddToCartAction;
