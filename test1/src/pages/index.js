'use client';
import React from 'react';
import Header from '../components/header';
import { useRouter } from 'next/navigation';
import Button1 from '../components/Button1';
import Button2 from '../components/Button2';

export default function Home() {
    const router = useRouter();

    const navigateToPage1 = () => {
        router.push('/create_room');
    }

    const navigateToPage2 = () => {
<<<<<<< HEAD
        router.push('/create_room');
=======
        router.push('/vote');
    }

    const navigateToPage3 = () => {
        router.push('/result');
>>>>>>> 5b9cf1f3d183979ddddab637913824b23b2fd952
    }


    return (
        <div>
<<<<<<< HEAD
            <Header />
            <h1>snap shot in time</h1>
            <div class="flexbox">
                <div class="flex-item"> <Button1 onClick={navigateToPage1} /></div>
                <div class="flex-item"> <Button2 onClick={navigateToPage2} /></div>
            </div>
=======
            <h1>ホームページ</h1>
            <button onClick={navigateToPage1}>Page 1へ移動</button>
            <button onClick={navigateToPage2}>Page 2へ移動</button>
            <button onClick={navigateToPage3}>result</button>
>>>>>>> 5b9cf1f3d183979ddddab637913824b23b2fd952
        </div>
    );
}