'use client'

import { ITabItem, ITabsSectionContent, TabsList } from "@/app/lib/contentful/contentful-api";
import { openSansFont } from "./fonts";
import { useEffect, useRef, useState } from "react";
import { useInView, motion } from "framer-motion";
import Image from "next/image";

const TAB_PAUSE_VALUE = 20; //seconds

// Animation params for elements
function generateAnimationParams(isInView: boolean, delay: number) {
    return {
        initial: { opacity: 0, y: -50 },
        animate: isInView && { opacity: 1, y: 0 },
        transition: { duration: 0.5, delay },
    }
};

export function Tabs({ componentContent }: { componentContent: ITabsSectionContent }) {
    const ref = useRef(null); // Animation container
    const isInView = useInView(ref, { once: true }); // Animation trigger

    const [selectedTab, setSelectedTab] = useState(componentContent.tabsList[0]);
    const [prevIndex, setPrevIndex] = useState(0);
    const [animationStarted, setAnimationStarted] = useState(false);

    const handleTabClick = (item: ITabItem) => {
        setPrevIndex(componentContent.tabsList.findIndex(tab => tab.tabTitle === selectedTab.tabTitle));
        setSelectedTab(item);
    };

    useEffect(() => {
        // Start animation
        if (isInView && !animationStarted && componentContent) {
            setAnimationStarted(true);
        }
        // Auto tab switching
        const interval = setInterval(() => {
            const currentIndex = componentContent.tabsList.findIndex(tab => tab.tabTitle === selectedTab.tabTitle);
            const nextIndex = (currentIndex + 1) % componentContent.tabsList.length;

            setPrevIndex(currentIndex);
            setSelectedTab(componentContent.tabsList[nextIndex]);
        }, TAB_PAUSE_VALUE * 1000);

        return () => clearInterval(interval);
    }, [isInView, selectedTab, animationStarted]);

    // Tab change animation direction
    const tabChangeAnimationDirection = prevIndex < componentContent.tabsList.findIndex(tab => tab.tabTitle === selectedTab.tabTitle) ? 50 : -50; // x axis (from left/right)

    return (
        <section ref={ref} className="container mt-[72px] mobile:mt-10 lg:mt-[90px] mb-10 lg:mb-14">
            <motion.h2
                className="text-xl mobile-xs:text-2xl lg:text-[40px] mobile:text-center font-bold uppercase mb-[50px] mobile:mb-9 lg:mb-10 xl:mb-[60px]"
                {...generateAnimationParams(isInView, 0.5)}
            >
                {componentContent.title}
            </motion.h2>

            <DesktopTabs
                tabsList={componentContent.tabsList}
                isInView={isInView}
                selectedTab={selectedTab}
                animationStarted={animationStarted}
                handleTabClick={handleTabClick}
                tabChangeAnimationDirection={tabChangeAnimationDirection}
            />
            <MobileTabs
                tabsList={componentContent.tabsList}
                isInView={isInView}
                selectedTab={selectedTab}
                animationStarted={animationStarted}
                handleTabClick={handleTabClick}
                tabChangeAnimationDirection={tabChangeAnimationDirection}
            />
        </section>
    );
}

export interface ITabsSectionProps {
    tabsList: TabsList,
    isInView: boolean,
    selectedTab: ITabItem;
    animationStarted: boolean,
    handleTabClick: (item: ITabItem) => void;
    tabChangeAnimationDirection: 50 | -50;
}

