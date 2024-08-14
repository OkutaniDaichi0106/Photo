import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SwipeDemo() {
    const [currentX, setCurrentX] = useState(0);
    const [currentY, setCurrentY] = useState(0);
    const [value, setValue] = useState(null);
    const [checkPhoto, setCheckPhoto] = useState(true);
    const [photoURL, setPhotoURL] = useState('/IMGP3543.jpg');
    const [showImage, setShowImage] = useState(true);
    const [history, setHistory] = useState([]);// 巻き戻し機能
    const [predictedValue, setPredictedValue] = useState(null);
    const [isSwipeComplete, setIsSwipeComplete] = useState(false);
    const swipeAreaRef = useRef(null);
    const startXRef = useRef(0);
    const startYRef = useRef(0);
    const isDraggingRef = useRef(false);
    const currentXRef = useRef(0);
    const currentYRef = useRef(0);

    const changePhoto = (newValue) => {
        setShowImage(false);  // 画像を非表示にする
        setTimeout(() => {
            setCheckPhoto(prev => !prev);
            setPhotoURL(prev => prev === '/IMGP3543.jpg' ? '/IMG_9986.jpg' : '/IMGP3543.jpg');
            setShowImage(true);  // 画像を再表示する
            setHistory(prev => [...prev, newValue]);// 巻き戻し機能
        }, 300);  // 300ミリ秒後に画像を切り替えて表示
    }


    useEffect(() => {
        const swipeArea = swipeAreaRef.current;
        if (swipeArea) {
            addEventListeners(swipeArea);
        }
        return () => {
            if (swipeArea) {
                removeEventListeners(swipeArea);
            }
        };
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
                newPredictedValue = currentXRef.current > 0 ? 2 : 1;
            } else {
                newPredictedValue = currentYRef.current < 0 ? 3 : null;
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
                newValue = currentXRef.current > 0 ? 2 : 1;
            } else {
                newValue = currentYRef.current < 0 ? 3 : null;
            }

            setValue(newValue);
            console.log(newValue);

            if (newValue !== null) {
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
        setValue(buttonValue);
        changePhoto(buttonValue);
    };

    const handleUndo = () => {
        if (history.length > 0) {
            const prevValue = history[history.length - 2];
            setValue(prevValue);
            setHistory(prev => prev.slice(0, -1));
            changePhoto(prevValue);
        } else {
            alert("まだ戻すことができません");
        }
    };

    return (
        <div id="swipe-container" style={swipeContainerStyle}>
            {/* valueの表示 */}
            {/* {value !== null && (
        <p style={{ textAlign: 'center', position: 'absolute', width: '100%', top: '10px' }}>
          スワイプ結果: {value}
        </p>
      )} */}
            {predictedValue !== null && (
                <div style={predictedValueStyle} >
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
                        }} src={photoURL}
                        alt="Swipe image" />
                }
            </div>
            <div style={buttonContainerStyle}>
                <button style={buttonStyle} onClick={handleUndo}>戻る</button>
                <button style={buttonStyle} onClick={() => handleButtonClick(1)}>1</button>
                <button style={buttonStyle} onClick={() => handleButtonClick(2)}>2</button>
                <button style={buttonStyle} onClick={() => handleButtonClick(3)}>3</button>
            </div>
        </div>
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
};