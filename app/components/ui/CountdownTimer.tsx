'use client'

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const TARGET_DATE = '2024-11-29T00:00:00';

interface IInitCountdown {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

interface IProps {
    className?: string;
}

const CountdownTimer = ({ className = "" }: IProps) => {
    const [timeLeft, setTimeLeft] = useState<IInitCountdown | null>(null);

    useEffect(() => {
        const updateCountdown = () => {
            const now = new Date();
            const targetDate = new Date(TARGET_DATE);
            const difference = targetDate.getTime() - now.getTime();

            setTimeLeft({
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            });
        };

        updateCountdown();
        const timer = setInterval(updateCountdown, 1000);

        return () => clearInterval(timer);
    }, []);

    if (!timeLeft) {
        return null;
    }

    return (
        <div className={`min-w-fit h-fit p-1 rounded-s-lg flex flex-col items-center bg-white/30 group-hover:bg-t-blue/75 duration-150 ${className}`}>
            <p className="text-[10px] font-bold text-t-dark-text group-hover:text-white/80 duration-150">До кінця пропозиції:</p>
            <div className="flex items-center gap-1 text-black/70 group-hover:text-white font-bold duration-150">
                {['days', 'hours', 'minutes', 'seconds'].map((unit, index) => (
                    <motion.span
                        key={`${unit}-${timeLeft[unit as keyof IInitCountdown]}`}
                        className="text-base text-center inline-block min-w-5 "
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {timeLeft[unit as keyof IInitCountdown]}
                        {index < 3 && ' :'} {/* Add ":" between*/}
                    </motion.span>
                ))}
            </div>
        </div>
    );
};

export default CountdownTimer;
