'use client'

import { useState, useEffect, useRef, useMemo } from "react";
import { IProductItem } from "@/app/lib/types";
import CatalogCard from "./CatalogCard";
import { SS_CATALOG_PAGINATION_PAGE_KEY } from "./Catalog";

interface IProps {
    listToRender: IProductItem[],
    className?: string,
}

const ITEMS_PER_PAGE = 20;

export default function CatalogList({ listToRender, className }: IProps) {
    const lastActivePageFromSS = sessionStorage.getItem(SS_CATALOG_PAGINATION_PAGE_KEY);
    const pageNumber = lastActivePageFromSS === null ? 1 : +lastActivePageFromSS;

    const [currentPage, setCurrentPage] = useState(pageNumber);
    const containerRef = useRef<HTMLDivElement>(null);

    // Сортируем listToRender по name перед отрисовкой
    const sortedList = useMemo(() => {
        return [...listToRender].sort((a, b) => a.name.localeCompare(b.name));
    }, [listToRender]);

    // Сбрасываем страницу при изменении списка товаров
    useEffect(() => {
        setCurrentPage(pageNumber);
    }, [sortedList]);

    // Вычисляем общее количество страниц
    const totalPages = Math.ceil(sortedList.length / ITEMS_PER_PAGE);

    // Получаем товары для текущей страницы
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentItems = sortedList.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    // Обработчик смены страницы
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        sessionStorage.setItem(SS_CATALOG_PAGINATION_PAGE_KEY, JSON.stringify(page));

        // Прокручиваем к началу списка товаров
        if (containerRef.current) {
            containerRef.current.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    };

    return (
        <div ref={containerRef} className="relative z-20 mt-[-400px] pt-5 min-h-[50dvh]">
            <ul className={`w-full px-0 tablet:px-10 grid grid-cols-2 justify-items-center mobile:flex flex-wrap justify-start mobile:justify-center gap-x-2 mobile:gap-x-5 gap-y-4 mobile:gap-y-10 ${className || ''}`}>
                {currentItems.map((product, index) => (
                    <li key={product.id + product.name + index}>
                        <CatalogCard productItem={product} />
                    </li>
                ))}
            </ul>

            {/* Пагинация */}
            <div className="flex justify-center mt-4 mb-24 mobile:mb-0 w-full">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index}
                        onClick={() => handlePageChange(index + 1)}
                        className={`mx-1 px-4 py-2 rounded-md text-sm ${currentPage === index + 1 ? 'bg-t-blue text-white' : 'bg-gray-200 text-black'}`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
}
