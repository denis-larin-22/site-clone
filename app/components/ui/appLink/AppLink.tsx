'use client'

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

function AppLink() {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setIsOpen(true);
        }, 2000)
    }, []);

    return (
        <>
            <button
                className={`fixed bottom-52 md:bottom-40 right-3 md:right-5 z-40 flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-medium font-medium rounded-full shadow-lg hover:scale-105 transition-transform`}
                onClick={() => setIsOpen(true)}
            >
                {/* Mobile pulse anim */}
                <span
                    className="inline-block md:hidden w-16 h-16 rounded-full bg-t-blue/40 absolute z-0 -top-[150%] -left-[90%] animate-pulse"
                />

                <span className="hidden md:inline mr-11">Додаток</span>
                <span className="w-14 h-14 flex items-center justify-center bg-t-blue border-4 border-blue-600 rounded-full absolute right-0 z-45">
                    <Image
                        src="/assets/images/app/smartphone.svg"
                        alt="Feedback Icon"
                        width={36}
                        height={36}
                        className="w-9 h-9"
                    />
                </span>
            </button >

            <AnimatePresence>
                {isOpen && <motion.main
                    key="appLink"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.5 }}
                    className="flex fixed top-0 left-0 z-50 h-dvh w-screen bg-[#00000060] items-center justify-center"
                >
                    <section className="bg-t-blue rounded-3xl overflow-hidden ">

                        <div className="container relative py-10 px-6 text-white">
                            <button
                                className="absolute top-3 right-3"
                                onClick={() => setIsOpen(false)}
                            >
                                <Image
                                    src="/assets/images/app/close.svg"
                                    alt="Smartphone"
                                    width={40}
                                    height={40}
                                    className="w-[30px] lg:w-[40px] h-[30px] lg:h-[40px]"
                                />
                            </button>

                            <div className="flex flex-col items-center text-center">
                                <div className="">
                                    {/* Мини-иконка */}
                                    <div className="flex items-center px-4 py-2 border border-white/60 rounded-full bg-white/10 w-fit mb-2 sm:mb-6">
                                        <Image
                                            src="/assets/images/app/smartphone.svg"
                                            alt="Smartphone"
                                            width={18}
                                            height={18}
                                        />
                                        <span className="text-sm ml-2">Мобільний додаток</span>
                                    </div>

                                    <h3 className="text-2xl lg:text-3xl font-bold mb-1 sm:mb-3">
                                        Завантажуй та керуй зі смартфону
                                    </h3>

                                    <p className="text-gray-200 max-w-[320px] mb-2 sm:mb-6 text-[15px] text-left">
                                        Замовлення, баланс, каталог — все в одному застосунку Piramidspace
                                    </p>

                                    {/* Фичи */}
                                    <ul className="space-y-3 mb-16  sm:mb-8 text-left w-full max-w-[280px]">
                                        <li className="flex items-center gap-3 text-xs sm:text-sm">
                                            <Image src="/assets/images/app/tasks.svg" alt="" width={20} height={20} />
                                            <span>Керування замовленнями онлайн</span>
                                        </li>
                                        <li className="flex items-center gap-3 text-xs sm:text-sm">
                                            <Image src="/assets/images/app/resource.svg" alt="" width={20} height={20} />
                                            <span>Актуальний курс і баланс</span>
                                        </li>
                                        <li className="flex items-center gap-3 text-xs sm:text-sm">
                                            <Image src="/assets/images/app/catalog.svg" alt="" width={20} height={20} />
                                            <span>Каталог (навіть офлайн)</span>
                                        </li>
                                    </ul>
                                </div>

                                {/* Кнопка скачивания */}
                                <Link
                                    href={"https://play.google.com/store/apps/details?id=piramid.test.app"}
                                    target="_blank"
                                    className="flex w-fit items-center self-start"
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

                                {/* Мини-изображение телефона */}
                                <div className="absolute right-1 sm:right-8 -bottom-12">
                                    <Image
                                        src="/assets/images/app/app.png"
                                        alt="Piramidspace App"
                                        width={160}
                                        height={320}
                                        className="drop-shadow-2xl w-[100px] sm:w-[160px] h-[200px] sm:h-[320px] "
                                    />
                                </div>
                            </div>
                        </div>
                    </section>
                </motion.main>}
            </AnimatePresence >
        </>
    )
}

export default AppLink;