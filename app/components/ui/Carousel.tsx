import Link from "next/link";
import { openSansFont } from "./fonts";
import { motion } from "framer-motion";
import { CarouselList } from "@/app/lib/contentful/contentful-api";

interface IProps {
    carouselList: CarouselList,
    isInView: boolean
}

export function Carousel({ carouselList, isInView }: IProps) {
    return (
        <>
            <CarouselListDesktop
                carouselList={carouselList}
                isInView={isInView}
            />

            <CarouselListTablet
                carouselList={carouselList}
                isInView={isInView}
            />

            <CarouselListMobile
                carouselList={carouselList}
                isInView={isInView}
            />
        </>
    )
}

function CarouselListDesktop({ carouselList, isInView }: IProps) {
    // Get spawn animation for each card
    const getAnimInViewDesktop = (isInView: boolean, elementIndex: number) => {
        const transition = "all 1s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s"
        const styles = [
            {
                rotate: isInView ? 0 : 45,
                translateY: isInView ? 0 : '500px',
                translateX: isInView ? 0 : '-100px',
                transition,
            },
            {
                rotate: isInView ? 0 : -45,
                translateY: isInView ? 0 : '200px',
                translateX: isInView ? 0 : '600px',
                transition
            },
            {
                rotate: isInView ? 0 : 50,
                translateY: isInView ? 0 : '-450px',
                translateX: isInView ? 0 : '200px',
                transition
            },
            {
                rotate: isInView ? 0 : -15,
                translateY: isInView ? 0 : '50px',
                translateX: isInView ? 0 : '-500px',
                transition
            }
        ];

        if (elementIndex <= 3) {
            return styles[elementIndex];
        } else {
            return styles[Math.floor(Math.random() * 3) + 0] //Random index animation from 0 to 3
        }
    };

    return (
        <ul className={`relative hidden xl:flex gap-x-5 duration-500 ease-in-out mt-[100px]`}>
            {carouselList.map((item, index) => (
                <motion.li
                    key={index}
                    className="group relative flex-shrink-0 flex-grow-0 rounded-[14px]"
                    style={getAnimInViewDesktop(isInView, index)}
                >
                    <Link href={"/catalog"}>
                        <img
                            alt={`Зображення для ${item.image.alt}`}
                            title={`Зображення для ${item.image.alt}`}
                            src={item.image.src}
                            className="w-[294px] h-[438px] object-cover rounded-[14px]"
                        />
                        <p style={{
                            opacity: isInView ? "100" : "0",
                            transition: "opacity 1s 1.5s, bottom 0.3s"
                        }}
                            className={`${openSansFont.className} absolute z-10 -bottom-9 group-hover:bottom-1/2 duration-250 left-1/2 -translate-x-1/2 mt-2.5 text-center text-xl group-hover:text-[#F6F5F8] text-m-blue-dark whitespace-nowrap pointer-events-none`}
                        >
                            {item.title}
                        </p>
                        {/* Open link */}
                        <div className="absolute z-10 opacity-0 group-hover:opacity-100 -bottom-[5%] group-hover:-bottom-[3%] -right-[7%] group-hover:-right-[5%] duration-250">
                            <DecorSpot />
                            <span
                                className="absolute bottom-[32%] right-[26%] -rotate-45 group-hover:rotate-0 duration-250 inline-flex items-center justify-center h-12 w-12 rounded-full bg-t-blue cursor-pointer pointer-events-none"
                            >
                                <svg width="16" height="21" viewBox="0 0 16 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1.4565 19.7035L13.2742 1.14709M13.2742 1.14709L4.45319 3.82839M13.2742 1.14709L14.9966 10.543" stroke="#F6F5F8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </span>
                        </div>
                        {/* Blue glass effect */}
                        <div style={{
                            background: isInView ? "transparent" : "#3372F9",
                            transition: "all 1s 1.5s"
                        }}
                            className="rounded-[14px] absolute top-0 bottom-0 left-0 right-0 overflow-hidden after:block after:w-full after:h-full after:top-0 after:left-0 after:bg-t-blue after:bg-opacity-0 group-hover:after:bg-opacity-50 after:duration-250"
                        ></div>
                    </Link>
                </motion.li>
            ))}
        </ul>
    )
};

