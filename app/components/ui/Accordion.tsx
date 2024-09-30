'use client'

import { AccordionList, IAccordionItem, IAccordionSectionContent } from "@/app/lib/contentful/contentful-api";
import { replaceOWithPaintedO } from "@/app/lib/utils/utils";
import { useInView, motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { openSansFont } from "./fonts";

const ITEM_DELAY_VALUE = 10; // Seconds

// Animation params for elements
const generateAnimationParams = (isInView: boolean, delay: number) => ({
    initial: { opacity: 0, scale: 1.05 },
    animate: isInView && { opacity: 1, scale: 1 },
    transition: { duration: 0.5, delay },
});

export function Accordion({ componentContent }: { componentContent: IAccordionSectionContent }) {
    const { title, text, accordionList } = componentContent;

    const ref = useRef(null); // Animation container
    const isInView = useInView(ref, { once: true }); // Animation trigger

    const [currentActiveIndex, setCurrentActiveIndex] = useState(0);
    const [activeItem, setActiveItem] = useState(accordionList[currentActiveIndex]);
    const [startIndex, setStartIndex] = useState(0); // starting index of the displayed list

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isInView) {
            interval = setInterval(handleNextItem, ITEM_DELAY_VALUE * 1000);
        }
        return () => clearInterval(interval);

    }, [isInView, activeItem]);

    const handleNextItem = () => {
        const nextElementIndex = accordionList.findIndex((item) => item.title === activeItem.title) + 1;
        if (nextElementIndex >= accordionList.length) {
            setCurrentActiveIndex(0);
            setActiveItem(accordionList[0]);
            setStartIndex(0);
        } else {
            setCurrentActiveIndex(nextElementIndex);
            setActiveItem(accordionList[nextElementIndex]);
            if (nextElementIndex >= startIndex + 4) {
                setStartIndex(startIndex + 1);
            }
        }
    };

    const handlePrevItem = () => {
        const prevElementIndex = accordionList.findIndex((item) => item.title === activeItem.title) - 1;
        if (prevElementIndex < 0) {
            setCurrentActiveIndex(accordionList.length - 1);
            setActiveItem(accordionList[accordionList.length - 1]);
            setStartIndex(accordionList.length - 4);
        } else {
            setCurrentActiveIndex(prevElementIndex);
            setActiveItem(accordionList[prevElementIndex]);
            if (prevElementIndex < startIndex) {
                setStartIndex(startIndex - 1);
            }
        }
    };

    return (
        <section ref={ref} className="text-white relative z-10">
            <motion.div
                className="bg-m-blue-dark"
                initial={{ height: 0 }}
                animate={isInView && { height: 'fit-content' }}
                transition={{ duration: 1.5, delay: 0.5 }}
            >
                <div className="container px-4 py-[35px] mobile:pt-[76px] lg:pt-[53px] xl:pt-[69px] mobile:pb-[57px] flex flex-col items-center mobile:items-stretch gap-3">
                    <article className="flex justify-between">
                        <motion.h3
                            className="max-w-[460px] text-[28px] mobile-xs:text-[38px] mobile:text-[48px] lg:text-[52px] leading-tight font-bold uppercase"
                            {...generateAnimationParams(isInView, 1.2)}
                        >
                            {replaceOWithPaintedO(title, "white", "#2B2548")}
                        </motion.h3>
                        <motion.h4
                            className={`${openSansFont.className} max-w-[596px] text-xl hidden lg:inline`}
                            {...generateAnimationParams(isInView, 1.4)}
                        >
                            {text}
                        </motion.h4>
                    </article>

                    <DesktopAccordion
                        isInView={isInView}
                        accordionList={accordionList}
                        activeItem={activeItem}
                        setActiveItem={setActiveItem}
                        startIndex={startIndex}
                        setCurrentActiveIndex={setCurrentActiveIndex}
                    />
                    <TabletAndMobileAccordion
                        isInView={isInView}
                        activeItem={activeItem}
                    />

                    <motion.div
                        className="w-full flex justify-center min-[1025px]:justify-start gap-x-10"
                        {...generateAnimationParams(isInView, 1.6)}
                    >
                        <button
                            className="group"
                            onClick={handlePrevItem}
                            disabled={currentActiveIndex === 0}
                        >
                            <Arrow className={`${currentActiveIndex === 0 ? 'stroke-[#F6F5F8]' : 'stroke-[#3372F9] group-active:scale-90 group-hover:scale-110 duration-200'} rotate-90  min-[1025px]:rotate-180`} />
                        </button>
                        <button
                            className="group" onClick={handleNextItem}
                            disabled={currentActiveIndex >= accordionList.length - 1}
                        >
                            <Arrow className={`${currentActiveIndex < accordionList.length - 1 ? 'stroke-[#3372F9] group-active:scale-90 group-hover:scale-110 duration-200' : 'stroke-[#F6F5F8]'} -rotate-90  min-[1025px]:rotate-0`} />
                        </button>
                    </motion.div>
                </div>
            </motion.div>
        </section >
    )
}

