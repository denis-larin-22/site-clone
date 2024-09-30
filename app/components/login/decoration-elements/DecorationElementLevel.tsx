'use client'

import './animations.css';
import { useEffect, useState } from "react";
import { openSansFont } from '../../ui/fonts';
import { motion } from "framer-motion";
import DecorationElementCalendar from "./DecorationElementCalendar";

interface IProps {
    className?: string
}

export default function DecorationElementLevel({ className = "" }: IProps) {
    const [index, setIndex] = useState(0);
    const valuesMain = ["1.2k", "1.3k", "1.4k", "1.3k", "1.2k"];
    const valuesSecondary = ["+325", "+330", "+335", "+340", "+345"];

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex(prevIndex => (prevIndex + 1) % valuesMain.length);
        }, 400); // 400ms per step (2 seconds for full cycle)

        return () => clearInterval(interval);
    }, []);

    return (
        <motion.div
            className={"w-[230px] h-[193px] rounded-xl bg-white " + className}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.6 }}
        >
            <div className="relative h-full">
                <DecorationElementCalendar className="relative left-[37%] -top-3" />
                <p className="font-bold text-[32px] uppercase ml-3">{valuesMain[index]}</p>
                <p className={openSansFont.className + " text-t-blue text-[15px] ml-3"}>{valuesSecondary[index]}</p>
                <img
                    src="/assets/images/login-page/level.svg"
                    alt="Level"
                    className="absolute bottom-[29px] scale-y-90 level"
                />
            </div>
        </motion.div>
    )
}