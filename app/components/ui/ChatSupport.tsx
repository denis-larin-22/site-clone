'use client'

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import Loader from "./Loader";

function ChatSupport() {
    const [isHidden, setIsHidden] = useState(true);

    return (
        <>
            {/* DESKTOP Button to iframe */}
            <div className="fixed bottom-24 right-3 md:bottom-20 md:right-5  z-[60] flex flex-col items-end gap-5">
                <AnimatePresence>
                    {
                        !isHidden &&
                        <motion.div className="relative bg-white rounded-xl"
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0, transition: { duration: 0.8 } }}
                            exit={{ opacity: 0, x: 100 }}
                        >
                            <iframe
                                src="https://piramid.perfectum.cloud/consultant_frame?lang=ukrainian"
                                width="340"
                                height="400"
                                className="relative z-50"

                            />
                            <div className="absolute top-0 right-0 w-28 h-16 z-50 bg-white">
                                <button
                                    className="absolute top-2 right-2 w-9 h-9 z-50 rounded-full opacity-80"
                                    onClick={() => setIsHidden(true)}
                                >
                                    <img src="/assets/images/close.svg" alt="Close icon" />
                                </button>
                            </div>

                            <div className="text-t-gray-text text-center text-sm absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                                <Loader />
                            </div>
                        </motion.div>
                    }
                </AnimatePresence>
                <button
                    className="relative w-14 h-14 p-3 bg-t-blue rounded-full group active:scale-80 duration-100"
                    onClick={() => {
                        setIsHidden(!isHidden)
                    }}
                >
                    <motion.span
                        className="inline-block w-16 h-16 rounded-full bg-t-blue/40 absolute z-0 -top-1 -left-1"
                        animate={{ scale: [1, 1.1, 1], opacity: [0.6, 1, 0.6] }}
                        transition={{ duration: 1.5, ease: "easeInOut", repeat: Infinity }}
                    />
                    <img src="/assets/images/chat.svg" alt="Chat icon" className="relative z-10 group-hover:rotate-[360deg] duration-400" />
                </button>
            </div>
        </>
    )
};

export default ChatSupport;