interface IAccordionProps {
    isInView: boolean,
    accordionList: AccordionList,
    activeItem: IAccordionItem,
    setActiveItem: (item: IAccordionItem) => void,
    startIndex: number,
    setCurrentActiveIndex: (index: number) => void
}

{/* Desktop screen accordion*/ }
function DesktopAccordion({ isInView, accordionList, activeItem, setActiveItem, startIndex, setCurrentActiveIndex }: IAccordionProps) {
    return (
        <motion.div
            className="hidden min-[1025px]:block min-h-[500px] xl:min-h-[550px] mt-[72px]"
            {...generateAnimationParams(isInView, 1.6)}
        >
            <div className="flex items-center gap-8 h-fit">
                <motion.ul layout className="max-w-[533px] xl:max-w-[634px] w-fit self-start">
                    {accordionList.slice(startIndex, startIndex + 4).map((item, index) => (
                        <motion.li
                            layout
                            key={item.title}
                            className="relative py-5 xl:py-[30px]"
                            onClick={() => {
                                setActiveItem(item);
                                setCurrentActiveIndex(index);
                            }}
                        >
                            <span className="inline-block w-full h-[1px] absolute top-0 left-0 bg-[#BFC1CA] z-10 rounded-2xl"></span>
                            <motion.div layout className="flex items-center gap-x-5 justify-between cursor-pointer">
                                <p className="text-2xl font-bold">{item.title}</p>
                                <AccordionIndicator className={`${activeItem.title === item.title ? "rotate-0" : "-rotate-90"} duration-200`} />
                            </motion.div>

                            <AnimatePresence>
                                {activeItem.title === item.title && (
                                    <motion.div
                                        className="overflow-hidden"
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        <p className={`max-w-[594px] ${openSansFont.className} text-xl mt-5`}>{item.text}</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.li>
                    ))}
                </motion.ul>

                <motion.div
                    key={activeItem.title}
                    initial={{ opacity: 0, x: 50, scale: 0.9 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    transition={{ duration: 0.7 }}
                >
                    <img
                        src={activeItem.image.src}
                        title={activeItem.image.alt}
                        alt={activeItem.image.alt}
                        className="w-full max-w-[600px] max-h-[500px] m-auto"
                    />
                </motion.div>
            </div>
        </motion.div>
    )
};

{/* Mobile screen accordion */ }
type IMobileAccordionProps = Omit<IAccordionProps, 'setActiveItem' | 'startIndex' | 'setCurrentActiveIndex' | 'accordionList'>;

function TabletAndMobileAccordion({ isInView, activeItem }: IMobileAccordionProps) {
    return (
        <motion.div
            className="flex min-[1025px]:hidden flex-col items-center justify-normal mobile:justify-around min-h-[560px] mobile:min-h-[800px]"
            {...generateAnimationParams(isInView, 1.6)}
        >
            <div className="h-[350px] mobile:h-[530px] max-w-full mobile:max-w-[750px] flex items-center justify-center">
                <motion.img
                    key={activeItem.title}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    src={activeItem.image.src}
                    alt={activeItem.image.alt}
                    title={activeItem.image.alt}
                    className="w-auto h-auto max-w-full max-h-full object-contain"
                />
            </div>

            <motion.div
                key={activeItem.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <p className="text-xl mobile:text-2xl font-bold self-start mb-[18px]">{activeItem.title}</p>
                <p className={`${openSansFont.className} text-[15px] mobile:text-xl`}>{activeItem.text}</p>
            </motion.div>
        </motion.div>
    )
}

// Icons
function Arrow({ className = "" }: { className?: string }) {
    return (
        <svg className={className} width="50" height="33" viewBox="0 0 50 33" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M48 2.91082L23.9778 30.9009L2 2.91082" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}

function AccordionIndicator({ className }: { className: string }) {
    return (
        <svg width="21" height="12" viewBox="0 0 21 12" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
            <path d="M19 2L10.2069 10L2 2" stroke="#3372F9" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}