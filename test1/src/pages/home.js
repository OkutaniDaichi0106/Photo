'use client';
import React, { useState, useEffect, useRef } from 'react';
import Header from '../components/Header';
import { useRouter } from 'next/navigation';
import Button1 from '../components/Button1';
import Button2 from '../components/Button2';
import Slideshow from '../components/Slideshow';
import { createClient } from '@supabase/supabase-js';
import { API_KEY, getRoom, PROJECT_URL, ROOMS_TABLE } from '@/db/main';

export default function Home() {
    const [inputValue, setInputValue] = useState('');
    const router = useRouter();

    const navigateToPage1 = async () => {
        let { data, err } = await client
		.from(ROOMS_TABLE)
		.select("*")
		.eq("id", inputValue)
	    if (err) {
		    console.error(err);
	    }
	    console.log(data)
        if (data.length == 1) {
            router.push('/post');
        }  
    }
    //id入力後ボタン押したときの処理
    const handleTextChange = (event) => {
        setInputValue(event.target.value);
    };

    const navigateToPage2 = () => {
        router.push('/create');
    }

    /////
    const client = createClient(PROJECT_URL, API_KEY)
    const [ok, setOk] = useState(false)
    const [uuid, setUUID] = useState("")
    const [fullName, setFullName] = useState("")
    const [iconURL, setIconURL] = useState("")

    useEffect(() => {
        (async function () {
            if (typeof window !== 'undefined') {
                const sessionstr = sessionStorage.getItem("discord_session")
                const session = JSON.parse(sessionstr)
                if (session) {
                    console.log("aaaaaaaaaaaaa")

                    setOk(true)
                    // console.log(ok.current)
                    //if access_token and refresh_token exist
                    //const {data, err} = await 
                    client.auth.setSession(session)
                        .then(({ data }) => {
                            // if (err) {
                            //     console.error(err)
                            // }
                            const userID = data.user.id
                            const userName = data.user.user_metadata.full_name
                            const icon = data.user.user_metadata.avatar_url
                            setUUID(userID)
                            setFullName(userName)
                            setIconURL(icon)
                            
                        })
                } else {
                    return
                }
            }
        })()

    }, []);
    /////
    if (ok) {
        return (
            <div>
                <Header />

                <Slideshow />
                <div className='user-profile'>
                    <img className="profileImage" src={iconURL} height="30px" width="30px" />
                    <div className='user-info'>
                        <div className='name'>{fullName}</div>
                    </div>
                </div>

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
    } else {
        return (
            <div>You are not permitted to access this page</div>
        )
    }

}

