'use client'

import { fetchCategories, fetchProductsList } from "@/app/lib/api/apiRequests";
import Header from "../ui/Header";
import Footer from "../ui/Footer";
import { DetailsWords, getCorrectWordDeclension, isNumberInArray, replaceOWithPaintedO } from "@/app/lib/utils/utils";
import Link from "next/link";
import { motion } from "framer-motion";
import { openSansFont } from "../ui/fonts";
import { useEffect, useMemo, useState } from "react";
import { ICategory, IProductItem } from "@/app/lib/types";
import Loader from "../ui/Loader";
import { DecorSpot } from "../ui/Carousel";
import Image from "next/image";
import { Button } from "@nextui-org/react";

type CategoriesListWithImages = Array<ICategory & { imageSrc: string }>;

function CatalogMenu() {
    const [productList, setProductList] = useState<IProductItem[] | null>(null);
    const [categoriesList, setCategoriesList] = useState<CategoriesListWithImages | null>(null);

    useEffect(() => {
        async function getCategories() {
            const products = await fetchProductsList();
            const categories = await fetchCategories();

            const categoriesWithImages = getCategoriesImages(categories);

            setProductList(products);
            setCategoriesList(categoriesWithImages);
        }

        getCategories();
    }, []);


    const pageTitle = "Дослідіть широкий вибір наших віконних рішень";

    return (
        <main className="min-h-dvh overflow-hidden flex flex-col">
            <Header />
            <section className="grow container">
                <motion.h1
                    initial={{ opacity: 0, x: 150 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="max-w-[942px] mt-5 text-xl mobile-xs:text-2xl mobile:text-[38px] xl:text-5xl leading-none font-bold uppercase "
                >
                    {replaceOWithPaintedO(pageTitle, "black", "white")}
                </motion.h1>

                {categoriesList && productList ?
                    <CategoriesList
                        categoriesList={categoriesList}
                        productList={productList}
                    />
                    :
                    <div className="h-60 mt-10 flex items-center justify-center">
                        <Loader />
                    </div>
                }
            </section>
            <Footer />
        </main>
    )
};

export default CatalogMenu;

function CategoriesList({ categoriesList, productList }: { categoriesList: CategoriesListWithImages, productList: IProductItem[] }) {
    const [isInView, setIsInView] = useState<boolean>(false);
    const [hoveredItemId, setHoveredItemId] = useState<number | null>(null);

    // save details data for each category
    const categoryDetails = useMemo(() => {
        return categoriesList.reduce((acc, category) => {
            acc[category.id] = getCategoryDetails(category.id, productList);
            return acc;
        }, {} as Record<number, ReturnType<typeof getCategoryDetails>>);
    }, [categoriesList, productList]);

    useEffect(() => {
        setTimeout(() => {
            setIsInView(true);
        }, 100);
    }, []);

    const getAnimInView = (isInView: boolean, elementIndex: number) => {
        const transition = "all 1s cubic-bezier(0.17, 0.55, 0.55, 1) 0.1s"
        const styles = [
            {
                rotate: isInView ? 0 : 45,
                translateY: isInView ? 0 : '500px',
                translateX: isInView ? 0 : '-100px',
                transition,
            },
            {
                rotate: isInView ? 0 : -45,
                translateY: isInView ? 0 : '200px',
                translateX: isInView ? 0 : '600px',
                transition
            },
            {
                rotate: isInView ? 0 : 50,
                translateY: isInView ? 0 : '-450px',
                translateX: isInView ? 0 : '200px',
                transition
            },
            {
                rotate: isInView ? 0 : -15,
                translateY: isInView ? 0 : '50px',
                translateX: isInView ? 0 : '-500px',
                transition
            }
        ];

        if (elementIndex <= 3) {
            return styles[elementIndex];
        } else {
            return styles[Math.floor(Math.random() * 3) + 0] // Random index animation from 0 to 3
        }
    };

    return (
        <>
            {/* DESKTOP */}
            {/* <ul className="relative mb-28 hidden xl:flex gap-x-5 duration-500 ease-in-out mt-[100px] flex-wrap gap-y-24 justify-center"> */}
            <ul className="relative z-20 mb-28 hidden xl:flex gap-x-5 duration-500 ease-in-out mt-[100px] flex-wrap gap-y-24 justify-center">
                {categoriesList.map((category, index) => {
                    const details = categoryDetails[category.id];

                    return (
                        <motion.li
                            key={index}
                            onMouseOver={() => { setHoveredItemId(category.id) }}
                            onMouseLeave={() => { setHoveredItemId(null) }}
                            style={getAnimInView(isInView, index)}
                            className="relative"
                        >
                            <Button
                                as={Link}
                                href={`/catalog/${category.id}/category`}
                                className="group flex-shrink-0 flex-grow-0 rounded-[14px] w-[294px] h-[438px] p-0 border-none"
                            >
                                <Image
                                    alt={`Зображення для категорії ${category.name}`}
                                    src={category.imageSrc}
                                    width={294}
                                    height={438}
                                    className="w-full h-full object-cover scale-105 group-hover:scale-100 duration-500"
                                />
                                <p style={{
                                    opacity: isInView ? "100" : "0",
                                    transition: "opacity 1s 1.5s, bottom 0.3s"
                                }}
                                    className={`${openSansFont.className} absolute z-10 -bottom-9 group-hover:bottom-1/2 duration-250 left-1/2 -translate-x-1/2 mt-2.5 text-center text-xl group-hover:text-[#F6F5F8] text-m-blue-dark whitespace-nowrap pointer-events-none`}
                                >
                                    {category.name}
                                </p>
                                {/* Open link */}
                                <div className="absolute z-10 opacity-0 group-hover:opacity-100 -bottom-[5%] group-hover:-bottom-[3%] -right-[7%] group-hover:-right-[5%] duration-250">
                                    <DecorSpot />
                                    <span
                                        className="absolute bottom-[32%] right-[26%] -rotate-45 group-hover:rotate-0 duration-250 inline-flex items-center justify-center h-12 w-12 rounded-full bg-t-blue cursor-pointer pointer-events-none"
                                    >
                                        <svg width="16" height="21" viewBox="0 0 16 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M1.4565 19.7035L13.2742 1.14709M13.2742 1.14709L4.45319 3.82839M13.2742 1.14709L14.9966 10.543" stroke="#F6F5F8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </span>
                                </div>
                                {/* Blue glass effect */}
                                <div style={{
                                    background: isInView ? "transparent" : "#3372F9",
                                    transition: "all 1s 1.5s"
                                }}
                                    className="rounded-[14px] absolute top-0 bottom-0 left-0 right-0 overflow-hidden after:block after:w-full after:h-full after:top-0 after:left-0 after:bg-t-blue after:bg-opacity-0 group-hover:after:bg-opacity-50 after:duration-250"
                                ></div>
                            </Button>



                            {hoveredItemId === category.id && (
                                <div className={`absolute top-0 ${isNumberInArray(index, [3, 7]) ? '-left-[45%]' : '-right-[45%]'} z-50 flex flex-col gap-2`}>
                                    <CategoryDetailItem value={details.quantity} label="пропозицій" delay={0} />
                                    <CategoryDetailItem value={details.colors} label="кольорів" delay={0.1} />
                                    <CategoryDetailItem value={details.collections} label="колекцій" delay={0.2} />
                                </div>
                            )}
                        </motion.li>
                    );
                })}
            </ul>

            {/* MOBILE */}
            <ul className="grid xl:hidden grid-cols-2 md:grid-cols-3 gap-x-2.5 gap-y-10 mt-8  mb-14">
                {categoriesList.map((category, index) => {
                    const details = categoryDetails[category.id];

                    return (
                        <motion.li
                            key={index}
                            className="relative z-0 flex flex-col items-center gap-y-[27px]"
                            style={getAnimInView(isInView, index)}
                        >
                            <Link
                                href={`/catalog/${category.id}/category`}
                                className="inline-block w-[135px] mobile-xs:w-[172px] md:w-[231px] lg:w-[231px] h-[233px] mobile-xs:h-[272px] md:h-[369px] lg:h-[369px]"
                            >
                                <div className="relative z-0 h-full">
                                    <Image
                                        alt={`Зображення до категорії ${category.name}`}
                                        src={category.imageSrc}
                                        width={135}
                                        height={233}
                                        loading="lazy"
                                        className="object-cover rounded-[11px] w-full h-full"
                                    />
                                    {/* Start blue block */}
                                    <div
                                        style={{
                                            background: isInView ? "transparent" : "#3372F9",
                                            transition: "all 1s 1.2s"
                                        }}
                                        className="rounded-[11px] absolute top-0 bottom-0 left-0 right-0 overflow-hidden"
                                    ></div>
                                </div>

                                <p
                                    className={openSansFont.className + " text-base text-center mt-[5px]"}
                                    style={{
                                        opacity: isInView ? 100 : 0,
                                        transition: "opacity 1s 1.5s, bottom 0.3s"
                                    }}
                                >
                                    {category.name}
                                </p>

                                <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 1.1 }}
                                    className="absolute -top-2 left-[40%] mobile:left-1/2"
                                >
                                    <CategoryDetailItem delay={0.2} label="пропозицій" value={details.quantity} />
                                </motion.span>
                            </Link>
                        </motion.li>
                    )
                })}
            </ul>
        </>
    )
}

