'use client'

import { useEffect, useState } from "react";
import { CircleDecoreIcon } from "../assets/icons";
import { motion } from "framer-motion";
import { getVideoBannerContent, IVideoBannerContent } from "@/app/lib/contentful/contentful-api";
import { Video } from "../ui/Video";

export default function VideoBanner() {
    const [componentContent, setComponentContent] = useState<IVideoBannerContent | null>(null);

    useEffect(() => {
        async function getContent() {
            const content = await getVideoBannerContent();

            if (content === undefined) {
                setComponentContent(null);
            } else {
                setComponentContent(content);
            }
        }

        getContent();
    }, [])

    return (
        <motion.div
            id="video"
            className="relative z-10 container mt-[76px] md:mt-[283px] lg:mt-[162px] xl:mt-[192px] mb-[72px] mobile:mb-10 lg:mb-[120px]"
            initial={{ y: 50, rotateX: 45, opacity: 0 }}
            animate={{ y: 0, rotateX: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <a href="#video" className="group absolute z-20 bottom-1/2 mobile:bottom-[75%] lg:bottom-[85%] -right-[10%] mobile:right-16">
                {/* Desktop decor circle */}
                <CircleDecoreIcon
                    height={190}
                    width={190}
                    className="hidden mobile:inline-block group-hover:-rotate-90 duration-500 pointer-events-none"
                />
                {/* Mobile decor circle */}
                <CircleDecoreIcon
                    height={172}
                    width={172}
                    className="inline-block mobile:hidden rotate-[80deg] pointer-events-none"
                />
                <svg width="43" height="70" viewBox="0 0 43 70" fill="none" xmlns="http://www.w3.org/2000/svg" className="hidden mobile:inline absolute inset-0 m-auto group-hover:rotate-45 duration-500">
                    <path d="M21.0055 1.1709L21.0058 68.8365M21.0058 68.8365L41.0903 48.6709M21.0058 68.8365L1.09033 48.6709" stroke="#F6F5F8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </a>
            {
                componentContent === null ?
                    <div className="w-full h-[237px] mobile:h-[383px] lg:h-[624px] rounded-[40px] bg-t-blue/15 animate-pulse"></div>
                    :
                    <Video videoUrl={componentContent.videoUrl} posterUrl={componentContent.posterUrl} />
            }
        </motion.div>
    );
}
