import { createClient } from "@supabase/supabase-js";
import { useState } from 'react';
import Image from 'next/image';
import styles from '../styles/result.module.css';

/* SupaBase */
// Constant to identifies the DB server
const PROJECT_URL = "https://khbecgwvsbdguigjapru.supabase.co";
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtoYmVjZ3d2c2JkZ3VpZ2phcHJ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjM1MjY4MzYsImV4cCI6MjAzOTEwMjgzNn0.X8PCdQimHNp0hZoGVorEC1-W5HiYxXK2QtvWi99Jycw";
// All tables
const ROOMS_TABLE = "rooms";
const POSTS_TABLE = "posts";
const STARS_TABLE = "stars";
// Create client querys to the DB server
let client = createClient(PROJECT_URL, API_KEY);

const ImageGallery = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const images = [
        '/IMG_9986.jpg',
        '/IMG_7187.jpg',
        '/IMG_7203.jpg',
        '/IMG_9950.jpg',
        '/IMG_9964.jpg',
        '/030_2048.jpg',
        '/IMGP3543.jpg',
        // 必要な数だけ画像パスを追加
    ];

    const explanation = {
        "0": "hello",
        "1": "こんにちは",
        "4": "ola",
        "6": "bye",
    };

    const getRankLabel = (index) => {
        if (index === 0) return '/1st.png';
        if (index === 1) return '/2nd.png';
        if (index === 2) return '/3rd.png';
        return null;
    };

    const openDialog = (src, index) => {
        setSelectedImage({ src, index });
    };

    const closeDialog = () => {
        setSelectedImage(null);
    };

    return (
        <div className={styles.galleryContainer}>
            <div className={styles.result}>
                {images.map((src, index) => (
                    <div key={index} className={styles.imagecontainer} onClick={() => openDialog(src, index)}>
                        <Image
                            src={src}
                            alt={`Image ${index + 1}`}
                            layout="responsive"
                            width={300}
                            height={400}
                            objectFit="cover"
                        />
                        {index < 3 && (
                            <div className={styles.rankLabel}>
                                <Image
                                    src={getRankLabel(index)}
                                    alt={`Rank ${index + 1}`}
                                    width={40}
                                    height={40}
                                    layout="responsive"
                                />
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {selectedImage && (
                <div className={styles.dialogOverlay} onClick={closeDialog}>
                    <div className={styles.dialogContent} onClick={(e) => e.stopPropagation()}>
                        <Image
                            src={selectedImage.src}
                            alt="Selected image"
                            layout="responsive"
                            width={600}
                            height={800}
                            objectFit="contain"
                        />
                        <p style={{ color: explanation[selectedImage.index] ? 'inherit' : 'gray' }}>{explanation[selectedImage.index] || '説明がありません'}</p>
                        <button className={styles.closeButton} onClick={closeDialog}>閉じる</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ImageGallery;