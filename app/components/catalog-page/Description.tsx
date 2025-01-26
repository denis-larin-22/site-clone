'use client'

import { useState } from "react";
import { openSansFont } from "../ui/fonts";
import { motion } from "framer-motion";

interface IProps {
    descriptionText: string;
}

export function Description({ descriptionText }: IProps) {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    // Is expandable needed
    const isExpandable = descriptionText.length > 200;

    return (
        <div className={openSansFont.className}>
            <p className="text-lg">Опис</p>
            <motion.div
                layout
                initial={{ height: isExpandable ? 64 : "auto" }}
                animate={{ height: isOpen || !isExpandable ? "auto" : 64 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className={`relative mt-2 overflow-hidden text-sm text-[#AEB1BA]`}
            >
                <p>
                    {descriptionText}
                </p>
                {isExpandable && !isOpen && (
                    <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-[#FAFAFA] to-transparent pointer-events-none"></div>
                )}
            </motion.div>
            {isExpandable && (
                <button
                    className="text-sm text-[#11181C]/70 hover:text-t-blue flex items-center mt-2"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? (
                        <span>Згорнути текст <span className="text-[10px]">⯅</span></span>
                    ) : (
                        <span>Читати повністю <span className="text-[10px] relative -top-[1px]">⯆</span></span>
                    )}
                </button>
            )}
        </div>
    );
}
