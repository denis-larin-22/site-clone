'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getCorrectTimeDeclension } from '@/app/lib/utils/utils';

interface IInitCountdown {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

interface IProps {
    className?: string;
    startDate: string; // ISO format "YYYY-MM-DDTHH:MM:SS"
    endDate: string; // ISO format "YYYY-MM-DDTHH:MM:SS"
}

function CountdownTimer({ className = '', startDate, endDate }: IProps) {
    const [timeLeft, setTimeLeft] = useState<IInitCountdown | null>(null);
    const [isVisible, setIsVisible] = useState<boolean>(false);

    useEffect(() => {
        const updateCountdown = () => {
            const now = new Date();
            const start = new Date(startDate + "T00:00:00");
            const end = new Date(endDate + "T00:00:00");

            if (now < start || now > end) {
                setIsVisible(false);
                return;
            }

            const difference = end.getTime() - now.getTime();

            setTimeLeft({
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            });

            setIsVisible(true);
        };

        updateCountdown();
        const timer = setInterval(updateCountdown, 1000);

        return () => clearInterval(timer);
    }, [startDate, endDate]);

    if (!isVisible || !timeLeft) {
        return null;
    }

    return (
        <div
            className={`min-w-fit h-fit p-1 rounded-lg flex flex-col items-center opacity-80 group-hover:opacity-100 scale-90 group-hover:scale-100  bg-white/30 group-hover:bg-t-blue/75 duration-150 ${className}`}
        >
            <p className="text-[10px] font-bold text-t-dark-text group-hover:text-white/80 duration-150">
                До кінця пропозиції:
            </p>
            <div className="flex items-center gap-1 text-black/70 group-hover:text-white font-bold duration-150">
                {['days', 'hours', 'minutes', 'seconds'].map((unit, index) => (
                    <p key={unit} className="text-sm text-center inline-flex min-w-5 flex-col">
                        <motion.span
                            key={`${unit}-${timeLeft[unit as keyof IInitCountdown]}`}
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            {timeLeft[unit as keyof IInitCountdown]}
                        </motion.span>
                        <span className="text-[8px] leading-none">
                            {index === 0 ?
                                getCorrectTimeDeclension(timeLeft[unit as keyof IInitCountdown], 'дні')
                                :
                                index === 1 ?
                                    getCorrectTimeDeclension(timeLeft[unit as keyof IInitCountdown], 'години')
                                    :
                                    index === 2 ?
                                        getCorrectTimeDeclension(timeLeft[unit as keyof IInitCountdown], 'хвилини')
                                        :
                                        "cекунди"
                            }
                        </span>
                    </p>
                ))}
            </div>
        </div>
    );
};

export default CountdownTimer;
