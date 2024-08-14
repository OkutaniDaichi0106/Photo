import React from 'react';
import Link from 'next/link';
import styles from './Button1.module.css';

const Button2 = () => {
    return (
        <Link href="tel:0120-12-3456" legacyBehavior>
            <a className={styles.btn}>
                <i className="fas fa-phone-alt"></i> ルーム作成<br />
            </a>
        </Link>
    );
};

export default Button2;