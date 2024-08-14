

// components/Header.js
import Image from 'next/image';

const Header = () => {
    return (
        <div style={{ backgroundColor: '#9de0ad', width: '100%', textAlign: 'center' }}>
            <div style={{ display: 'inline-block' }}>
                <div style={{ width: '100%' }}>
                    <Image
                        src="/logo.png"
                        alt="Description"
                        width={200}
                        height={100}
                    />
                </div>
            </div>
        </div>
    );
};

export default Header;



