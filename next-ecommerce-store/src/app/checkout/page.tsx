'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import styles from './Checkout.module.css';

export default function CheckoutPage() {
  const { cart, getCartTotal, clearCart } = useCart();
  const [isOrdered, setIsOrdered] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    zipCode: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  });

  const [orderNumber, setOrderNumber] = useState('');

  const total = getCartTotal() > 50 ? getCartTotal() : getCartTotal() + 10;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      setOrderNumber(`NS-${Math.floor(Math.random() * 1000000)}`);
      setIsOrdered(true);
      clearCart();
    }, 1500);
  };

  if (isOrdered) {
    return (
      <div className={`container ${styles.successPage}`}>
        <div className={styles.successIcon}>✓</div>
        <h1>Order Successful!</h1>
        <p>Thank you for your purchase. Your order number is #{orderNumber}.</p>
        <p>We&apos;ve sent a confirmation email to {formData.email}.</p>
        <Link href="/" className="btn btn-primary">
          Back to Shopping
        </Link>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className={`container ${styles.emptyCart}`}>
        <h2>Checkout is not available</h2>
        <p>Your cart is empty. Please add items before checking out.</p>
        <Link href="/" className="btn btn-primary">
          Back to Store
        </Link>
      </div>
    );
  }

  return (
    <div className="container">
      <h1 className={styles.checkoutTitle}>Checkout</h1>
      
      <div className={styles.checkoutLayout}>
        <form className={styles.checkoutForm} onSubmit={handleSubmit}>
          <div className={styles.formSection}>
            <h3>Shipping Information</h3>
            <div className={styles.formGroup}>
              <label>Full Name</label>
              <input 
                type="text" 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                required 
                placeholder="Ibrahim Momoh"
              />
            </div>
            <div className={styles.formGroup}>
              <label>Email Address</label>
              <input 
                type="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                required 
                placeholder="ibrahim@example.com"
              />
            </div>
            <div className={styles.formGroup}>
              <label>Address</label>
              <input 
                type="text" 
                name="address" 
                value={formData.address} 
                onChange={handleChange} 
                required 
              />
            </div>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label>City</label>
                <input 
                  type="text" 
                  name="city" 
                  value={formData.city} 
                  onChange={handleChange} 
                  required 
                />
              </div>
              <div className={styles.formGroup}>
                <label>Zip Code</label>
                <input 
                  type="text" 
                  name="zipCode" 
                  value={formData.zipCode} 
                  onChange={handleChange} 
                  required 
                />
              </div>
            </div>
          </div>

          <div className={styles.formSection}>
            <h3>Payment Details</h3>
            <div className={styles.formGroup}>
              <label>Card Number</label>
              <input 
                type="text" 
                name="cardNumber" 
                value={formData.cardNumber} 
                onChange={handleChange} 
                required 
                placeholder="0000 0000 0000 0000"
              />
            </div>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label>Expiry Date</label>
                <input 
                  type="text" 
                  name="expiry" 
                  value={formData.expiry} 
                  onChange={handleChange} 
                  required 
                  placeholder="MM/YY"
                />
              </div>
              <div className={styles.formGroup}>
                <label>CVV</label>
                <input 
                  type="text" 
                  name="cvv" 
                  value={formData.cvv} 
                  onChange={handleChange} 
                  required 
                  placeholder="123"
                />
              </div>
            </div>
          </div>

          <button type="submit" className={`btn btn-primary ${styles.placeOrderBtn}`}>
            Place Order (${total.toFixed(2)})
          </button>
        </form>

        <div className={styles.orderSummary}>
          <h3>Your Order</h3>
          <div className={styles.summaryItems}>
            {cart.map(item => (
              <div key={item.id} className={styles.summaryItem}>
                <span>{item.name} x {item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className={styles.summaryTotal}>
            <div className={styles.summaryRow}>
              <span>Subtotal</span>
              <span>${getCartTotal().toFixed(2)}</span>
            </div>
            <div className={styles.summaryRow}>
              <span>Shipping</span>
              <span>{getCartTotal() > 50 ? 'FREE' : '$10.00'}</span>
            </div>
            <div className={`${styles.summaryRow} ${styles.totalFinal}`}>
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
