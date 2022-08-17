import React from 'react';
import styles from './styles.module.css';

export const Button = ({
    text,
    type
}) => {
    return <>
        <button 
            className={styles.button} 
            type={type}
        >
            {text}
        </button>
    </>
}