{/* Tabs component - desktop screen*/ }
function DesktopTabs({ tabsList, isInView, selectedTab, animationStarted, handleTabClick, tabChangeAnimationDirection }: ITabsSectionProps) {
    return (
        <div className="hidden md:flex flex-col items-center px-4">
            <motion.ul
                className={`${openSansFont.className} w-fit pb-3 flex gap-x-7 text-base lg:text-xl border-b-3 border-[#D9D9D9]`}
                {...generateAnimationParams(isInView, 0.7)}
            >
                {tabsList.map((item, index) => (
                    <li
                        key={index}
                        className={`relative px-1 cursor-pointer ${selectedTab.tabTitle === item.tabTitle ? 'text-t-blue' : 'text-[#A2A2A8]'} duration-500 whitespace-nowrap`}
                        onClick={() => handleTabClick(item)}
                    >
                        {selectedTab.tabTitle === item.tabTitle ?
                            <span
                                className={`inline-block w-full h-[3px] absolute -bottom-[15px] left-0 bg-t-blue z-10 rounded-2xl text-t-blue ${animationStarted ? 'animate-fillBar' : ''}`}
                                style={{ animationDuration: TAB_PAUSE_VALUE + 's' }}
                            ></span>
                            :
                            null
                        }
                        {item.tabTitle}
                    </li>
                ))}
            </motion.ul>

            <motion.div
                {...generateAnimationParams(isInView, 0.9)}
                className="min-h-[1040px] lg:min-h-[650px] xl:min-h-[550px] mt-12 lg:mt-[93px]"
            >
                <motion.article
                    className="flex flex-col-reverse lg:flex-row items-center justify-end lg:justify-normal"
                    key={selectedTab.tabTitle}
                    initial={{ opacity: 0, x: tabChangeAnimationDirection }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1 }}
                >
                    <ul className="px-4 flex flex-col gap-y-[50px] self-start">
                        {selectedTab.subtitlesList.map((item, index) => (
                            <li key={index}>
                                <p className="max-w-[713px] flex items-center gap-x-2.5 text-xl md:text-2xl font-bold mb-5">
                                    {item.titleIcon &&
                                        <img
                                            src={item.titleIcon.src}
                                            alt={item.titleIcon.alt}
                                            width={35}
                                            height={35}
                                        />
                                    }
                                    {item.title}
                                </p>
                                <p className={`${openSansFont.className} text-base md:text-xl text-[#A2A2A8]`}>{item.text}</p>
                            </li>
                        ))}
                    </ul>
                    <Image
                        alt={selectedTab.tabImage.alt}
                        title={selectedTab.tabImage.alt}
                        src={selectedTab.tabImage.src}
                        width={471}
                        height={450}
                        className="drop-shadow-2xl mb-16 xl:mb-0"
                    />
                </motion.article>
            </motion.div>
        </div>
    )
};

{/* Tabs component - mobile screen*/ }
function MobileTabs({ tabsList, isInView, selectedTab, animationStarted, handleTabClick, tabChangeAnimationDirection }: ITabsSectionProps) {
    return (
        <div className="block md:hidden">
            <motion.nav
                className="overflow-x-auto hide-scrollbar"
                {...generateAnimationParams(isInView, 0.7)}
            >
                <ul className={`${openSansFont.className} w-fit pb-[5px] flex gap-x-7 border-b-3 border-[#D9D9D9]`}>
                    {tabsList.map((item, index) => (
                        <li
                            key={index}
                            className={`relative px-1 cursor-pointer text-sm mobile-xs:text-base ${selectedTab.tabTitle === item.tabTitle ? 'text-t-blue' : 'text-[#A2A2A8]'} duration-500 whitespace-nowrap`}
                            onClick={() => handleTabClick(item)}
                        >
                            {selectedTab.tabTitle === item.tabTitle ?
                                <span
                                    className={`inline-block w-full h-[3px] absolute -bottom-[8px] left-0 bg-t-blue z-10 rounded-2xl text-t-blue ${animationStarted ? 'animate-fillBar' : ''}`}
                                    style={{ animationDuration: TAB_PAUSE_VALUE + 's' }}
                                ></span>
                                :
                                null
                            }
                            {item.tabTitle}
                        </li>
                    ))}
                </ul>
            </motion.nav>
            <motion.div {...generateAnimationParams(isInView, 0.9)} className="mt-9">
                <motion.article
                    className="flex flex-col items-center gap-6 min-h-[780px] sm:min-h-[660px]"
                    key={selectedTab.tabTitle}
                    initial={{ opacity: 0, x: tabChangeAnimationDirection }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1 }}
                >
                    <Image
                        alt={selectedTab.tabImage.alt}
                        title={selectedTab.tabImage.alt}
                        src={selectedTab.tabImage.src}
                        width={353}
                        height={337}
                        className="drop-shadow-2xl"
                        loading="lazy"
                    />
                    <ul className="flex flex-col gap-y-5">
                        {selectedTab.subtitlesList.map((item, index) => (
                            <li key={index}>
                                <p className="max-w-[713px] flex items-center gap-x-2.5 font-bold mb-[11px]">
                                    {item.titleIcon &&
                                        <img
                                            src={item.titleIcon.src}
                                            alt={item.titleIcon.alt}
                                            width={35}
                                            height={35}
                                            className="scale-90"
                                        />
                                    }
                                    {item.title}
                                </p>
                                <p className={`${openSansFont.className} text-sm text-[#A2A2A8]`}>{item.text}</p>
                            </li>
                        ))}
                    </ul>
                </motion.article>
            </motion.div>
        </div>
    )
};