function CategoryDetailItem({ value, label, delay }: { value: number, label: string, delay: number }) {
    if (value === 0) return null;

    return (
        <motion.p
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay }}
            className="text-[10px] sm:text-xs pr-1 lg:pr-3 border-2 border-t-blue rounded-full text-white bg-t-blue whitespace-nowrap"
        >
            <span className="w-5 lg:w-8 h-5 lg:h-8 bg-white text-t-blue rounded-full inline-flex items-center justify-center leading-none">{value}</span> {getCorrectWordDeclension(value, label as DetailsWords)}
        </motion.p>
    );
};

function getCategoriesImages(categoriesList: ICategory[]): CategoriesListWithImages {

    return categoriesList.map((category) => {
        let path: string;

        switch (category.id) {
            case 1:
                path = "/assets/images/day-night.webp";
                break;
            case 2:
                path = "/assets/images/roller-blinds.webp";
                break;
            case 3:
                path = "/assets/images/horizontal-blinds.webp";
                break;
            case 4:
                path = "/assets/images/vertical-blinds.webp";
                break;
            case 5:
                path = "/assets/images/components.webp";
                break;
            case 6:
                path = "/assets/images/promotional-items.webp";
                break;
            default:
                path = "/assets/images/default-item.webp";
        }

        return {
            ...category,
            imageSrc: path
        }
    });
}

interface IProductDetails {
    quantity: number,
    colors: number,
    collections: number
}

function getCategoryDetails(categoryId: number, productList: IProductItem[]): IProductDetails {
    const colors = new Set;
    const collections = new Set;

    const listByCategory = productList.filter((product) => {
        if (product.category_id === categoryId) {
            if (product.technical_info.color !== null) colors.add(product.technical_info.color);
            if (product.technical_info.collection !== null) collections.add(product.technical_info.collection);

            return product;
        }
    });

    return {
        quantity: listByCategory.length,
        colors: Array.from(colors).length,
        collections: Array.from(collections).length
    }
}