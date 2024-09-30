'use client'

import { motion } from "framer-motion";
import { ralewayFont } from "../../ui/fonts";

interface IProps {
    className?: string
}

export default function DecorationElementWeek({ className = "" }: IProps) {
    const linesStyles: [string, string, string, string, string] = [
        "h-[50%] week-line-one",
        "h-[40%] week-line-two",
        "h-[60%] week-line-three",
        "h-full bg-gradient-to-t from-[#08FFB8] to-[#00ADED]",
        "h-full"
    ];

    return (
        <motion.div
            className={"w-[180px] h-[98px] rounded-lg bg-t-blue pt-2 pb-3 px-[17px] flex justify-between " + className}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 2 }}
        >
            {["Чт", "Пт", "Пн", "Вт", "Ср"].map((title, index) => (
                <div
                    key={title}
                    className={ralewayFont.className + " text-[8px] text-t-pale flex flex-col justify-end items-center gap-y-[5px] "}
                >
                    <div className={"w-[14px] rounded-[2px] bg-t-pale " + linesStyles[index]}></div>
                    <p>{title}</p>
                </div>
            ))}
        </motion.div>
    )
}