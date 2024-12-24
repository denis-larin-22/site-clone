'use client'

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { defaultCarouselList } from "@/app/lib/data/carousel-list";
import { getCarouselSectionContent, ICarouselSectionContent } from "@/app/lib/contentful/contentful-api";
import { replaceOWithPaintedO } from "@/app/lib/utils/utils";
import { Carousel } from "../ui/Carousel";

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
        // <section ref={ref} className="container mt-[47px] mobile:mt-20 mobile:mb-28 xl:my-[127px] px-4"> // Default
        <section ref={ref} className="relative z-20 container mt-[47px] mobile:mt-20 mobile:mb-28 xl:my-[127px] px-4">
            {
                componentContent === null ?
                    <p className="inline-block w-full md:w-[650px] h-20 md:h-36 rounded-lg bg-t-blue/15 animate-pulse"></p>
                    :
                    <>
                        <div className="flex flex-col xl:flex-row items-center justify-between">
                            <h5 className="relative z-10 max-w-[942px] text-[20px] mobile-xs:text-[24px] mobile:text-[38px] xl:text-[48px] leading-none font-bold uppercase">
                                {replaceOWithPaintedO(componentContent.title, "black", "#F6F5F8")}
                            </h5>
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


