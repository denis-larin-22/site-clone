'use client'

import { useState, useEffect } from 'react';
import Snowfall from 'react-snowfall';

// react-snowfall 2.2.0
// https://www.npmjs.com/package/react-snowfall

const SNOW_COLOR = "#dee4fd";

function SnowfallWrap() {
    const [snowflakeCount, setSnowflakeCount] = useState(100);

    useEffect(() => {
        const handleResize = () => {
            setSnowflakeCount(window.innerWidth <= 1024 ? 20 : 100);
        };

        // Set initial value
        handleResize();

        // Add event listener for resize
        window.addEventListener('resize', handleResize);

        // Cleanup on unmount
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <>
            <div className="w-screen h-dvh fixed top-0 left-0 right-0 bottom-0 z-10 pointer-events-none">
                <Snowfall
                    color={SNOW_COLOR}
                    snowflakeCount={snowflakeCount}
                    wind={[-0.5, 1]}
                    opacity={[0.3, 1]}
                />
            </div>
        </>
    );
}

export default SnowfallWrap;
