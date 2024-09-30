'use client'

import { useEffect, useState } from "react";
import { OrderDemoLink } from "../ui/OrderDemoLink";
import { motion } from "framer-motion";
import { TypewriterEffect } from "../ui/TypewriterEffect";
import { getHeroSectionContent, IHeroSectionContent } from "@/app/lib/contentful/contentful-api";
import Loader from "../ui/Loader";

export default function HeroSection() {
    const [componentContent, setComponentContent] = useState<IHeroSectionContent | undefined | null>(null);

    useEffect(() => {
        async function getContent() {
            const content = await getHeroSectionContent();

            setComponentContent(content);
        }

        getContent();
    }, []);

    if (componentContent === null) {
        return (
            <section className="container min-h-[350px] pt-20 flex items-center justify-center ">
                <Loader />
            </section>
        )
    } else if (componentContent === undefined) {
        return null;
    } else {
        return (
            <section className="container justify-between mt-[26px] mobile:mt-[207px] lg:mt-[153px] xl:mt-[141px] mb-[76px] md:mb-[150px] lg:mb-[162px] xl:mb-[84px] px-4 font-semibold">
                <motion.div
                    initial={{ y: -15, opacity: 0, scale: 0.95 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    transition={{ duration: 0.7 }}
                    className="min-h-[320px] mobile-xs:min-h-[420px] md:min-h-40 font-bold text-[28px] mobile-xs:text-[38px] mobile:text-[40px] leading-[117%] mobile:leading-tight uppercase"
                >
                    <h1 className="">{componentContent.staticText} <TypewriterEffect strings={componentContent.typewritingText} /></h1>
                </motion.div>

                <div className="text-xl flex flex-col md:flex-row md:items-center gap-[15px]">
                    <motion.span className="inline-block"
                        initial={{ rotateX: 90, opacity: 0 }}
                        animate={{ rotateX: 0, opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.3 }}
                    >
                        <OrderDemoLink />
                    </motion.span>
                    <motion.span className="inline-block"
                        initial={{ x: 90, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.5 }}
                    >
                        <ArrowLink />
                    </motion.span>
                </div>
            </section>
        )
    }
}

function ArrowLink() {
    return (
        <>
            {/* Link with hover arrow */}
            <a href="/become-dealer" className="hidden xl:inline-flex items-center relative group pr-20 ml-[33px] text-m-blue-dark">
                Стати дилером
                <span className="absolute left-[72%] inline-flex items-center h-0.5 w-[78px] rounded-2xl group-hover:w-screen duration-1000 bg-m-blue-dark before:content-arrow before:absolute before:-right-0.5 before:-top-2.5 pointer-events-none"></span>
                <span className="absolute right-[100vw] group-hover:right-1/3 top-[110px] inline-flex items-center h-0.5 w-[100vw] rounded-2xl duration-1000 bg-m-blue-dark before:content-arrow before:absolute before:-right-0.5 before:-top-2.5"></span>
            </a>
            {/* Link without hover arrow */}
            <a href="/become-dealer" className="inline-flex xl:hidden items-center relative pr-20 ml-0 md:ml-[33px] text-base md:text-xl text-m-blue-dark ">
                Стати дилером
                <span className="absolute left-[72%] inline-flex items-center h-0.5 w-[63px] rounded-2xl bg-m-blue-dark before:content-arrow before:absolute before:-right-0.5 before:-top-2 md:before:-top-2.5"></span>
            </a>
        </>
    )
}