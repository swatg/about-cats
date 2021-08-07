import React from 'react';
import { Link } from 'react-router-dom';
// Assets
import Icon from 'assests/Icon';
// Components
import NavBar from 'components/NavBar';
// Style
import styles from './style/header.module.css';

function Header() {
  return (
    <header className={`${styles.container} wrapper`}>
      <div className={`${styles.content} wrapper__content`}>
        <div>
          <Link to="/">
            <Icon
              icon="Cat"
              fill="white"
              size={48}
            />
          </Link>
        </div>
        <NavBar />
      </div>
    </header>
  );
}

export default Header;
