import Image from "next/image";
import Link from "next/link";

interface IProps {
    className?: string
}

function LogoChristmas({ className = "" }: IProps) {
    return (
        <Link href={"/"} className={"flex items-center " + className}>
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
        </Link>
    )
}

export default LogoChristmas;