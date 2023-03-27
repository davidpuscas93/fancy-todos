import React from 'react';
import cls from 'classnames';

import styles from './button.module.css';

type ButtonProps = {
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  isDelete?: boolean;
  onClick?: () => void;
};

const Button = ({ children, ...props }: ButtonProps) => {
  return (
    <button
      disabled={props.disabled}
      onClick={props.onClick}
      type={props.type}
      className={cls(
        styles.button,
        props.isDelete ? styles.delete : styles.default
      )}
    >
      {children}
    </button>
  );
};

export default Button;
