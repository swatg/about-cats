import React from 'react';
// Styles
import styles from './style/navbar.module.css';

function NavBar() {
  return (
    <nav className={styles.container}>
      <ul>
        <li>
          <a
            href="/"
          >
            HOME
          </a>
        </li>
        <li>
          <a
            href="/upload"
          >
            UPLOAD
          </a>
        </li>
      </ul>
    </nav>
  )
}

export default NavBar;
