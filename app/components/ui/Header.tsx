import Link from "next/link";
import { FullArrowIcon } from "../assets/icons";
import { openSansFont } from "./fonts";
import Logo from "./logo/Logo";
import LogoHalloween from "./LogoHalloween";

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
                    {/* <Logo /> */}
                    <LogoHalloween />

                    <div className="hidden md:flex items-center gap-x-3.5 font-semibold">
                        <a href="/become-dealer" className="text-m-blue-dark">Стати дилером</a>
                        <Link href={"/order-demo"} className="bg-m-blue-green-gradient py-[7px] px-[18px] rounded-3xl text-white">Замовити демо</Link>
                    </div>
                </nav>
            </header>
        </>
    )
}