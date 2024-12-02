import Link from "next/link";
import Logo from "./logo/Logo";

export default function Header() {
    return (
        <>
            <div id="header" className="relative z-40 bg-m-blue-dark mb-[18px] text-xs mobile:text-sm">
                <nav className="max-w-[1272px] mx-auto px-4 py-[7px] text-white flex items-center">
                    {/* Optional */}
                    {/* <button className="flex items-center gap-x-2.5 py-1 px-[11px] bg-white rounded-3xl mr-2.5 text-m-blue-dark font-semibold">
                        Дізнатись
                        <FullArrowIcon />
                    </button> */}
                    <div className="w-full flex items-center justify-end">
                        {/* Optional */}
                        {/* <p className={`${openSansFont.className} hidden mobile-xs:inline`}>Нова колекція тканин <span className="hidden mobile:inline">на літо</span></p> */}
                        <a href="https://piramid.com.ua/component/users/login" target="blank" className="">Увійти</a>
                    </div>
                </nav>
            </div>

            <header className="container sticky z-50 top-2">
                <nav className="relative py-[13px] mobile:py-4 px-5 mobile:px-6 backdrop-blur-lg bg-white/40 rounded-[34px] flex items-center justify-between">
                    <Logo />

                    <div className="flex items-center gap-x-3.5 font-semibold">
                        <Link href={"/catalog"} className="group flex items-center gap-2  hover:bg-t-blue duration-150 rounded-3xl pr-3 hover:text-white text-sm lg:text-base">
                            <span
                                className="-rotate-[33deg] opacity-0 group-hover:opacity-100 group-hover:rotate-[58deg] duration-250 inline-flex items-center justify-center h-10 w-10 rounded-full cursor-pointer pointer-events-none"
                            >
                                <svg width="16" height="21" viewBox="0 0 16 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1.4565 19.7035L13.2742 1.14709M13.2742 1.14709L4.45319 3.82839M13.2742 1.14709L14.9966 10.543" stroke="#F6F5F8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </span>
                            Каталог
                        </Link>
                        <Link href={"/become-dealer"} className="hidden md:inline text-m-blue-dark">Стати дилером</Link>
                        <Link href={"/order-demo"} className="hidden md:inline bg-m-blue-green-gradient py-[7px] px-[18px] rounded-3xl text-white">Замовити демо</Link>
                    </div>
                </nav>
            </header>
        </>
    )
}