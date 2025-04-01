'use client'

import { motion } from "framer-motion"

export function SaleValue({ saleValue, className }: { saleValue: string, className?: string }) {
    return (
        <motion.p
            animate={{
                rotate: [0, -10, 10, -10, 0]
            }}
            transition={{
                duration: 0.5,
                ease: "easeInOut",
                repeat: Infinity,
                repeatDelay: 2
            }}
            className={`w-9 h-9 md:w-16 md:h-16 flex justify-center items-center  bg-[#FFEFD1] rounded-full font-bold text-sm md:text-2xl text-t-orange ring-[3px] ring-t-orange ring-offset-2 border-2 border-t-orange/50 ${className || ''}`}
        >
            {saleValue}%
        </motion.p>
    )
}

export default SaleValue;