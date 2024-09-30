'use client'

import { motion } from "framer-motion";

interface IProps {
    className?: string
}

export default function DecorationElementCalendar({ className = "" }: IProps) {
    const linesStyles: [string, string] = [
        "bg-[#F6F5F8] w-[50%] h-1.5 rounded-2xl mb-[5px] calendar-white-line-one",
        "bg-[#F6F5F8] w-[25%] h-1.5 rounded-2xl mb-[5px] calendar-white-line-two"
    ]

    return (
        <motion.div
            className={"w-[217px] h-[62px] px-[11px] py-2 rounded-xl bg-t-blue flex gap-x-1 " + className}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.8 }}
        >
            <div className="w-12 h-full rounded-md bg-white flex items-center justify-center">
                <img src="/assets/images/login-page/calendar.svg" alt="Calendar" />
            </div>
            <ul className="w-[40%]">
                {['one', 'two'].map((item, index) => (
                    <li
                        key={item}
                        className={linesStyles[index]}
                    ></li>
                ))}
            </ul>

            <img src="/assets/images/login-page/chart.svg" alt="Chart level" className="absolute bottom-[14px] right-[17px] scale-y-[1.4] calendar-chart" />
        </motion.div>
    )
}
