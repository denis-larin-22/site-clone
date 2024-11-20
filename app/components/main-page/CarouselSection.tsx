'use client'

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { defaultCarouselList } from "@/app/lib/data/carousel-list";
import { getCarouselSectionContent, ICarouselSectionContent } from "@/app/lib/contentful/contentful-api";
import { replaceOWithPaintedO } from "@/app/lib/utils/utils";
import { Carousel } from "../ui/Carousel";
import Link from "next/link";

export default function CarouselSection() {
    const ref = useRef(null); // Animation container
    const isInView = useInView(ref, { once: true });

    const [componentContent, setComponentContent] = useState<ICarouselSectionContent | null>(null);

    useEffect(() => {
        async function getContent() {
            const content = await getCarouselSectionContent();
            if (content === undefined) {
                setComponentContent({
                    title: "Дослідіть широкий вибір наших віконних рішень",
                    carouselList: defaultCarouselList
                }) // Default value
            } else {
                setComponentContent(content);
            }
        }

        getContent();
    }, [])

    return (
        <section ref={ref} className="container mt-[47px] mobile:mt-20 mobile:mb-28 xl:my-[127px] px-4">
            {
                componentContent === null ?
                    <p className="inline-block w-full md:w-[650px] h-20 md:h-36 rounded-lg bg-t-blue/15 animate-pulse"></p>
                    :
                    <>
                        <div className="flex items-center justify-between">
                            <h5 className="relative z-10 max-w-[942px] text-[20px] mobile-xs:text-[24px] mobile:text-[38px] xl:text-[48px] leading-none font-bold uppercase">
                                {replaceOWithPaintedO(componentContent.title, "black", "#F6F5F8")}
                            </h5>
                            <Link href={"/catalog"} className="group flex items-center gap-2  hover:bg-t-blue duration-150 rounded-3xl pl-3 hover:text-white">
                                Усі товари
                                <span
                                    className="-rotate-[33deg] group-hover:-rotate-[123deg] duration-250 inline-flex items-center justify-center h-10 w-10 rounded-full bg-t-blue cursor-pointer pointer-events-none"
                                >
                                    <svg width="16" height="21" viewBox="0 0 16 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1.4565 19.7035L13.2742 1.14709M13.2742 1.14709L4.45319 3.82839M13.2742 1.14709L14.9966 10.543" stroke="#F6F5F8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </span>
                            </Link>
                        </div>
                        <Carousel
                            carouselList={componentContent.carouselList}
                            isInView={isInView}
                        />
                    </>
            }
        </section >
    )
}


