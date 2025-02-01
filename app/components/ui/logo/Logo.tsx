'use client'

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

function Logo() {
    const SWITCH_DELAY = 4; // in seconds
    const [isSwitched, setIsSwitched] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsSwitched(true);
        }, SWITCH_DELAY * 1000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <Link href={"/"} className="relative block w-[130px] h-[43px]">
            <AnimatePresence>
                {!isSwitched ?
                    <motion.div
                        key="logo_gif"
                        initial={{ opacity: 1 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                        <Image
                            alt="Piramid logo animation"
                            src={"/assets/images/logo_anim_preview.gif"}
                            width={130}
                            height={43}
                            className="absolute -top-2 w-[130px] h-[56px]"
                        />
                    </motion.div>
                    :
                    <motion.div
                        key="logo_static"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3, delay: 0.3, ease: "easeInOut" }}
                    >
                        <Image
                            alt="Piramid logo"
                            src={"/assets/images/full_logo.png"}
                            width={130}
                            height={43}
                            className="h-[43px] w-[130px]"
                        />
                    </motion.div>
                }
            </AnimatePresence>
        </Link>
    );
}

export default Logo;