function CarouselListTablet({ carouselList, isInView }: IProps) {
    // Get spawn animation for each card
    const getAnimInViewMobile = (isInView: boolean, elementIndex: number) => {
        const transition = "all 1s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s"
        const styles = [
            {
                rotate: isInView ? 0 : -30,
                translateY: isInView ? 0 : '-20%',
                translateX: isInView ? 0 : '-90%',
                transition,
            },
            {
                rotate: isInView ? 0 : 40,
                translateY: isInView ? 0 : '60%',
                translateX: isInView ? 0 : '-40%',
                transition
            },
            {
                rotate: isInView ? 0 : 20,
                translateY: isInView ? 0 : '-40%',
                translateX: isInView ? 0 : '-70px',
                transition
            },
            {
                rotate: isInView ? 0 : -45,
                translateY: isInView ? 0 : '70%',
                translateX: isInView ? 0 : '30%',
                transition
            }
        ];

        if (elementIndex <= 3) {
            return styles[elementIndex];
        } else {
            return styles[Math.floor(Math.random() * 3) + 0] //Random index animation from 0 to 3
        }
    };

    return (
        <ul className="hidden md:flex xl:hidden flex-wrap gap-y-5 justify-center gap-x-5 mt-10">
            {carouselList.map((item, index) => (
                <motion.li
                    key={index}
                    style={getAnimInViewMobile(isInView, index)}
                >
                    <Link href={"/catalog"} className="inline-block w-[231px] h-[369px]">
                        <div className="relative z-0">
                            <img
                                alt={`Зображення до ${item.image.alt}`}
                                title={`Зображення для ${item.image.alt}`}
                                src={item.image.src}
                                loading="lazy"
                                className="object-cover rounded-[11px] w-full h-full"
                            />
                            {/* Start blue block */}
                            <div
                                style={{
                                    background: isInView ? "transparent" : "#3372F9",
                                    transition: "all 1s 1.2s"
                                }}
                                className="rounded-[11px] absolute top-0 bottom-0 left-0 right-0 overflow-hidden"
                            ></div>
                        </div>

                        <p
                            className={openSansFont.className + " text-[21px] text-center mt-[5px]"}
                            style={{
                                opacity: isInView ? 100 : 0,
                                transition: "opacity 1s 1.5s, bottom 0.3s"
                            }}
                        >
                            {item.title}
                        </p>
                    </Link>
                </motion.li>
            ))}
        </ul>
    )
}

function CarouselListMobile({ carouselList, isInView }: IProps) {
    // Get spawn animation for each card
    const getAnimInViewMobile = (isInView: boolean, elementIndex: number) => {
        const transition = "all 1s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s"
        const styles = [
            {
                rotate: isInView ? 0 : 30,
                translateY: isInView ? 0 : '20px',
                translateX: isInView ? 0 : '190px',
                transition
            },
            {
                rotate: isInView ? 0 : -20,
                translateY: isInView ? 0 : '-40px',
                translateX: isInView ? 0 : '-190px',
                transition,
            },
            {
                rotate: isInView ? 0 : -45,
                translateY: isInView ? 0 : '50px',
                translateX: isInView ? 0 : '200px',
                transition
            },
            {
                rotate: isInView ? 0 : 45,
                translateY: isInView ? 0 : '-10px',
                translateX: isInView ? 0 : '-190px',
                transition
            }
        ];

        if (elementIndex <= 3) {
            return styles[elementIndex];
        } else {
            return styles[Math.floor(Math.random() * 3) + 0] //Random index animation from 0 to 3
        }
    };

    return (
        <ul className="grid md:hidden grid-cols-2 gap-x-2.5 gap-y-6 mt-10 mb-12">
            {carouselList.map((item, index) => (
                <motion.li
                    key={index}
                    className="relative z-0 flex flex-col items-center gap-y-[27px]"
                    style={getAnimInViewMobile(isInView, index)}
                >
                    <Link href={"/catalog"} className="inline-block w-[135px] mobile-xs:w-[172px] md:w-[231px] h-[233px] mobile-xs:h-[272px] md:h-[369px]">
                        <div className="relative z-0">
                            <img
                                alt={`Зображення до ${item.image.alt}`}
                                title={`Зображення для ${item.image.alt}`}
                                src={item.image.src}
                                loading="lazy"
                                className="object-cover rounded-[11px] w-full h-full"
                            />
                            {/* Start blue block */}
                            <div
                                style={{
                                    background: isInView ? "transparent" : "#3372F9",
                                    transition: "all 1s 1.2s"
                                }}
                                className="rounded-[11px] absolute top-0 bottom-0 left-0 right-0 overflow-hidden"
                            ></div>
                        </div>

                        <p
                            className={openSansFont.className + " text-base text-center mt-[5px]"}
                            style={{
                                opacity: isInView ? 100 : 0,
                                transition: "opacity 1s 1.5s, bottom 0.3s"
                            }}
                        >
                            {item.title}
                        </p>
                    </Link>
                </motion.li>
            ))}
        </ul>
    )
}

// Icon
function DecorSpot() {
    return (
        <svg width="89" height="102" viewBox="0 0 89 102" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M75.3286 1.0594C75.3286 -10.3319 98.4557 73.4551 82.8659 93.5429C67.3933 113.48 -13.0526 89.5597 1.82677 89.5596C30.9903 89.5594 16.6772 73.375 10.2541 53.9673C3.83098 34.5596 18.7612 14.0596 37.8262 14.0596C56.8911 14.0596 75.9238 22.6478 75.3286 1.0594Z" fill="#F6F5F8" />
        </svg>
    )
};