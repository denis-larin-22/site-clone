'use client'

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

function LogoHalloween() {
    const SWITCH_DELAY = 8; // in seconds
    const [isSwitched, setIsSwitched] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsSwitched(true);
        }, SWITCH_DELAY * 1000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <Link href={"/"} className="min-h-[30px] flex">
            {
                isSwitched ?
                    <div className="relative flex items-center">
                        <motion.img
                            src="/assets/images/themes/logo-halloween.webp"
                            alt="Logo-icon"
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6 }}
                            className="absolute left-2 w-8 mobile:w-12 h-8 mobile:h-fit"
                        />
                        <motion.img
                            src="/assets/images/logo-text.png"
                            alt="Logo-text"
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.6, duration: 0.5 }}
                            className="ml-10 mobile:ml-14 w-fit mobile:w-[113px] h-[22px] mobile:h-[30px]"
                        />
                    </div>
                    :
                    <img
                        alt="Piramid logo"
                        src="/assets/images/themes/logo-halloween-gif.gif"
                        className={`${isSwitched && "hidden"} absolute left-0 -top-[75%] mobile:-top-1/4 w-20 mobile:w-28 h-2w-20 mobile:h-28 object-cover`}
                    />
            }
        </Link>
    )
};

export default LogoHalloween;