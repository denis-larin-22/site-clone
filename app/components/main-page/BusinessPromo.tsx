'use client'

import { useEffect, useState } from "react";
import { CircleDecoreIcon } from "../assets/icons";
import { OrderDemoLink } from "../ui/OrderDemoLink";
import PaintedO from "../ui/PaintedO";
import { getBusinessPromoContent } from "@/app/lib/contentful/contentful-api";
import { replaceOWithPaintedO } from "@/app/lib/utils/utils";

export default function BusinessPromo() {
    const BLUE_CIRCLE_COLOR = "#3372F9";
    const GREEN_CIRCLE_COLOR = "#07F6BA";

    const [isHovered, setIsHovered] = useState<boolean>(false); // Link hover
    const [contentText, setContentText] = useState<string | null>(null);

    useEffect(() => {
        async function getContent() {
            const text = await getBusinessPromoContent();

            if (text === undefined) {
                setContentText("Зробіть свій бізнес ще потужнішим") // Default value
            } else {
                setContentText(text);
            }
        }

        getContent();
    }, [])

    return (
        <div className="relative z-0 max-w-[1354px] px-4 mx-auto my-7 xl:my-36">
            {/* Desktop screen */}
            <section className="relative hidden xl:flex justify-between min-h-[539px] pt-[162px] pr-[69px] pb-[131px] pl-[97px] bg-m-blue-dark rounded-[22px] text-white">
                <a href="#header" className="group absolute -top-[20%] xl:-top-[12%] right-16">
                    <CircleDecoreIcon
                        fillColor={isHovered ? GREEN_CIRCLE_COLOR : BLUE_CIRCLE_COLOR}
                        width={190}
                        height={190}
                        className={`rotate-[220deg] group-hover:rotate-[138deg] duration-500`}
                    />
                    <Arrow className="absolute inset-0 m-auto group-hover:rotate-45 duration-500" isHovered={isHovered} />
                </a>

                {
                    contentText === null ?
                        <div className="flex flex-col gap-5">
                            <div className="w-[650px] h-full rounded-lg bg-t-gray/40 animate-pulse"></div>
                            <div className="w-[450px] h-full rounded-lg bg-t-gray/40 animate-pulse"></div>
                            <div className="w-[550px] h-full rounded-lg bg-t-gray/40 animate-pulse"></div>
                        </div>
                        :
                        <h3 className="max-w-[643px] text-[71px] font-bold uppercase leading-tight">
                            {replaceOWithPaintedO(contentText, 'white', '#2B2548')}
                        </h3>
                }

                <div className="flex flex-col items-center xl:items-start gap-y-[23px] gap-x-[33px] text-xl font-semibold xl:self-end">
                    <a href="/become-dealer" className="relative group pr-20 flex items-center">
                        Стати дилером
                        <span className="absolute left-[72%] inline-flex items-center h-0.5 w-[65px] xl:group-hover:w-52 duration-1000 bg-white group-hover:bg-t-pale before:content-arrow before:absolute before:-right-0.5 before:-top-2.5 before:text-t-pale before:invert pointer-events-none"></span>
                        <span className="absolute right-[100vw] xl:group-hover:right-[45vw] -bottom-[118px] inline-flex items-center h-0.5 w-[100vw] duration-1000 bg-t-pale before:content-arrow before:absolute before:-right-0.5 before:-top-2.5 before:invert"></span>
                    </a>
                    <span
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        <OrderDemoLink />
                    </span>
                </div>
            </section >
            {/* Decore background circles */}
            {
                [1, 2, 3].map((item, index) => {
                    return (
                        <CircleDecoreIcon
                            key={item}
                            fillColor={GREEN_CIRCLE_COLOR}
                            width={190}
                            height={190}
                            className={`hidden mobile:inline-block absolute -z-10 ${getCirclePosition(index, isHovered)}`}
                        />
                    )
                })
            }

            {/* Mobile and tablet screens */}
            <section className="relative flex xl:hidden flex-col justify-between min-h-[293px] sm:min-h-[342px] lg:min-h-[430px] px-[18px] mobile:px-4 lg:px-[50px] py-[35px] mobile:py-10 lg:py-20 bg-m-blue-dark rounded-[22px] text-white">
                <h3 className="max-w-[640px] text-[28px] sm:text-[52px] font-bold uppercase leading-tight">Зр<PaintedO color="white" bgColor="#2B2548" />біть свій бізнес ще <span className="whitespace-nowrap">п<PaintedO color="white" bgColor="#2B2548" />тужнішим</span></h3>
                <div className="flex flex-col md:flex-row items-start md:items-center gap-x-[33px] gap-y-[15px] text-xl font-semibold">
                    <OrderDemoLink className="w-fit" />
                    <a href="/become-dealer" className="relative pr-20 flex items-center text-base sm:text-xl">
                        Стати дилером
                        <span className="absolute left-[72%] inline-flex items-center h-0.5 w-[65px] bg-white before:content-arrow before:absolute before:-right-0.5 before:-top-2 md:before:-top-2.5 before:text-t-pale before:invert pointer-events-none"></span>
                    </a>
                </div>

                <a href="#header" className="hidden md:inline absolute -top-[30%] lg:-top-[20%] right-5">
                    <CircleDecoreIcon
                        fillColor={BLUE_CIRCLE_COLOR}
                        width={163}
                        height={163}
                        className={`rotate-[220deg] w-[163px] lg:w-[204px] h-[163px] lg:h-[204px]`}
                    />
                    <Arrow className="absolute inset-0 m-auto" isHovered={isHovered} />
                </a>
            </section >
        </div>
    )
}

function getCirclePosition(index: number, isHovered: boolean) {
    const circlePositions = [
        `${isHovered ? "rotate-0" : "rotate-90"}  left-[56px] ${isHovered ? "-bottom-[95px]" : "bottom-0"} duration-500`,
        `${isHovered ? "rotate-90" : "rotate-0"}  left-[40%]  ${isHovered ? "-top-[95px]" : "top-0"} duration-500`,
        `${isHovered ? "rotate-90" : "rotate-180"}  right-9  ${isHovered ? "-bottom-[95px]" : "bottom-0"} duration-500`,
    ];
    return circlePositions[index];
}

// SVG icons
function Arrow({ className, isHovered }: { className: string, isHovered: boolean }) {
    return (
        <svg width="43" height="70" viewBox="0 0 43 70" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
            <path d="M21.8325 68.8418L21.8322 1.1762M21.8322 1.1762L1.74768 21.3418M21.8322 1.1762L41.7477 21.3418" stroke={isHovered ? "#09022A" : "#F6F5F8"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="duration-500" />
        </svg>
    )
}