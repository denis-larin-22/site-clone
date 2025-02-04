'use client'

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

function ChatSupport() {
    const [isHidden, setIsHidden] = useState(true);

    return (
        <>
            {/* DESKTOP Button to iframe */}
            <div className="fixed bottom-20 right-5 z-[60] hidden md:flex flex-col items-end gap-5">
                <AnimatePresence>
                    {
                        !isHidden &&
                        <div className="relative">
                            <motion.iframe
                                src="https://widgets.binotel.com/w/chat/pages/?wgt=9qvWC8tgBqePKUW7C00O"
                                width="360"
                                height="550"
                                className="rounded-md"
                                initial={{ opacity: 0, x: 100 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 100 }}
                            />
                            <motion.button
                                className="absolute top-5 right-12 w-9 h-9 rounded-full opacity-80"
                                initial={{ opacity: 0, x: 100 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 100 }}
                                onClick={() => setIsHidden(true)}
                            >
                                <img src="/assets/images/close.svg" alt="" className="" />
                            </motion.button>
                        </div>
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
                    <img src="/assets/images/chat.svg" alt="" className="relative z-10 group-hover:rotate-[360deg] duration-400" />
                </button>
            </div >

            {/* MOBILE Link to page */}
            < a
                href="https://widgets.binotel.com/w/chat/pages/?wgt=9qvWC8tgBqePKUW7C00O"
                className="fixed bottom-24 right-3 z-[60] inline-block md:hidden w-14 h-14 p-3 bg-t-blue rounded-full group active:scale-80 duration-100"
            >
                <motion.span
                    className="inline-block w-16 h-16 rounded-full bg-t-blue/40 absolute z-0 -top-1 -left-1"
                    animate={{ scale: [1, 1.1, 1], opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 1.5, ease: "easeInOut", repeat: Infinity }}
                />
                <img src="/assets/images/chat.svg" alt="" className="relative z-10 group-hover:rotate-[360deg] duration-400" />
            </a >
        </>
    )
};

export default ChatSupport;
