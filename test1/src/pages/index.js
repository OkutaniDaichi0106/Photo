'use client';
import React from 'react';
import Header from '../components/Header';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Button1 from '../components/Button1';
import Button2 from '../components/Button2';
import Slideshow from '../components/Slideshow';

export default function Home() {
    const [inputValue, setInputValue] = useState('');
    const router = useRouter();

    const navigateToPage1 = () => {
        router.push('/post');
    }
    //id入力後ボタン押したときの処理
    const handleTextChange = (event) => {
        setInputValue(event.target.value);
    };

    const navigateToPage2 = () => {
        router.push('/create');
    }

    return (
        <div>
            <Header />
            <h1>Snap Shot in Time</h1>
            <Slideshow />
            <div class="flexbox">
                <div class="flex-item" ><label htmlFor="text">ルームID<br></br></label>

                    <input
                        type="text"
                        id="text"
                        value={inputValue}
                        onChange={handleTextChange}
                        className={"label-text"} /></div>
                <div class="flex-item"> <Button1 onClick={navigateToPage1} /></div>
                <div class="flex-item"> <Button2 onClick={navigateToPage2} /></div>
            </div>

        </div >
    );
}