"use client";
import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import { createClient } from '@supabase/supabase-js';
import { API_KEY, PROJECT_URL } from '@/db/main';
import DiscordLogin from '@/components/LoginButton';

export default function VotePage() {
    const [accessToken, setAccessToken] = useState(null);
    const refreshtoken = useRef(null);
    const router = useRouter();
	let client = createClient(PROJECT_URL, API_KEY)
	let userID = ""

    useEffect(() => {
		(async function () {
        // クライアントサイドでのみ実行
        if (typeof window !== 'undefined') {
            const hash = window.location.hash.substring(1); // '#'を除去
            const params = new URLSearchParams(hash);
            const access_token = params.get('access_token');
            const refresh_token = params.get('refresh_token');
            console.log("access_token:" + access_token + ",refresh_token:" +refresh_token);
            if (access_token && refresh_token) {
				const { data, error }= await client.auth.getSession()
				if (data.session) {
					sessionStorage.setItem("discord_session", JSON.stringify(data.session))
				}
                setAccessToken(access_token);
                refreshtoken.current = refresh_token;
                // オプション: URLからハッシュを削除
                router.push('/home', undefined, { shallow: true });
            }else {
                // router.replace('/')
            }
        }
	})()
    }, [router]);


	// If there are no tokens
    if (!accessToken || !refreshtoken) {
        return (
			<div>
				<DiscordLogin/>
			</div>
		);
    }

    return (
        <div>
            
        </div>
    );
}