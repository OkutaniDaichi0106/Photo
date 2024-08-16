import { createClient } from "@supabase/supabase-js";
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { PROJECT_URL, API_KEY, Load } from "@/db/main";
import { TimedRedirectVote } from './timer';
import Header from '../components/Header';


export default function SwipeDemo() {
    // Create client querys to the DB server
    let client = createClient(PROJECT_URL, API_KEY);


    const [currentX, setCurrentX] = useState(0);
    const [currentY, setCurrentY] = useState(0);
    const [showImage, setShowImage] = useState(true);
    const [history, setHistory] = useState([]);
    const [predictedValue, setPredictedValue] = useState(null);
    const [isSwipeComplete, setIsSwipeComplete] = useState(false);
    const [isFinished, setIsFinished] = useState(false);
    const currentImageIndex = useRef(0);
    const swipeAreaRef = useRef(null);
    const startXRef = useRef(0);
    const startYRef = useRef(0);
    const isDraggingRef = useRef(false);
    const currentXRef = useRef(0);
    const currentYRef = useRef(0);

    const setEvaldict = useRef({}); // 評価値保存{photoid:value（評価値）}


    const [images, setImages] = useState([])
    const [photoIDs, setPhotoIDs] = useState([])



    const changePhoto = (newValue) => {
        setShowImage(false);
        setTimeout(() => {
            if (currentImageIndex.current < images.length - 1) {
                currentImageIndex.current++;
                console.log("currentImageIndex:" + currentImageIndex.current + "images.length:" + (images.length - 1));
                setShowImage(true);
                setHistory(prev => [...prev, newValue]);
            } else {
                console.log("changephoto");
                currentImageIndex.current++;
                setIsFinished(true);
            }
        }, 300);
    }



    useEffect(() => {
        (async function () {
            ////
            const roomID = sessionStorage.getItem("roomID")
            const data = await Load(roomID)

            for (let i = 0; i < data.length; i++) {
                images.push(data[i].photo_url)
                setImages(images)
                photoIDs.push(data[i].photo_url)
                setPhotoIDs(photoIDs)
                console.log(images, photoIDs)
            }

            ////

            const swipeArea = swipeAreaRef.current;
            if (swipeArea) {
                addEventListeners(swipeArea);
            }
            return () => {
                if (swipeArea) {
                    removeEventListeners(swipeArea);
                }
            };
        })()
    }, []);

    const addEventListeners = (element) => {
        element.addEventListener('touchstart', handleStart, false);
        element.addEventListener('touchmove', handleMove, false);
        element.addEventListener('touchend', handleEnd, false);
        element.addEventListener('mousedown', handleStart, false);
        element.addEventListener('mousemove', handleMove, false);
        element.addEventListener('mouseup', handleEnd, false);
        element.addEventListener('mouseleave', handleEnd, false);
    };

    const removeEventListeners = (element) => {
        element.removeEventListener('touchstart', handleStart, false);
        element.removeEventListener('touchmove', handleMove, false);
        element.removeEventListener('touchend', handleEnd, false);
        element.removeEventListener('mousedown', handleStart, false);
        element.removeEventListener('mousemove', handleMove, false);
        element.removeEventListener('mouseup', handleEnd, false);
        element.removeEventListener('mouseleave', handleEnd, false);
    };

    useEffect(() => {
        currentXRef.current = currentX;  // currentXが更新されるたびにrefを更新
    }, [currentX]);

    useEffect(() => {
        currentYRef.current = currentY;  // currentYが更新されるたびにrefを更新
    }, [currentY]);

    const handleStart = (event) => {
        isDraggingRef.current = true;
        startXRef.current = event.type.includes('mouse') ? event.clientX : event.touches[0].clientX;
        startYRef.current = event.type.includes('mouse') ? event.clientY : event.touches[0].clientY;
    };

    const handleMove = (event) => {
        if (!isDraggingRef.current) return;
        const clientX = event.type.includes('mouse') ? event.clientX : event.touches[0].clientX;
        const clientY = event.type.includes('mouse') ? event.clientY : event.touches[0].clientY;
        const deltaX = clientX - startXRef.current;
        const deltaY = clientY - startYRef.current;
        currentXRef.current += deltaX;
        currentYRef.current += deltaY;
        setCurrentX(currentXRef.current);
        setCurrentY(currentYRef.current);
        startXRef.current = clientX;
        startYRef.current = clientY;

        // 予測値の更新
        const absX = Math.abs(currentXRef.current);
        const absY = Math.abs(currentYRef.current);
        if (absX > 50 || absY > 50) {
            let newPredictedValue;
            if (absX > absY) {
                newPredictedValue = currentXRef.current > 0 ? 3 : 1;
            } else {
                newPredictedValue = currentYRef.current < 0 ? 2 : null;
            }
            setPredictedValue(newPredictedValue);
            setIsSwipeComplete(false);
        } else {
            setPredictedValue(null);
        }
    };

    const handleEnd = () => {
        isDraggingRef.current = false;
        const absX = Math.abs(currentXRef.current);
        const absY = Math.abs(currentYRef.current);

        if (absX > 100 || absY > 100) { // スワイプ完了の閾値を100pxに設定
            let newValue;
            if (absX > absY) {
                newValue = currentXRef.current > 0 ? 3 : 1;
            } else {
                newValue = currentYRef.current < 0 ? 2 : null;
            }

            console.log(newValue);
            setEvaluation(newValue);

            console.log(isFinished);
            if (!isFinished) {
                changePhoto(newValue);
            }
            setIsSwipeComplete(true);
        } else {
            setIsSwipeComplete(false);
        }

        setPredictedValue(null);
        setCurrentX(0);
        setCurrentY(0);
        if (swipeAreaRef.current) {
            swipeAreaRef.current.style.transition = 'transform 0.3s';
            swipeAreaRef.current.style.transform = 'translate(0, 0)';
            setTimeout(() => {
                if (swipeAreaRef.current) {
                    swipeAreaRef.current.style.transition = '';
                }
            }, 300);
        }
    };

    const handleButtonClick = (buttonValue) => {
        if (!isFinished) {
            setEvaluation(buttonValue);
            changePhoto(buttonValue);
        }
    };

    const handleUndo = () => {
        if (history.length > 0 && currentImageIndex.current > 0) {
            currentImageIndex.current--;
            setHistory(prev => prev.slice(0, -1));
            setIsFinished(false);
            setShowImage(true);
            setEvaldict.current[photoIDs[currentImageIndex.current]] = 0;
        } else {
            alert("まだ戻すことができません");
        }
    };

    const setEvaluation = (value) => {
        setEvaldict.current[photoIDs[currentImageIndex.current]] = value;
        console.log(JSON.stringify(setEvaldict.current));
    }

    const printStar = (value) => {

    }


    return (
        <><Header /><div id="swipe-container" style={swipeContainerStyle}>
            {isFinished ? (
                <div style={finishedStyle}>終了</div>
            ) : (
                <>
                    {predictedValue !== null && (
                        <div style={predictedValueStyle}>
                            {predictedValue}
                        </div>
                    )}
                    <div
                        ref={swipeAreaRef}
                        className="swipe-area"
                        style={{
                            ...swipeAreaStyle,
                            transform: `translate(${currentX}px, ${currentY}px)`,
                        }}
                    >
                        {showImage &&
                            <Image fill
                                style={{
                                    objectFit: 'contain',
                                    pointerEvents: 'none',
                                }}
                                src={images[currentImageIndex.current]}
                                alt={`Swipe image ${currentImageIndex.current + 1}`} />}
                    </div>
                    <div style={buttonContainerStyle}>
                        <button style={backButtonStyle} onClick={handleUndo}></button>
                        <button style={buttonStyle} onClick={() => handleButtonClick(1)}>1</button>
                        <button style={buttonStyle} onClick={() => handleButtonClick(2)}>2</button>
                        <button style={buttonStyle} onClick={() => handleButtonClick(3)}>3</button>
                    </div>
                </>
            )}
        </div></>
    );
}

const swipeContainerStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
};

const swipeAreaStyle = {
    width: '200px',
    height: '200px',
    backgroundColor: 'transparent',
    touchAction: 'none',
    position: 'relative',
    transform: 'translateX(0)',  // 初期位置を設定
    overflow: 'hidden', // この行を追加
};

const buttonContainerStyle = {
    position: 'absolute',
    bottom: '20px',
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
};

const buttonStyle = {
    margin: '0 10px',
    padding: '10px 20px',
    fontSize: '18px',
    cursor: 'pointer',
};

const backButtonStyle = {
    margin: '0 10px',
    padding: '10px 20px',
    fontSize: '18px',
    cursor: 'pointer',
    backgroundImage: 'url("/back.jpeg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
};

const predictedValueStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '100px',
    fontWeight: 'bold',
    color: 'black',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    zIndex: 10,
    pointerEvents: 'none',
    opacity: '0.5',
};

const finishedStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '50px',
    fontWeight: 'bold',
    color: 'black',
    backgroundColor: 'white',
};