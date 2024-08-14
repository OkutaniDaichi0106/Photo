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
        router.push('/create_room');
    }


    return (
        <div>
            <Header />
            <h1>snap shot in time</h1>
            <div class="flexbox">
                <div class="flex-item"> <Button1 onClick={navigateToPage1} /></div>
                <div class="flex-item"> <Button2 onClick={navigateToPage2} /></div>
            </div>
        </div>
    );
}