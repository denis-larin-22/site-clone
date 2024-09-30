'use client'

import { useEffect, useRef, useState } from "react";
import { openSansFont } from "../ui/fonts";
import { motion, useInView } from "framer-motion";
import { getInfoSectionContent, IInfoSectionContent } from "@/app/lib/contentful/contentful-api";
import { replaceOWithPaintedO } from "@/app/lib/utils/utils";
import Loader from "../ui/Loader";

export default function InfoSection() {
    const [componentContent, setComponentContent] = useState<IInfoSectionContent | undefined | null>(null);

    useEffect(() => {
        async function getContent() {
            const content = await getInfoSectionContent();

            setComponentContent(content);
        }

        getContent();
    }, []);

    if (componentContent === null) {
        return (
            <section className="min-h-[570px] bg-t-blue/15 animate-pulse flex items-center justify-center">
                <Loader />
            </section>
        )
    } else if (componentContent === undefined) {
        return null;
    } else {
        return (
            <Info componentContent={componentContent} />
        );
    }
}

function Info({ componentContent }: { componentContent: IInfoSectionContent }) {
    const { title, subtitlesList } = componentContent;

    const ref = useRef(null);
    const isInView = useInView(ref);

    return (
        <div ref={ref} className="relative z-10 overflow-hidden">
            <motion.div
                className="bg-t-blue rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 "
                initial={{ width: '0', height: '0' }}
                animate={isInView && { width: '200%', height: '200%' }}
                transition={{ duration: 0.7, delay: 0.3 }}
            ></motion.div>
            <section className="container relative px-4 py-[35px] mobile:pt-[49px] mobile:pb-[43px] lg:py-[51px] xl:pt-[85px] xl:pb-[59px] min-h-fit mobile:min-h-[570px] grid grid-cols-1 lg:grid-cols-2 gap-[15px] mobile:gap-[25px] lg:gap-5 xl:gap-[14px]">

                <motion.h5
                    className="inline-block max-w-[306px] lg:m-auto text-t-pale uppercase text-[28px] mobile-xs:text-[38px] mobile:text-[48px] font-bold leading-none"
                    initial={{ opacity: 0 }}
                    animate={isInView && { opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.7 }}
                >
                    {replaceOWithPaintedO(title, "#F6F5F8", "#3372F9")}
                </motion.h5>

                {subtitlesList.map((item, index) => (
                    <motion.div
                        key={index}
                        className="relative bg-white rounded-2xl h-[150px] mobile:h-[206px] overflow-hidden"
                        initial={{ opacity: 0 }}
                        animate={isInView && { opacity: 1 }}
                        transition={{ duration: 0.4, delay: 0.4 + index * 0.3 }}
                    >
                        <motion.p
                            className={`${openSansFont.className} absolute top-[9px] mobile:top-5 right-4 mobile:right-5 text-xl mobile-xs:text-2xl text-m-blue-dark`}
                            initial={{ opacity: 0, x: 50 }}
                            animate={isInView && { opacity: 1, x: 0 }}
                            transition={{ duration: 0.4, delay: 0.6 + index * 0.2 }}
                        >
                            {item.title}
                        </motion.p>
                        <motion.p
                            className="absolute -bottom-[18%] mobile-xs:-bottom-[14%] md:-bottom-[20%] lg:-bottom-[17%] left-[13px] text-[56px] mobile-xs:text-7xl mobile:text-[112px] md:text-[155px] lg:text-[112px] xl:text-[126px] font-bold text-t-blue uppercase"
                            initial={{ opacity: 0, y: 50, scale: 1.5 }}
                            animate={isInView && { opacity: 1, y: 0, scale: 1 }}
                            transition={{ duration: 0.4, delay: 0.6 + index * 0.2 }}
                        >
                            {item.text}
                        </motion.p>
                    </motion.div>
                ))}
            </section>
        </div>
    )
}