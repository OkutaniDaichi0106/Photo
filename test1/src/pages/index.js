'use client';

import { useRouter } from 'next/navigation';

export default function Home() {
    const router = useRouter();

    const navigateToPage1 = () => {
        router.push('/create_room');
    }

    const navigateToPage2 = () => {
        router.push('/page2');
    }


    return (
        <div>
            <h1>ホームページ</h1>
            <button onClick={navigateToPage1}>Page 1へ移動</button>
            <button onClick={navigateToPage2}>Page 2へ移動</button>
        </div>
    );
}