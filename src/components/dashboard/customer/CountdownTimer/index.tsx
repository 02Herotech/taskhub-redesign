import { useState, useEffect } from 'react';

const CountdownTimer = ({ endTime }: { endTime: Date }) => {
    const [timeLeft, setTimeLeft] = useState('');

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date();
            const difference = endTime.getTime() - now.getTime();

            if (difference <= 0) {
                clearInterval(timer);
                setTimeLeft('Inspection time ended');
            } else {
                const hours = Math.floor(difference / (1000 * 60 * 60));
                const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((difference % (1000 * 60)) / 1000);
                setTimeLeft(`${hours}:${minutes}:${seconds}`);
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [endTime]);

    return <span className="text-2xl font-semibold text-primary bg-[#F1F1F2] py-1 px-5 rounded-xl">{timeLeft}</span>;
};

export default CountdownTimer;