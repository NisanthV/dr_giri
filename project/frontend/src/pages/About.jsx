import React from 'react';
import styles from '../styles/About.module.css';

export default function About() {
  return (
    <div className={styles.aboutPage}>
      <h1>About Us</h1>
      <div className={styles.personSection}>
        <div className={styles.person}>
          <h2>Person 1</h2>
          <p>Details about person 1.</p>
        </div>
        <div className={styles.sideBySide}>
          <div className={styles.person}>
            <h2>Person 2</h2>
            <p>Details about person 2.</p>
          </div>
          <div className={styles.person}>
            <h2>Person 3</h2>
            <p>Details about person 3.</p>
          </div>
        </div>
      </div>
      <footer className={styles.footer}>
        <div className={styles.contact}>
          <h3>Contact Us</h3>
          <p>Email: contact@company.com</p>
          <p>Phone: +123 456 7890</p>
        </div>
        <div className={styles.companyDetails}>
          <h3>Company Details</h3>
          <p>Company Name: XYZ Ltd.</p>
          <p>Address: 123 Street, City, Country</p>
        </div>
      </footer>
    </div>
  );
}
