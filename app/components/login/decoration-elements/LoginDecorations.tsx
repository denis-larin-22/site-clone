'use client'

import './animations.css';
import { CircleDecoreIcon } from "../../assets/icons";
import DecorationsGroup from './DecorationsGroup';
import { motion } from 'framer-motion';

const BLUE_COLOR = "#3372F9";
const DARK_BLUE_COLOR = "#2B2548";

export default function LoginDecorations() {
    return (
        <>
            <div className="hidden md:block absolute bottom-[5%] lg:bottom-1/2 translate-y-1/2 right-1/2 translate-x-1/2 lg:-right-[15%] lg:translate-x-0 z-0">
                {/* Large circle */}
                <motion.div
                    initial={{ x: '50%', rotate: 90, opacity: 0 }}
                    animate={{ x: 0, rotate: 0, opacity: 1 }}
                    transition={{ duration: 1 }}
                >
                    <CircleDecoreIcon
                        width={831}
                        height={831}
                        fillColor={DARK_BLUE_COLOR}
                        className="rotate-[140deg] lg:rotate-[60deg] -z-10"
                    />
                </motion.div>
                {/* Small circles */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 0.5 }}
                    className='absolute top-[12%] lg:top-[15%] left-[55%] lg:left-[20%] rotate-[100deg] -z-20 sm-circle-one'
                >
                    <CircleDecoreIcon
                        width={170}
                        height={170}
                        fillColor={BLUE_COLOR}
                    />
                </motion.div>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2, duration: 0.5 }}
                    className='absolute bottom-[56%] lg:bottom-[10%] left-[12%] lg:left-[22%] rotate-[120deg] -z-20 sm-circle-two'
                >
                    <CircleDecoreIcon
                        width={172}
                        height={172}
                        fillColor={BLUE_COLOR}
                    />
                </motion.div>
                {/* Decoration group */}
                <DecorationsGroup className='absolute top-[10%] lg:top-[22%] left-[20%] lg:left-0' />
            </div>
        </>
    )
}