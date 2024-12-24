'use client'

import { useState, useEffect, useRef } from "react";
import { IProductItem } from "@/app/lib/types";
import CatalogCard from "./CatalogCard";
import { SS_CATALOG_PAGINATION_PAGE_KEY } from "./Catalog";

interface IProps {
    listToRender: IProductItem[],
    className?: string,
    paginationPageHandler: (value: number) => void
}

const ITEMS_PER_PAGE = 20;

export default function CatalogList({ listToRender, className, paginationPageHandler }: IProps) {
    const lastActivePageFromSS = sessionStorage.getItem(SS_CATALOG_PAGINATION_PAGE_KEY);
    const pageNumber = lastActivePageFromSS === null ? 1 : +lastActivePageFromSS;

    const [currentPage, setCurrentPage] = useState(pageNumber);
    const containerRef = useRef<HTMLDivElement>(null); // Ссылка на обертку компонента

    // Reset currentPage to 1 when listToRender changes
    useEffect(() => {
        setCurrentPage(pageNumber);
    }, [listToRender]);

    // Calculate total pages
    const totalPages = Math.ceil(listToRender.length / ITEMS_PER_PAGE);

    // Slice the list based on current page
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentItems = listToRender.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    // Handle page change
    const handlePageChange = (page: number) => {
        setCurrentPage(page);

        // Scroll to top of the container
        if (containerRef.current) {
            containerRef.current.scrollIntoView({
                behavior: "smooth", // Плавная прокрутка
                block: "start"
            });
        }
    };

    return (
        // <div ref={containerRef} className="mt-[-400px] pt-5 min-h-[50dvh]"> // Default
        <div ref={containerRef} className="relative z-20 mt-[-400px] pt-5 min-h-[50dvh]">
            <ul className={` w-full px-0 tablet:px-10 grid grid-cols-2 justify-items-center mobile:flex flex-wrap justify-start mobile:justify-center gap-x-2 mobile:gap-x-5 gap-y-4 mobile:gap-y-10 ${className ? className : ''}`}>
                {currentItems.map((product, index) => (
                    <li key={product.id + product.name + index}>
                        <CatalogCard productItem={product} />
                    </li>
                ))}
            </ul>

            <div className="flex justify-center mt-4 mb-24 mobile:mb-0 w-full">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index}
                        onClick={() => {
                            paginationPageHandler(index + 1)
                            handlePageChange(index + 1)
                        }}
                        className={`mx-1 px-4 py-2 rounded-md text-sm ${currentPage === index + 1 ? 'bg-t-blue text-white' : 'bg-gray-200 text-black'}`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
}
