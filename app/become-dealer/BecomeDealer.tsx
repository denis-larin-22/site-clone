'use client'

import { useEffect, useState } from "react";
import { openSansFont } from "../components/ui/fonts";
import { motion } from "framer-motion";
import { getBecomeDealerContent, IBecomeDealerContent } from "../lib/contentful/contentful-api";
import { replaceOWithPaintedO } from "../lib/utils/utils";
import FormBecomeDealer from "../components/ui/forms/FormBecomeDealer";
import Loader from "../components/ui/Loader";

export default function BecomeDealer() {
    const [componentContent, setComponentContent] = useState<IBecomeDealerContent | null>(null);

    useEffect(() => {
        async function getContent() {
            const content = await getBecomeDealerContent();

            if (content === undefined) {
                setComponentContent(null);
            } else {
                setComponentContent(content);
            }
        }

        getContent();
    }, []);

    const generateAnimationParams = (delay: number) => ({
        initial: { opacity: 0, y: -20, rotateX: 40 },
        animate: { opacity: 1, y: 0, rotateX: 0 },
        transition: { duration: 1, delay },
    });

    return (
        <main className="flex-grow container mt-[79px] md:mt-[110px] lg:mt-[95px] xl:mt-[25px] mb-[99px] xl:mb-0 flex flex-col lg:flex-row items-start gap-5">
            {componentContent === null ?
                <div className="w-full flex justify-center mt-40">
                    <Loader />
                </div>
                :
                <article className="max-w-full xl:max-w-[714px] mb-[109px]">
                    <motion.p
                        className="xl:pt-[21px] mb-5 md:mb-5 xl:mb-[35px] text-sm md:text-base text-t-blue font-semibold uppercase"
                        {...generateAnimationParams(0.2)}
                    >
                        Стати дилером
                    </motion.p>
                    <motion.h1
                        className="uppercase text-[#09022B] text-[28px] md:text-[40px] font-bold leading-tight"
                        {...generateAnimationParams(0.4)}
                    >
                        {replaceOWithPaintedO(componentContent.title, "#09022B", "#EEEEEE")}
                    </motion.h1>
                    <motion.p
                        className={openSansFont.className + " text-sm md:text-xl text-[#A2A2A8] mt-5 mb-[30px] xl:mb-[49px]"}
                        {...generateAnimationParams(0.6)}
                    >
                        {componentContent.text}
                    </motion.p>

                    <ul className={openSansFont.className + " text-sm md:text-xl text-[#A2A2A8] flex flex-col gap-y-[15px] md:gap-y-2.5 "}>
                        {componentContent.advantagesList.map((text, index) => (
                            <motion.li
                                key={index}
                                className="flex items-center gap-x-[13px] xl:gap-x-[17px]"
                                {...generateAnimationParams((0.8 + Number(`0.${index + 2}`)))}
                            >
                                <svg width="17" height="15" viewBox="0 0 13 11" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M12.0767 0.183115C12.5279 0.501608 12.6355 1.12557 12.317 1.57677L5.67181 10.9908L0.335647 6.24749C-0.0771359 5.88057 -0.114317 5.2485 0.252601 4.83572C0.619519 4.42294 1.25159 4.38576 1.66437 4.75267L5.32821 8.00941L10.683 0.423399C11.0015 -0.0277996 11.6255 -0.135379 12.0767 0.183115Z" fill="#3372F9" />
                                </svg>
                                <p>{text}</p>
                            </motion.li>
                        ))}
                    </ul>
                </article>
            }

            <FormBecomeDealer />
        </main >
    )
};