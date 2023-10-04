import React, { useState, useEffect, useRef } from 'react';
import useGetData from '../hook/useGetData';

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
    }, []);
    const combinedData = [...data, ...data].join(' | ');



    return (
        <div style={{ overflow: 'hidden', whiteSpace: 'nowrap', position: 'fixed', top: '0', background: 'rgb(34, 114, 255, 0.9)', height: '25px', borderBottom: '3px solid rgba(255,255,255,0.75) ' }}>
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