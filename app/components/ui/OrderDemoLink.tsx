import Link from "next/link";

interface IProps {
    className?: string
}

export function OrderDemoLink({ className = '' }: IProps) {
    return (
        <Link
            href={"/order-demo"}
            className={`group relative inline-block py-[13px] mobile-xs:py-4 px-[42px] text-base sm:text-xl text-white ${className}`}
        >
            <span className="inline-block absolute top-0 right-0 bottom-0 left-0 bg-m-blue-green-gradient rounded-full group-hover:scale-105 duration-500"></span>
            <span className="relative z-10">Замовити демо</span>
        </Link>
    )
}