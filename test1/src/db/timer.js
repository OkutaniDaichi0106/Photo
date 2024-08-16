import { useEffect } from 'react';
import { useRouter } from 'next/router';

export const TimedRedirectResult = () => {
    const router = useRouter();
    // 遷移したい時間を設定（例：2023年8月15日 15:00:00）
    const targetTime = new Date('2024-08-16T08:22:00').getTime();

    useEffect(() => {

        const timer = setInterval(() => {
            //         const now = new Date().getTime();
        const difference = targetTime - now;

        if (difference <= 0) {
            clearInterval(timer);
            // 指定時間になったら '/next-page' に遷移
            router.push('/result');
        }
    

        }, 1000); // 1秒ごとにチェック

        return () => clearInterval(timer);
    }, [router]);

};

export const TimedRedirectVote = () => {
    const router = useRouter();
    // 遷移したい時間を設定（例：2023年8月15日 15:00:00）
    const targetTime = new Date('2024-08-16T08:48:00').getTime();
    var index = 1;

    useEffect(() => {

        const timer = setInterval(() => {
            console.log(index++);
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

};


// export default TimedRedirectVote;
