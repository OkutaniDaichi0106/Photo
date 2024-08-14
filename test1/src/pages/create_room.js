'use client';

import { useState } from 'react';

export default function Home() {
    const [text, setText] = useState('');
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

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


        //画像はimage、テキストはtext変数　これらをDBに送信する 
    };

    return (
        <div>
            <h1>画像とテキストの入力フォーム</h1>
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
            </form>
        </div>
    );
}
