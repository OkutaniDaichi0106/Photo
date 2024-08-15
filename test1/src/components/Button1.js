import React from 'react';
import styles from './Button1.module.css';

const Button1 = ({ onClick }) => {
    return (
        <div legacyBehavior>
            <a className={styles.btn} onClick={onClick}>
                ルーム参加
            </a>
        </div>
    );
};

export default Button1;