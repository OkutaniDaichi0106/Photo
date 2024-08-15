'use client';

import Header from '../components/Header';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Dialog from '../components/Dialog';

export default function Home() {
    const [text, setText] = useState('');
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const router = useRouter();

    // 遷移したい時間を設定（例：2023年8月15日 15:00:00）
    const targetTime = new Date('2025-08-15T18:00:00').getTime();

    const handleTextChange = (e) => {
        setText(e.target.value);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        setImagePreview(URL.createObjectURL(file));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // フォームのデータを処理する
        console.log('画像ファイル:', image);
        console.log('テキスト:', text);

        openDialog();


        //画像はimage、テキストはtext変数　これらをDBに送信する 
    };

    useEffect(() => {

        const timer = setInterval(() => {
            const now = new Date().getTime();
            const difference = targetTime - now;

            if (difference <= 0) {
                clearInterval(timer);
                // 指定時間になったら '/next-page' に遷移
                router.push('/vote');
            }
        }, 1000); // 1秒ごとにチェック

        return () => clearInterval(timer);
    }, [router]);
    // ダイアログ関連
    const [isDialogOpen, setDialogOpen] = useState(false);
    const openDialog = () => {
        setDialogOpen(true);
    };
    const closeDialog = () => {
        setDialogOpen(false);
    };


    return (
        <div>
            <Header />
            <form onSubmit={handleSubmit}>
                <div>
                    <div>
                        <label htmlFor="image">画像:</label>
                        <input
                            type="file"
                            id="image"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                    </div>
                    {imagePreview && (
                        <div>
                            <p>画像プレビュー:</p>
                            <img src={imagePreview} alt="Image Preview" style={{ maxWidth: '200px' }} />
                        </div>
                    )}
                    <label htmlFor="text">テキスト:</label>

                    <input
                        type="text"
                        id="text"
                        value={text}
                        onChange={handleTextChange}
                    />
                </div>

                <button type="submit">送信</button>
                <Dialog isOpen={isDialogOpen} onClose={closeDialog} />
            </form>
        </div>
    );
}
