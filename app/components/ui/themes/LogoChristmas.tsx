import Image from "next/image";

function LogoChristmas() {
    return (
        <span className="flex items-center">
            <Image
                src={"/assets/images/themes/christmas-logo.png"}
                alt="Logo"
                width={40}
                height={40}
            />
            <Image
                src="/assets/images/logo-text.png"
                alt="Logo-text"
                width={112}
                height={30}
                className="w-fit mobile:w-[113px] h-[22px] mobile:h-[30px]"
            />
        </span>
    )
}

export default LogoChristmas;