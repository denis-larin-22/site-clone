'use client'
import Image from "next/image";
import Link from "next/link";
import { CircleDecoreIcon } from "../components/assets/icons";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

function AppSection() {
    const ref = useRef(null);
    const isView = useInView(ref, { once: true });

    const generateAnimationParams = (isInView: boolean, delay: number) => ({
        initial: { opacity: 0, translateY: 50 },
        animate: isInView && { opacity: 1, translateY: 0 },
        transition: { duration: 0.4, delay },
    });

    return (
        <section ref={ref} className="bg-t-blue ">
            <div className="container relative h-[500px] lg:h-[550px] text-white overflow-y-hidden flex">
                <div className="relative z-20 h-full flex flex-col justify-center">
                    <motion.div
                        className="flex items-center px-2 py-1 border-2 border-white border-opacity-60 w-fit rounded-full bg-white bg-opacity-10"
                        {...generateAnimationParams(isView, 0.3)}
                    >
                        <Image
                            alt="Smarthone icon"
                            src={"/assets/images/app/smartphone.svg"}
                            width={15}
                            height={15}
                        />
                        <h5 className="text-xs lg:text-sm relative top-0.5 ml-1">Мобільний додаток для дилерів</h5>
                    </motion.div>

                    <motion.div
                        className="max-w-[750px] mt-3 lg:mt-10 mb-3 lg:mb-6"
                        {...generateAnimationParams(isView, 0.4)}
                    >
                        <p className="text-2xl lg:text-6xl font-bold mb-2 lg:mb-7">Завантажуй та керуй зі смартфону</p>
                        <p className="text-base lg:text-2xl text-gray-200 ">Замовлення, керування, баланс, каталог — все в одному застосунку Piramidspace.</p>
                    </motion.div>

                    <motion.ul
                        className="text-gray-200 flex flex-col gap-y-2 mb-2 lg:mb-4 text-sm md:text-base"
                        {...generateAnimationParams(isView, 0.5)}
                    >
                        <li className="flex items-center gap-2">
                            <Image
                                alt="Smarthone icon"
                                src={"/assets/images/app/tasks.svg"}
                                width={17}
                                height={17}
                                className="relative -top-0.5"
                            />
                            <p className="">Керування замовленнями онлайн</p>
                        </li>
                        <li className="flex items-center gap-2">
                            <Image
                                alt="Smarthone icon"
                                src={"/assets/images/app/resource.svg"}
                                width={15}
                                height={15}
                                className="relative -top-0.5"
                            />
                            <p className=""> Актуальний курс і баланс</p>                        </li>
                        <li className="flex items-center gap-2">
                            <Image
                                alt="Smarthone icon"
                                src={"/assets/images/app/catalog.svg"}
                                width={13}
                                height={13}
                                className="relative -top-0.5"
                            />
                            <p className="">Каталог (навіть офлайн)</p>
                        </li>
                    </motion.ul>

                    <motion.div
                        {...generateAnimationParams(isView, 0.6)}
                    >
                        <Link
                            href={"https://play.google.com/store/apps/details?id=piramid.test.app"}
                            target="_blank"
                            className="flex w-fit items-center"
                        >
                            <Image
                                alt="Smarthone icon"
                                src={"/assets/images/app/android.svg"}
                                width={50}
                                height={50}
                                className="w-[40px] lg:w-[50px] h-[40px] lg:h-[50px]"
                            />
                            <Image
                                alt="Smarthone icon"
                                src={"/assets/images/app/playmarket.png"}
                                width={200}
                                height={80}
                                className="w-[150px] lg:w-[200px] h-[60px] lg:h-[80px]"
                            />
                        </Link>
                    </motion.div>
                </div>

                <motion.div
                    className="h-fit absolute right-3 lg:right-28 -bottom-8 z-10"
                    {...generateAnimationParams(isView, 0.7)}
                >
                    <Image
                        alt="Smarthone icon"
                        src={"/assets/images/app/app.png"}
                        width={230}
                        height={320}
                        className="w-[115px] lg:w-[220px] h-[230px] lg:h-[440px]"
                    />
                </motion.div>

                <CircleDecoreIcon
                    fillColor="#6393fb"
                    height={250}
                    width={250}
                    className="w-[100px] lg:w-[250px] h-[100px] lg:h-[250px] absolute -rotate-180 z-0 right-3 lg:right-0 top-5"
                />
                <CircleDecoreIcon
                    fillColor="#6393fb"
                    height={250}
                    width={250}
                    className="w-[180px] lg:w-[250px] h-[180px] lg:h-[250px] absolute -rotate-90 z-0 left-3 lg:left-36 -bottom-16"
                />
            </div>
        </section>
    )
}

export default AppSection;