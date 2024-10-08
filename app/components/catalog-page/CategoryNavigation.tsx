'use client'

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ICategory } from "@/app/lib/types";
import Loader from "../ui/Loader";

interface IProps {
    categoriesList: ICategory[],
    categoriesHandler: (categoryId: number) => void
}

type CategoriesListWithIcons = Array<ICategory & { iconSrc: string }>;

export default function CategoryNavigation({ categoriesList, categoriesHandler }: IProps) {
    const [isCollapsed, setIsCollapsed] = useState<boolean>(true);
    const [activeCategory, setActiveCategory] = useState<number | null>(null);

    // Get icons for each category
    const categoriesListWithIcons: CategoriesListWithIcons = categoriesList.map((category) => ({
        ...category,
        iconSrc: getCategoryIconSrc(category.name)
    }));

    // Check window inner width
    const handleResize = useCallback(() => {
        if (window.innerWidth <= 1366 && window.innerWidth > 450) {
            setIsCollapsed(true);
        }
    }, []);

    useEffect(() => {
        window.addEventListener("resize", handleResize);
        handleResize(); // Initial check

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [handleResize]);

    const handleClick = (categoryId: number) => {
        setActiveCategory(categoryId);
        categoriesHandler(categoryId);
    };

    return (
        <>
            {/* Desktop, tablet versions */}
            <aside
                className={`hidden mobile:block fixed top-0 left-0 z-50 bg-[#FAFAFA] ${isCollapsed ? 'max-w-[121px] pr-6' : 'max-w-[343px] pr-5 shadow-none tablet:shadow-2xl'}  h-screen py-[42px] pl-6 rounded-tr-[42px] rounded-br-[42px] duration-150`}
                onMouseOver={() => setIsCollapsed(false)}
                onMouseOut={() => setIsCollapsed(true)}
            >
                <Link href={"/"}>
                    <span className="inline-block h-9">
                        <Image
                            alt="Piramid logo"
                            src={"/assets/images/logo.svg"}
                            width={57}
                            height={36}
                            className={`${isCollapsed ? 'inline' : 'inline tablet:hidden'}`}
                        />
                        <Image
                            alt="Piramid logo"
                            src={"/assets/images/full_logo.svg"}
                            width={203}
                            height={36}
                            className={`${isCollapsed ? 'hidden' : 'hidden tablet:inline ml-[18px] self-start'}`}
                        />
                    </span>
                </Link>
                <nav className="mt-52 flex flex-col items-start">
                    {categoriesList.length ?
                        categoriesListWithIcons.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => handleClick(category.id)}
                                className={`group relative h-[60px] w-full p-[15px] rounded-xl text-lg font-bold ${activeCategory === category.id ? 'text-t-blue bg-white' : 'text-t-gray-text hover:text-t-blue'} flex items-center gap-x-[14px] hover:bg-white duration-150`}
                            >
                                <span className={activeCategory === category.id ? 'absolute top-1/2 -left-10 -translate-y-1/2 inline-block w-[22px] h-[39px] rounded-xl bg-t-blue' : 'hidden'}></span>

                                {/* Icon TO_DO */}
                                <span className={`inline-block max-w-7 max-h-7 ${activeCategory === category.id ? 'opacity-100 grayscale-0' : 'opacity-35 grayscale group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-110'} duration-200`}>
                                    <img
                                        src={category.iconSrc}
                                        alt="Category icon"
                                        className="w-full h-full object-cover"
                                    />
                                </span>
                                <AnimatePresence>
                                    {!isCollapsed &&
                                        <motion.span
                                            initial={{ opacity: 0, x: '-25px' }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: '-10px' }}
                                            transition={{ duration: 0.15 }}
                                            className="hidden tablet:inline whitespace-nowrap"
                                        >
                                            {category.name}
                                        </motion.span>}
                                </AnimatePresence>
                            </button>
                        ))
                        :
                        <Loader />
                    }
                </nav>
            </aside >

            {/* Mobile version */}
            < aside className="block mobile:hidden h-24 absolute z-30 bottom-0 right-0 left-0 bg-[#FAFAFA] overflow-hidden" >
                <nav className="h-full flex items-center justify-around ">
                    {
                        categoriesList.length ?
                            categoriesListWithIcons.map((category) => (
                                <button
                                    key={category.id}
                                    onClick={() => handleClick(category.id)}
                                    className={`group relative w-[55px] h-[52px] rounded-xl flex flex-col items-center ${activeCategory === category.id ? 'bg-white' : ''} flex items-center justify-center`}
                                >
                                    <span className={activeCategory === category.id ? 'absolute -top-9 inline-block w-[29px] h-[10px] rounded-xl bg-t-blue' : 'hidden'}></span>
                                    {/* Icon TO_DO */}
                                    <span className={`inline-block max-w-7 max-h-7 ${activeCategory === category.id ? 'opacity-100 grayscale-0' : 'opacity-35 grayscale'} duration-200`}>
                                        <img
                                            src={category.iconSrc}
                                            alt="Category icon"
                                            className="w-full h-full object-cover"
                                        />
                                    </span>
                                </button>
                            ))
                            :
                            <Loader />
                    }
                </nav>
            </aside >
        </>
    )
}


function getCategoryIconSrc(category: string): string {
    let iconSrc = "";
    switch (category) {
        case "Day Night":
        case "День-Ніч":
            iconSrc = "/assets/images/categories-icons/day-night.svg";
            break;
        case "Rollo":
        case "Рулонні":
            iconSrc = "/assets/images/categories-icons/roller-blinds.svg";
            break;
        case "Horizontal":
        case "Горизонтальні":
            iconSrc = "/assets/images/categories-icons/horizontal-blinds.svg";
            break;
        case "Vertical":
        case "Вертикальні":
            iconSrc = "/assets/images/categories-icons/vertical-blinds.svg";
            break;
        default:
            iconSrc = "/assets/images/categories-icons/default.svg";
            break;
    }

    return iconSrc;
};