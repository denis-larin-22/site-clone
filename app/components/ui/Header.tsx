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

                        <HeaderLink
                            href="https://piramid.com.ua/formazakazajaluzy.html"
                            linkTarget="_blank"
                            text="Увійти в кабінет"
                            iconSrc="/assets/images/header/log-in-svg.svg"
                            iconSize={25}
                        />

                        {/* <Link href={"/order-demo"} className="hidden md:inline bg-m-blue-green-gradient py-[7px] px-[18px] rounded-3xl text-white">Замовити демо</Link> */}
                    </div>
                </nav>
            </header>
        </>
    )
}

function LoginLink() {
    return (
        <a href="https://piramid.com.ua/formazakazajaluzy.html" target="_parent" className="flex items-center group">
            <span className="mr-1 group-hover:animate-drip-expand">
                <svg fill="#fff" height="15px" width="15px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 53.25 53.25" xmlSpace="preserve" stroke="#fff"><g id="SVGRepo_iconCarrier"><path d="M43.375,0h-33.5C9.774,0,9.676,0.011,9.58,0.03c-0.001,0-0.003,0-0.004,0c-0.108,0.022-0.21,0.057-0.307,0.1 C9.244,0.141,9.222,0.156,9.198,0.169c-0.071,0.036-0.14,0.076-0.204,0.123C8.982,0.3,8.969,0.304,8.959,0.313 C8.939,0.327,8.925,0.347,8.906,0.363c-0.053,0.045-0.103,0.093-0.15,0.146C8.73,0.539,8.706,0.568,8.682,0.6 C8.64,0.655,8.603,0.714,8.569,0.776C8.551,0.808,8.532,0.839,8.517,0.872C8.485,0.942,8.46,1.015,8.439,1.09 c-0.008,0.028-0.02,0.055-0.026,0.084C8.389,1.28,8.375,1.388,8.375,1.5v43.378c0,0.156,0.031,0.303,0.075,0.444 c0.008,0.025,0.014,0.05,0.023,0.074c0.05,0.134,0.117,0.258,0.201,0.371c0.015,0.02,0.031,0.038,0.047,0.057 c0.093,0.113,0.198,0.217,0.32,0.299c0.001,0.001,0.002,0.001,0.004,0.002c0.125,0.083,0.265,0.142,0.412,0.185 c0.014,0.004,0.024,0.014,0.038,0.017l26.199,6.872c0.126,0.033,0.253,0.049,0.38,0.049c0.328,0,0.651-0.108,0.917-0.313 c0.368-0.284,0.583-0.723,0.583-1.188V8.372c0-0.682-0.46-1.278-1.12-1.451L21.505,3h20.37v41.878c0,0.829,0.671,1.5,1.5,1.5 c0.829,0,1.5-0.671,1.5-1.5V1.5C44.875,0.671,44.204,0,43.375,0z M23.933,28.838c0.228-0.797,1.06-1.256,1.855-1.03l7,2 c0.796,0.228,1.258,1.058,1.03,1.854c-0.188,0.659-0.789,1.088-1.441,1.088c-0.137,0-0.275-0.019-0.413-0.058l-7-2 C24.167,30.465,23.705,29.634,23.933,28.838z"></path></g></svg>
            </span>
            Кабінет дилера
        </a>
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

