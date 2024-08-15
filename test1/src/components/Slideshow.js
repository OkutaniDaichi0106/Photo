// components/Slideshow.js
import React from 'react';
import Slider from 'react-slick';
import Image from 'next/image';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from './Slideshow.module.css'; // CSSモジュールをインポート

const Slideshow = () => {
    const settings = {
        dots: false,
        allows: false,
        infinite: true,
        autoplay: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: false,
        nextArrow: false,

    };

    return (
        <div>
            <Slider {...settings}>
                <div className={styles.slide}>
                    <Image
                        src="/images/image1.jpg"
                        alt="Image 1"
                        layout="fill"
                        objectFit="cover"
                    />
                </div>
                <div className={styles.slide}>
                    <Image
                        src="/images/image2.jpg"
                        alt="Image 2"
                        layout="fill"
                        objectFit="cover"
                    />
                </div>
                <div className={styles.slide}>
                    <Image
                        src="/images/image3.jpg"
                        alt="Image 3"
                        layout="fill"
                        objectFit="cover"
                    />
                </div>
            </Slider>
        </div>
    );
};

export default Slideshow;
