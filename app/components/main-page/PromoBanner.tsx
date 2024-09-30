'use client'

import { useEffect, useRef, useState } from "react";
import { CircleDecoreIcon } from "../assets/icons";
import Link from "next/link";
import { useInView } from "framer-motion";
import { getPromoBannerContent } from "@/app/lib/contentful/contentful-api";
import { wrapInBlueText } from "@/app/lib/utils/utils";

export default function PromoBanner() {
    const DECOR_CIRCLE_COLOR = "#3372F9";
    const [contentText, setContentText] = useState<string | null>(null);

    useEffect(() => {
        async function getContent() {
            const text = await getPromoBannerContent();

            if (text === undefined) {
                setContentText("Дізнайтесь як працює #Piramid Space#") // Default value
            } else {
                setContentText(text);
            }
        }

        getContent();
    }, []);

    const [isHovered, setIsHovered] = useState<boolean>(false); // Link hover
    const ref = useRef(null); // Animation container
    const isInView = useInView(ref, { once: true }); // Animation trigger

    return (
        <div ref={ref} className="relative">
            <section className="container h-[545px] mobile:h-[346px] lg:h-[299px] xl:h-[334px] px-4 flex items-center">
                <div className="w-full flex flex-col lg:flex-row items-start mobile:items-center justify-between">
                    {
                        contentText === null ?
                            <div className="flex flex-col gap-5">
                                <p className="inline-block w-[500px] h-10 bg-t-blue/15 animate-pulse rounded-lg"></p>
                                <p className="inline-block w-[250px] h-10 bg-t-blue/15 animate-pulse rounded-lg"></p>
                            </div>
                            :
                            <h5 className="relative z-10 uppercase text-[28px] mobile-xs:text-[38px] mobile:text-[40px] xl:text-5xl text-center lg:text-left font-bold leading-tight mobile:leading-none text-t-blue-dark max-w-[620px] xl:max-w-[760px]">
                                {wrapInBlueText(contentText)}
                            </h5>
                    }

                    {/* Link with hover arrow (only desktop) */}
                    <Link
                        href="/order-demo"
                        className="relative group hidden self-auto lg:self-start xl:inline-flex pr-20 text-xl font-semibold text-m-blue-dark items-center mx-auto"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        Замовити демо
                        <span className="absolute z-10 left-[72%] inline-flex items-center h-0.5 w-[78px] rounded-2xl group-hover:w-screen duration-1000 bg-m-blue-dark before:content-arrow before:absolute before:-right-0.5 before:-top-2.5 pointer-events-none"></span>
                        <span className="absolute z-10 right-[100vw] group-hover:right-[45vw] top-[147px] inline-flex items-center h-0.5 w-[100vw] duration-1000 bg-m-blue-dark before:content-arrow before:absolute before:-right-0.5 before:-top-2.5"></span>
                    </Link>

                    {/* Link without hover arrow */}
                    <Link
                        href="/order-demo"
                        className="relative pr-20 text-base mobile-xs:text-xl font-semibold text-m-blue-dark inline-flex xl:hidden items-center mx-auto mt-9"
                    >
                        Замовити демо
                        <span className="absolute z-10 left-[72%] inline-flex items-center h-0.5 w-[63px] mobile:w-[100px] rounded-2xl bg-m-blue-dark before:content-arrow before:absolute before:-right-0.5 before:-top-2 mobile-xs:before:-top-2.5 pointer-events-none"></span>
                    </Link>
                </div>
            </section>

            {/* Desktop screen - Decoration elements */}
            <div className="hidden xl:block">
                {[1, 2, 3].map((icon) => (
                    <CircleDecoreIcon
                        key={icon}
                        width={190}
                        height={190}
                        fillColor={DECOR_CIRCLE_COLOR}
                        className={
                            icon === 1 ?
                                `hidden xl:inline absolute right-[35%] ${isHovered ? '-top-1/4 opacity-100 rotate-0' : '-top-52 opacity-0 rotate-90'} duration-500`
                                :
                                icon === 2 ?
                                    `hidden xl:inline absolute top-[30%] ${isHovered ? '-right-[5%] opacity-100 rotate-45' : '-right-52 opacity-0 rotate-180'} duration-500`
                                    :
                                    `hidden xl:inline absolute -bottom-1/4 left-[40%] ${isHovered ? '-bottom-1/4 opacity-100 -rotate-45' : '-bottom-52 rotate-180 opacity-0'} duration-500`
                        }
                    />
                ))}
            </div>

            {/* Tablet screen - Decoration elements */}
            <div className="hidden mobile:block xl:hidden">
                {[1, 2, 3, 4].map((icon) => {
                    switch (icon) {
                        case 1:
                            return (
                                <CircleDecoreIcon key={icon} width={145} height={145} fillColor={DECOR_CIRCLE_COLOR}
                                    className={`absolute -left-[5%] ${isInView ? "-top-[20%] -rotate-[140deg] mobile:-rotate-90 opacity-100" : "-top-full rotate-0 opacity-0"} duration-500 delay-500`}
                                />
                            )
                        case 2:
                            return (
                                <CircleDecoreIcon key={icon} width={159} height={159} fillColor={DECOR_CIRCLE_COLOR}
                                    className={`absolute left-1/2 ${isInView ? "-top-[20%] mobile:-top-[30%] -rotate-[90deg] mobile:-rotate-[130deg] opacity-100" : "-top-full rotate-0 opacity-0"} rotate-90 duration-500 delay-500`}
                                />
                            )
                        case 3:
                            return (
                                <CircleDecoreIcon key={icon} width={205} height={205} fillColor={DECOR_CIRCLE_COLOR}
                                    className={`absolute left-[40%] mobile:-left-[2%] ${isInView ? "-bottom-[35%] rotate-[230deg] opacity-100" : "-bottom-full rotate-0 opacity-0"} rotate-90 duration-500 delay-500`}
                                />
                            )
                        case 4:
                            return (
                                <CircleDecoreIcon key={icon} width={159} height={159} fillColor={DECOR_CIRCLE_COLOR}
                                    className={`absolute -bottom-[20%] ${isInView ? "-right-[5%] mobile:-right-[2%] rotate-[180deg] opacity-100" : "-right-full rotate-0 opacity-0"} rotate-90 duration-500 delay-500`}
                                />
                            )
                        default: return
                    }
                })}
            </div>

            {/* Mobile screen - Decoration elements */}
            <div className="block mobile:hidden">
                {[1, 2, 3].map((icon) => {
                    switch (icon) {
                        case 1:
                            return (
                                <CircleDecoreIcon key={icon} width={112} height={112} fillColor={DECOR_CIRCLE_COLOR}
                                    className={`absolute left-[5%] ${isInView ? "-top-[10%] -rotate-[140deg] opacity-100" : "-top-full rotate-0 opacity-0"} duration-500 delay-500`}
                                />
                            )
                        case 2:
                            return (
                                <CircleDecoreIcon key={icon} width={159} height={159} fillColor={DECOR_CIRCLE_COLOR}
                                    className={`absolute bottom-[18%] ${isInView ? "-left-[37%] -rotate-[150deg] opacity-100" : "-left-full rotate-0 opacity-0"} rotate-90 duration-500 delay-500`}
                                />
                            )
                        case 3:
                            return (
                                <CircleDecoreIcon key={icon} width={159} height={159} fillColor={DECOR_CIRCLE_COLOR}
                                    className={`absolute bottom-[2%] ${isInView ? "-right-[20%] rotate-[180deg] opacity-100" : "-right-full rotate-0 opacity-0"} rotate-90 duration-500 delay-500`}
                                />
                            )
                        default: return
                    }
                })}
            </div>
        </div >
    )
}