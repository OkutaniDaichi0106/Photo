import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from '../styles/result.module.css';
import Header from '../components/Header';
import { PROJECT_URL, API_KEY, POSTS_TABLE } from "@/db/main";

/* SupaBase */
// Create client querys to the DB server
let client = createClient(PROJECT_URL, API_KEY);

const ImageGallery = () => {
    /////
    useEffect(() => {
        (async function() {
            // Get all images of the same room ID
            const { data, error } = await client.from(POSTS_TABLE).select("*").eq("room_id", sessionStorage.getItem("roomID"))
            if (error) {
                console.error(error)
            }
            
            ///MAKE IMAGE ARRAY////
            for (let i = 0; i< data.length; i++) {
                images.push(data[i])
            }

        })()
    }

    )

    /////
    const [selectedImage, setSelectedImage] = useState(null);
    
    const images = [
        '/images/image1.jpg',
        '/images/image2.jpg',
        '/images/image1.jpg',
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
        <><Header />
            <div className={styles.galleryContainer}>

                <div className={styles.result}>
                    {images.map((src, index) => (
                        <div key={index} className={styles.imagecontainer} onClick={() => openDialog(src, index)}>
                            <div class="rank rank-1">
                                <Image
                                    src={src}
                                    alt={`Image ${index + 1}`}
                                    className={`${index + 1}`}
                                    layout="responsive"
                                    width={300}
                                    height={400}
                                    objectFit="cover" />
                            </div>
                            {index < 3 && (
                                <div className={styles.rankLabel}>
                                    <Image
                                        src={getRankLabel(index)}
                                        alt={`Rank ${index + 1}`}
                                        width={40}
                                        height={40}
                                        layout="responsive" />
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
                                objectFit="contain" />
                            <p style={{ color: explanation[selectedImage.index] ? 'inherit' : 'gray' }}>{explanation[selectedImage.index] || '説明がありません'}</p>
                            <button className={styles.closeButton} onClick={closeDialog}>閉じる</button>
                        </div>
                    </div>
                )}
            </div></>
    );
};

export default ImageGallery;