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
                        <LoginLink />
                    </div>
                </nav>
            </div>

            <header className="container sticky z-50 top-2">
                <nav className="relative py-[13px] mobile:py-4 px-5 mobile:px-6 backdrop-blur-lg bg-white/40 rounded-[34px] flex items-center justify-between">
                    <Logo />

                    <div className="flex items-center gap-x-3.5 font-semibold">
                        <Link href={"/catalog"} className="group flex items-center gap-2  hover:bg-t-blue duration-150 rounded-3xl pr-3 hover:text-white">
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

function LoginLink() {
    return (
        <a href="https://piramid.com.ua/component/users/login" target="blank" className="flex items-center group">
            <span className="mr-1 group-hover:animate-drip-expand">
                <svg fill="#fff" height="15px" width="15px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 53.25 53.25" xmlSpace="preserve" stroke="#fff"><g id="SVGRepo_iconCarrier"><path d="M43.375,0h-33.5C9.774,0,9.676,0.011,9.58,0.03c-0.001,0-0.003,0-0.004,0c-0.108,0.022-0.21,0.057-0.307,0.1 C9.244,0.141,9.222,0.156,9.198,0.169c-0.071,0.036-0.14,0.076-0.204,0.123C8.982,0.3,8.969,0.304,8.959,0.313 C8.939,0.327,8.925,0.347,8.906,0.363c-0.053,0.045-0.103,0.093-0.15,0.146C8.73,0.539,8.706,0.568,8.682,0.6 C8.64,0.655,8.603,0.714,8.569,0.776C8.551,0.808,8.532,0.839,8.517,0.872C8.485,0.942,8.46,1.015,8.439,1.09 c-0.008,0.028-0.02,0.055-0.026,0.084C8.389,1.28,8.375,1.388,8.375,1.5v43.378c0,0.156,0.031,0.303,0.075,0.444 c0.008,0.025,0.014,0.05,0.023,0.074c0.05,0.134,0.117,0.258,0.201,0.371c0.015,0.02,0.031,0.038,0.047,0.057 c0.093,0.113,0.198,0.217,0.32,0.299c0.001,0.001,0.002,0.001,0.004,0.002c0.125,0.083,0.265,0.142,0.412,0.185 c0.014,0.004,0.024,0.014,0.038,0.017l26.199,6.872c0.126,0.033,0.253,0.049,0.38,0.049c0.328,0,0.651-0.108,0.917-0.313 c0.368-0.284,0.583-0.723,0.583-1.188V8.372c0-0.682-0.46-1.278-1.12-1.451L21.505,3h20.37v41.878c0,0.829,0.671,1.5,1.5,1.5 c0.829,0,1.5-0.671,1.5-1.5V1.5C44.875,0.671,44.204,0,43.375,0z M23.933,28.838c0.228-0.797,1.06-1.256,1.855-1.03l7,2 c0.796,0.228,1.258,1.058,1.03,1.854c-0.188,0.659-0.789,1.088-1.441,1.088c-0.137,0-0.275-0.019-0.413-0.058l-7-2 C24.167,30.465,23.705,29.634,23.933,28.838z"></path></g></svg>
            </span>
            Кабінет дилера
        </a>
    )
}