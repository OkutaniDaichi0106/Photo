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

            <Slideshow />
            <div className="flexbox">
                <div className="flex-item" ><label htmlFor="text"><br></br></label>

                    <input
                        placeholder="ルームIDを入力"
                        type="text"
                        id="text"
                        value={inputValue}
                        onChange={handleTextChange}
                        className={"label-text"} /></div>
                <div className="flex-item"> <Button1 onClick={navigateToPage1} /></div>
                <div className="flex-item"> <Button2 onClick={navigateToPage2} /></div>
            </div>

        </div >
    );
}