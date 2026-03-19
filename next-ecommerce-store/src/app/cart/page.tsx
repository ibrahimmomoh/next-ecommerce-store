'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import styles from './Cart.module.css';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, getCartTotal } = useCart();

  if (cart.length === 0) {
    return (
      <div className={`container ${styles.emptyCart}`}>
        <h2>Your cart is empty</h2>
        <p>Looks like you haven&apos;t added anything yet.</p>
        <Link href="/" className="btn btn-primary">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container">
      <h1 className={styles.cartTitle}>Your Shopping Cart</h1>
      
      <div className={styles.cartLayout}>
        <div className={styles.cartItems}>
          {cart.map((item) => (
            <div key={item.id} className={styles.cartItem}>
              <div className={styles.itemImage}>
                <Image 
                  src={item.image} 
                  alt={item.name} 
                  width={100}
                  height={120}
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className={styles.itemInfo}>
                <Link href={`/products/${item.id}`} className={styles.itemName}>
                  {item.name}
                </Link>
                <p className={styles.itemCategory}>{item.category}</p>
                <p className={styles.itemPrice}>${item.price.toFixed(2)}</p>
                <button 
                  className={styles.removeBtn}
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
              <div className={styles.itemQuantity}>
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
              </div>
              <div className={styles.itemTotal}>
                ${(item.price * item.quantity).toFixed(2)}
              </div>
            </div>
          ))}
        </div>

        <div className={styles.cartSummary}>
          <h3>Order Summary</h3>
          <div className={styles.summaryRow}>
            <span>Subtotal</span>
            <span>${getCartTotal().toFixed(2)}</span>
          </div>
          <div className={styles.summaryRow}>
            <span>Shipping</span>
            <span>{getCartTotal() > 50 ? 'FREE' : '$10.00'}</span>
          </div>
          <div className={`${styles.summaryRow} ${styles.totalRow}`}>
            <span>Total</span>
            <span>${(getCartTotal() > 50 ? getCartTotal() : getCartTotal() + 10).toFixed(2)}</span>
          </div>
          <Link href="/checkout" className={`btn btn-primary ${styles.checkoutBtn}`}>
            Proceed to Checkout
          </Link>
          <Link href="/" className={styles.continueShopping}>
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
