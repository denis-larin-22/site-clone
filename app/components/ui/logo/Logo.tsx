import Link from "next/link";

function Logo() {
    return (
        <Link href={"/"}>
            <img
                alt="Piramid logo"
                src={"/assets/images/full_logo.png"}
                className="w-[124px] mobile:w-[167px] h-[22px] mobile:h-[30px]"
            />
        </Link>
    )
};

export default Logo;