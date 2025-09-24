'use client'

import Link from "next/link";
import Logo from "./logo/Logo";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Header() {
    return (
        <>
            <div id="header" className="relative z-40 bg-m-blue-dark mb-[18px] text-xs mobile:text-sm">
                <nav className="max-w-[1272px] mx-auto px-4 py-[7px] text-white flex items-center">
                    <p className="text-xs text-center w-full">© 2025 ТОВ Пірамідспейс</p>
                    {/* <LoginLink /> */}
                </nav>
            </div>

            <header className="container sticky z-50 top-2">
                <nav className="relative py-[13px] mobile:py-4 px-5 mobile:px-6 backdrop-blur-lg bg-white/40 rounded-[34px] flex items-center justify-between">
                    <Logo />

                    <div className="flex items-center gap-x-1 md:gap-x-3.5 font-semibold relative -right-4 md:right-0">
                        <HeaderLink
                            href="/catalog"
                            text="Каталог"
                            iconSrc="/assets/images/header/catalog-svg.svg"
                            iconSize={25}
                        />

                        <HeaderLink
                            href="https://piramidspace.blogspot.com/"
                            linkTarget="_blank"
                            text="Блог"
                            iconSrc="/assets/images/header/blog-svg.svg"
                            iconSize={25}
                        />

                        <HeaderLink
                            href="/become-dealer"
                            text="Стати дилером"
                            iconSrc="/assets/images/header/new-user-svg.svg"
                            iconSize={25}
                        />

                        <span className="inline md:hidden">
                            <HeaderLink
                                href="https://piramid.com.ua/formazakazajaluzy.html"
                                linkTarget="_blank"
                                text="Увійти в кабінет"
                                iconSrc="/assets/images/header/log-in-svg.svg"
                                iconSize={25}
                            />
                        </span>

                        <Link
                            href={"https://piramid.com.ua/formazakazajaluzy.html"}
                            className="hidden md:inline bg-m-blue-green-gradient py-[7px] px-[18px] rounded-3xl text-white"
                        >
                            Увійти в кабінет
                        </Link>
                    </div>
                </nav>
            </header>
        </>
    )
}

function HeaderLink({ href, linkTarget = '_parent', text, iconSrc }: { href: string, linkTarget?: '_blank' | '_parent', text: string, iconSrc: string, iconSize?: number }) {

    return (
        <Link
            href={href}
            target={linkTarget}
            className="group flex items-center gap-1 hover:bg-t-blue duration-150 p-1  rounded-xl"
        >

            <Image
                src={iconSrc}
                alt="Catalog logo"
                width={25}
                height={25}
                className="bg-transparent group-hover:bg-white p-1 rounded-lg duration-150"
            />


            <motion.span
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
                className="hidden md:inline whitespace-nowrap text-t-blue group-hover:text-white relative top-[1px] duration-150"
            >
                {text}
            </motion.span>
        </Link>
    );
}

