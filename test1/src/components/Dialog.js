import React from 'react';
import { useRouter } from 'next/router';

const Dialog = ({ isOpen, onClose }) => {
    const router = useRouter();

    if (!isOpen) {
        return null;
    }

    const handleOk = () => {
        onClose();
        router.push('/vote');
    };

    return (
        <div style={styles.overlay}>
            <div style={styles.dialog}>
                <p>投稿が完了しました。</p>
                <button onClick={handleOk}>OK</button>
                <button onClick={onClose}>Cancel</button>
            </div>
        </div>
    );
};

const styles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    dialog: {
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '5px',
        textAlign: 'center',
    },
};

export default Dialog;
