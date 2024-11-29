'use client'

import { useState } from "react";
import { IProductItem } from "@/app/lib/types";
import CatalogCard from "./CatalogCard";

interface IProps {
    listToRender: IProductItem[],
    className?: string
}

const ITEMS_PER_PAGE = 20; // Define how many items you want to show per page

export default function CatalogList({ listToRender, className }: IProps) {
    const [currentPage, setCurrentPage] = useState(1);

    // Calculate total pages
    const totalPages = Math.ceil(listToRender.length / ITEMS_PER_PAGE);

    // Slice the list based on current page
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentItems = listToRender.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    // Handle page change
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <div>
            <ul className={`w-full -mt-[420px] px-0 tablet:px-10 grid grid-cols-2 justify-items-center mobile:flex flex-wrap justify-start mobile:justify-center gap-x-2 mobile:gap-x-5 gap-y-4 mobile:gap-y-10 ${className ? className : ''}`}>
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
