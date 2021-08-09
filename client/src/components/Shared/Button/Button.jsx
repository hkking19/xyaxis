import React from 'react';
import styles from './Button.module.css';

const Button = ({ text, onClick,color,bgColor }) => {
    return (
        <button style={{color,backgroundColor:bgColor}} onClick={onClick} className={styles.button}>
            <span>{text}</span>
        </button>
    );
};
export default Button;