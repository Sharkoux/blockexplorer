import React, { useState, useEffect, useRef } from 'react';

const BankInfoTicker = ({ data, speed = 2 }) => {
    const tickerRef = useRef(null);
    const [translateX, setTranslateX] = useState(0);

    useEffect(() => {
        const tick = () => {
            if (tickerRef.current) {
                const width = tickerRef.current.offsetWidth / 2; // car nous avons dupliqué le contenu
                setTranslateX(prev => {
                    if (Math.abs(prev) >= width) {
                        return 0;
                    }
                    return prev - speed;
                });
            }
        };

        const interval = setInterval(tick, 16); // 60fps
        return () => clearInterval(interval);
    }, [speed]);

    const combinedData = [...data, ...data].join('   ');

    return (
        <div style={{ overflow: 'hidden', whiteSpace: 'nowrap', position: 'relative', background: 'rgb(0,76,76, 0.6)', height: '25px' }}>
            <span
                ref={tickerRef}
                style={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    whiteSpace: 'nowrap',
                    transform: `translateX(${translateX}px)`,
                    marginLeft: '100px',
                    marginRight: '150px',
                    color: 'white',
                    alignContent: 'center',
                    alignItems: 'center',
                    fontSize: '20px',
                }}
            >
                {combinedData}
            </span>
        </div>
    );
};

export default BankInfoTicker;