// pages/create.js
import { RegisterRoom } from '@/db/main';
import Header from '../components/Header';
import React, { useState } from 'react';

const CreateRoom = () => {
    const [formData, setFormData] = useState({
        endPostTime: '',
        endVoteTime: '',
        roomTitle: '',
        description: '',
        location: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form Data:', formData);
        // ここにデータ送信処理を追加します
        await RegisterRoom(formData.roomTitle, formData.description, formData.endVoteTime, formData.endPostTime)
    };

    return (
        <>
            <Header /><div style={styles.container}>
                <h1>Create a Room</h1>
                <form onSubmit={handleSubmit} style={styles.form}>
                    <div style={styles.formGroup}>
                        <label htmlFor="endPostTime">投稿期限:</label>
                        <input
                            type="datetime-local"
                            id="endPostTime"
                            name="endPostTime"
                            value={formData.endPostTime}
                            onChange={handleChange}
                            required />
                    </div>
                    <div style={styles.formGroup}>
                        <label htmlFor="endVoteTime">投票期限:</label>
                        <input
                            type="datetime-local"
                            id="endVoteTime"
                            name="endVoteTime"
                            value={formData.endVoteTime}
                            onChange={handleChange}
                            required />
                    </div>
                    <div style={styles.formGroup}>
                        <label htmlFor="roomTitle">ルームタイトル:</label>
                        <input
                            type="text"
                            id="roomTitle"
                            name="roomTitle"
                            value={formData.roomTitle}
                            onChange={handleChange}
                            required />
                    </div>

                    <div style={styles.formGroup}>
                        <label htmlFor="location">場所(任意):</label>
                        <input
                            type="text"
                            id="location"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                        />
                    </div>
                    <div style={styles.formGroup}>
                        <label htmlFor="description">説明:</label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required />
                    </div>
                    <button type="submit">作成</button>
                </form>
            </div></>
    );
};

const styles = {
    container: {
        maxWidth: '600px',
        margin: '0 auto',
        padding: '20px',
        textAlign: 'center',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
    },
    formGroup: {
        marginBottom: '15px',
        textAlign: 'left',
    },
    label: {
        marginBottom: '5px',
        fontWeight: 'bold',
    },
    input: {
        width: '100%',
        padding: '8px',
        boxSizing: 'border-box',
    },
    textarea: {
        width: '100%',
        padding: '8px',
        boxSizing: 'border-box',
        resize: 'vertical',
    },
    button: {
        padding: '10px',
        backgroundColor: '#0070f3',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
};

export default CreateRoom;
