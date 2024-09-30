'use client'

import './animations.css';
import { motion } from 'framer-motion';

interface IProps {
    className?: string
}

export default function DecorationElementUsersGroup({ className = "" }: IProps) {
    return (
        <motion.div
            className={"w-[164px] rounded-xl bg-white py-[9px] pl-2 pr-3.5 flex items-center gap-1.5 " + className}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.8 }}
        >
            <img
                src="/assets/images/login-page/users-group.webp"
                alt=""
                className="w-[49px] h-6"
            />
            <div className="w-full">
                <div className="h-[5px] bg-[#D9D9D9] rounded-2xl mb-[3px] calendar-white-line-one"></div>
                <div className="h-[5px] bg-[#D9D9D9] rounded-2xl calendar-white-line-two"></div>
            </div>
        </motion.div >
    )
}