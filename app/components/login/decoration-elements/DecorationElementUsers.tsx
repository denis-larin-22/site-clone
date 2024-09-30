'use client'

import './animations.css';
import { motion } from 'framer-motion';

interface IProps {
    className?: string
}

interface IUsersLines {
    grayLine: string,
    blueLine: string
}

export default function DecorationElementUsers({ className = '' }: IProps) {
    const images: [string, string, string] = [
        '/assets/images/login-page/login-account-1.webp',
        '/assets/images/login-page/login-account-2.webp',
        '/assets/images/login-page/login-account-3.webp'
    ];

    const linesStyles: [IUsersLines, IUsersLines, IUsersLines] = [
        {
            grayLine: "w-[80%] h-[5px] rounded-[14px] bg-[#A2A2A8] mb-1.5",
            blueLine: "w-[30%] h-[5px] rounded-[14px] bg-t-blue user-blue-line-one"
        },
        {
            grayLine: "w-1/2 h-[5px] rounded-[14px] bg-[#A2A2A8] mb-1.5",
            blueLine: "w-[45%] h-[5px] rounded-[14px] bg-t-blue user-blue-line-two"
        },
        {
            grayLine: "w-[62%] h-[5px] rounded-[14px] bg-[#A2A2A8] mb-1.5",
            blueLine: "w-[48%] h-[5px] rounded-[14px] bg-t-blue user-blue-line-three"
        }
    ]

    return (
        <motion.div
            className={className + ""}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.4 }}
        >
            <ul className="flex flex-col gap-y-1.5">
                {['one', 'two', 'three'].map((item, index) => (
                    <li
                        key={item}
                        className="w-[220px] h-11 rounded-lg bg-white flex items-center px-[7px] hover:scale-105 duration-150"
                    >
                        <img
                            src={images[index]}
                            alt="User"
                            className="w-8 h-8 rounded-full"
                        />
                        <div className="ml-[11px] w-full ">
                            <div className={linesStyles[index].grayLine}></div>
                            <div className={linesStyles[index].blueLine}></div>
                        </div>
                    </li>
                ))}
            </ul>

            <div className="bg-t-blue px-[17px] mt-[14px] w-[159px] h-[39px] rounded-[39px] flex items-center justify-between ml-auto hover:scale-105 duration-150">
                <p className="font-bold text-white">Покласти</p>
                <img
                    src="/assets/images/login-page/cart.svg"
                    alt=""
                    className="-rotate-[7deg] cart"
                />
            </div>
        </motion.div>
    )
}