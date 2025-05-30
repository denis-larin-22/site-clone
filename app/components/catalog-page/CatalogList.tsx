'use client'

import { useState, useEffect, useMemo, RefObject } from "react";
import { IProductItem } from "@/app/lib/types";
import CatalogCard from "./CatalogCard";
import { motion, AnimatePresence } from "framer-motion";
import { Pagination } from "@nextui-org/react";

interface IProps {
    listToRender: IProductItem[],
    className?: string,
    catalogContainerRef: RefObject<HTMLDivElement>
}

const ITEMS_PER_PAGE = 20;

export default function CatalogList({ listToRender, className, catalogContainerRef }: IProps) {
    const startPageNumber = 1;
    const [currentPage, setCurrentPage] = useState(startPageNumber);

    // Сортируем listToRender по name перед отрисовкой
    const sortedList = useMemo(() => {
        const sortedList = sortByName(listToRender);
        return sortedList;
    }, [listToRender]);

    // Сбрасываем страницу при изменении списка товаров
    useEffect(() => {
        setCurrentPage(1);
    }, [sortedList]);

    // Вычисляем общее количество страниц
    const totalPages = Math.ceil(sortedList.length / ITEMS_PER_PAGE);

    // Получаем товары для текущей страницы
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentItems = sortedList.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    // Обработчик смены страницы
    const handlePageChange = (page: number) => {
        setCurrentPage(page);

        // Прокручиваем к началу списка товаров
        if (catalogContainerRef.current) {
            catalogContainerRef.current.scrollIntoView({
                behavior: "instant",
                block: "start",
            });
        }
    };

    return (
        <>
            <div className="relative z-20 mt-[-400px] mb-5 mobile:mb-0 pt-5 min-h-[50dvh]">
                <div className="mobile:hidden flex justify-center absolute -top-7 left-1/2 -translate-x-1/2">
                    <CatalogPagination
                        totalPages={totalPages}
                        currentPage={currentPage}
                        changeHandler={handlePageChange}
                    />
                </div>

                {listToRender.length === 0 ?
                    <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-t-gray-text">Товарів не знайдено</p>
                    :
                    <motion.ul
                        className={`w-full px-0 tablet:px-10 grid grid-cols-2 justify-items-center mobile:flex flex-wrap justify-start mobile:justify-center gap-x-2 mobile:gap-x-5 gap-y-4 mobile:gap-y-10 ${className || ''}`}
                    >
                        <AnimatePresence>
                            {currentItems.map((product, index) => (
                                <motion.li
                                    key={product.id + product.name + index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <CatalogCard productItem={product} />
                                </motion.li>
                            ))}
                        </AnimatePresence>
                    </motion.ul>
                }
            </div>

            {/* Pagination at the bottom, fixed */}
            <div className="relative mobile:fixed z-50 bottom-2 flex justify-center">
                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="py-1 px-3 bg-t-pale/30 rounded-3xl drop-shadow-2xl"
                >
                    <CatalogPagination
                        totalPages={totalPages}
                        currentPage={currentPage}
                        changeHandler={handlePageChange}
                    />
                </motion.div>
            </div>
        </>
    );
}

// Pagination

function CatalogPagination({ totalPages, currentPage, changeHandler }: { totalPages: number, currentPage: number, changeHandler: (page: number) => void }) {
    if (totalPages > 1) {
        return (
            <Pagination
                color="primary"
                page={currentPage}
                total={totalPages}
                size="sm"
                radius="full"
                onChange={(page) => changeHandler(page)}
            />
        )
    } else return null;
}

function sortByName(productList: IProductItem[]) {
    if (productList.length === 0) return productList;

    const sortedList = [...productList].sort((a, b) => a.name.localeCompare(b.name));
    return sortedList;
}