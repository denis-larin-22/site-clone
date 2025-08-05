import { FacebookIcon, InstagramIcon, TelegramIcon } from "../assets/icons";
import { openSansFont } from "./fonts";

export default function Footer() {
    const linksList = [
        {
            icon: <TelegramIcon />,
            link: 'https://web.telegram.org/a/#6279586655'
        },
        {
            icon: <InstagramIcon />,
            link: 'https://www.instagram.com/piramid.com.ua/'
        },
        {
            icon: <FacebookIcon />,
            link: 'https://www.facebook.com/piramidjalusi/'
        }
    ];

    const callNumbers = [
        "095 937 35 83",
        "050 569 62 29",
        "097 712 13 11",
        "057 728 52 58"
    ];

    return (
        <footer className={openSansFont.className + " container mobile:px-[57px] py-5 border-t-1 border-[#A2A2A8] text-[#A2A2A8]"}>
            <div className="flex items-center justify-between">
                <p>© 2025 ТОВ Пірамідспейс</p>
                <ul className="flex gap-x-3">
                    {
                        linksList.map((item, index) => (
                            <li key={index}>
                                <a href={item.link} target="_blank">
                                    {item.icon}
                                </a>
                            </li>
                        ))
                    }
                </ul>
            </div>

            <p className="mt-5 lg:mt-[30px] mb-3.5">Телефонуйте нам:</p>

            <div className="grid grid-cols-2 gap-2 max-w-[291px]">
                {callNumbers.map((number, index) => (
                    <a href={`tel:${number}`} key={index} className="lg:hover:text-t-blue duration-150">{number}</a>
                ))}
            </div>

            <p className="mt-3.5">Україна, Харківська обл., м.Златопіль</p>
        </footer>
    )
}