'use client'

import { useEffect, useRef, useState } from "react"
import { DropdownFilterMultiple } from "../ui/catalog-filters/DropdownFilterMultiple"
import { DropdownFilterSingle } from "../ui/catalog-filters/DropdownFilterSingle"
import { PriceOrder } from "../ui/catalog-filters/FilterByLevelPrice"
import { IFilterOption } from "@/app/lib/types"
import { IActiveFilters } from "./Catalog"

interface IProps {
    filterOptions: IFilterOption[],
    activeFilters: IActiveFilters,
    filtersHandler: (filter: string, value: string, multichoice?: boolean) => void,
    sortByPriceHandler: (order: PriceOrder) => void
}

export function Filters({ filterOptions, activeFilters, filtersHandler, sortByPriceHandler }: IProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [openFilterIndex, setOpenFilterIndex] = useState<number | null>(null);

    const handleToggle = (index: number) => {
        setOpenFilterIndex(prevIndex => (prevIndex === index ? null : index));
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
            setOpenFilterIndex(null);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <div ref={containerRef} className="flex items-start justify-normal xl:justify-center gap-[10px] w-full min-h-[500px] pl-0 mobile:pl-[60px] xl:pl-0 overflow-x-auto hide-scrollbar">
            {filterOptions.map((filter, index) => {
                const isOpen = openFilterIndex === index;

                if (filter.multichoice) {
                    return (
                        <DropdownFilterMultiple
                            key={index}
                            filterOption={filter}
                            activeFilters={activeFilters}
                            isOpen={isOpen}
                            onToggle={() => handleToggle(index)}
                            wrapperStyles={(openFilterIndex !== null && openFilterIndex !== index) ? 'grayscale mobile:grayscale-0 opacity-40 mobile:opacity-100 duration-150' : ''}
                            filtersHandler={filtersHandler}
                        />
                    )
                } else {
                    return (
                        <DropdownFilterSingle
                            key={index}
                            filterOption={filter}
                            activeFilters={activeFilters}
                            isOpen={isOpen}
                            onToggle={() => handleToggle(index)}
                            wrapperStyles={(openFilterIndex !== null && openFilterIndex !== index) ? 'grayscale mobile:grayscale-0 opacity-40 mobile:opacity-100 duration-150' : ''}
                            filtersHandler={filtersHandler}
                        />
                    )
                }
            })}

            {/* TO DO - price filter */}
            {/* <FilterByLevelPrice sortByPriceHandler={sortByPriceHandler} /> */}
        </div>
    )
}