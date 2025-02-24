'use client'

import { useEffect, useRef, useState } from "react"
import { DropdownFilterMultiple } from "../ui/catalog/DropdownFilterMultiple"
import { DropdownFilterSingle } from "../ui/catalog/DropdownFilterSingle"
import { PriceOrder } from "../ui/catalog/FilterByLevelPrice"
import { IFilterOption } from "@/app/lib/types"
import { IActiveFilters } from "./Catalog"
import Image from "next/image"
import { Button, Tooltip } from "@nextui-org/react"

interface IProps {
    filterOptions: IFilterOption[],
    activeFilters: IActiveFilters,
    filtersHandler: (filter: string, value: string, multichoice?: boolean) => void,
    sortByPriceHandler: (order: PriceOrder) => void,
    resetFiltersButtonHandler: () => void
}

export function Filters({
    filterOptions,
    activeFilters,
    filtersHandler,
    sortByPriceHandler,
    resetFiltersButtonHandler
}: IProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    // Filter open state
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

    // Reset button vissible state
    const [isResetButtonVissible, setIsResetButtonVissible] = useState(false);

    function checkActiveFiltersChanges() {
        let isEmpty = true;

        for (const key in activeFilters) {
            if (activeFilters[key].length !== 0) isEmpty = false;
        }

        if (isEmpty) {
            setIsResetButtonVissible(false)
        } else {
            setIsResetButtonVissible(true)
        }
    }

    useEffect(() => {
        checkActiveFiltersChanges();
    }, [activeFilters]);

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
            {isResetButtonVissible &&
                <Tooltip
                    content="Скинути фільтри"
                    size="sm"
                >
                    <Button
                        isIconOnly
                        className="w-10 h-10 rounded-full bg-white flex items-center justify-center mt-1 opacity-80"
                        onClick={resetFiltersButtonHandler}
                    >
                        <Image
                            src={"/assets/images/reset-filters-icon.svg"}
                            alt="Reset filters icon"
                            width={22}
                            height={22}
                        />
                    </Button>
                </Tooltip>
            }
        </div>
    )
}