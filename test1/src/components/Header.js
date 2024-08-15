
import Image from 'next/image';

const Header = () => {
    return (
        <div style={{ backgroundColor: '#40a798', width: '100%', textAlign: 'center' }}>
            <div style={{ display: 'inline-block' }}>
                <div style={{ width: '100%' }}>
                    <Image
                        src="/logo_white.png"
                        alt="Description"
                        width={160}
                        height={50}
                    />
                </div>
            </div>
        </div>
    );
};

export default Header;



