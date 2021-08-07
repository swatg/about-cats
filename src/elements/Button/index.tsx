import React from 'react';
import { Link } from 'react-router-dom';
import styles from './style/button.module.css';

interface ButtonProps {
  btnType?: string,
  btnSize?: string,
  btnStyle?: string,
  children: React.ReactNode,
  disabled?: boolean,
  elevation?: string,
  handler?: Function,
  href?: string,
  id?: string,
  label?: string,
}

const Button = ({
  btnType,
  btnSize,
  btnStyle,
  children,
  disabled,
  elevation,
  handler,
  href,
  id,
  label,
}:ButtonProps) => {
  if (handler) {
    return (
      <button
        aria-label={label}
        className={`
          ${styles.button} 
          ${btnStyle ? styles[btnStyle] : ''} 
          ${btnSize ? styles[btnSize] : ''} 
          ${btnType ? styles[btnType] : ''}
        `}
        data-elevation={elevation}
        id={id}
        onClick={() => handler()}
        type="button"
        disabled={disabled}
      >
        { children }
      </button>
    );
  }
  if (href) {
    return (
      <Link
        aria-label={label}
        className={`
          ${styles.button} 
          ${btnStyle ? styles[btnStyle] : ''} 
          ${btnSize ? styles[btnSize] : ''} 
          ${btnType ? styles[btnType] : ''}
        `}
        data-elevation={elevation}
        id={id}
        to={href}
      >
        { children }
      </Link>
    );
  }
  return (
    <div
      aria-label={label}
      className={`
        ${styles.button} 
        ${btnStyle ? styles[btnStyle] : ''} 
        ${btnSize ? styles[btnSize] : ''} 
        ${btnType ? styles[btnType] : ''}
      `}
      data-elevation={elevation}
      id={id}
    >
      { children }
    </div>
  );
};

Button.defaultProps = {
  btnType: false,
  btnSize: false,
  btnStyle: 'default',
  disabled: false,
  elevation: '',
  handler: null,
  href: null,
  id: '',
  label: null,
};

export default Button;
