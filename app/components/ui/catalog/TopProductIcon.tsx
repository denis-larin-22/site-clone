"use client"

import { motion, useInView } from "framer-motion"
import Image from "next/image"
import { useRef } from "react"

interface IProps {
    className?: string
}

function TopProductIcon({ className = "" }: IProps) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-50px" })

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3, ease: "easeOut", delay: 0.6 }}
            className={"w-16 h-16 md:w-28 md:h-28 " + className}
        >
            <motion.div
                animate={{
                    rotate: [0, -10, 10, -10, 0]
                }}
                transition={{
                    duration: 0.5,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatDelay: 2
                }}
            >
                <Image
                    alt="Top product"
                    src="/assets/images/top-product.png"
                    width={100}
                    height={100}
                />
            </motion.div>
        </motion.div>
    )
}

export default TopProductIcon
