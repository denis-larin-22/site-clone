import { FacebookIcon, InstagramIcon, TelegramIcon } from "../assets/icons";
import { openSansFont } from "./fonts";

export default function Footer() {
    const linksList = [
        {
            icon: <TelegramIcon />,
            link: 'https://t.me/pirservice_bot'
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

    return (
        <footer className="container mobile:px-[57px] py-5 border-t-1 border-[#A2A2A8] flex items-center justify-between">
            <p className={`${openSansFont.className} text-[#A2A2A8]`}>© 2024 ТПК Піраміда</p>
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
        </footer>
    )
}