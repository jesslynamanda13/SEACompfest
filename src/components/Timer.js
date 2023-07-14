import React, { useState, useEffect } from 'react'

const Timer = () => {
    const [seconds, setSeconds] = useState(30);

    useEffect(() => {
        const interval = setInterval(() => {
        setSeconds(prevSeconds => prevSeconds - 1);
        }, 1000);

       
        if (seconds === 0) {
        clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [seconds]);

    return (
        <div>
        <div>{seconds} seconds</div>
        </div>
    );
}

export default Timer;
