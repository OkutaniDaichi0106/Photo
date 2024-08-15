import React from 'react';
import styles from './Button2.module.css';

const Button2 = ({ onClick }) => {
    return (
        <div legacyBehavior>
            <a className={styles.btn} onClick={onClick}>
                ルーム作成
            </a>
        </div>
    );
};

export default Button2;