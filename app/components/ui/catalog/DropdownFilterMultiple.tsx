'use client'

import { Button } from "@nextui-org/react";
import { useState } from 'react';
import { motion } from "framer-motion";
import { openSansFont } from "../fonts";
import { ArrowIcon } from "../../assets/icons";
import { getFilterAnimation } from "@/app/lib/utils/animations";
import { IFilterOption } from "@/app/lib/types";
import { filterValuesIcons } from "@/app/lib/data/filter-values-icons";
import { IActiveFilters } from "../../catalog-page/Catalog";
import { sortArray } from "@/app/lib/utils/utils";

export interface IProps {
    filterOption: IFilterOption,
    activeFilters: IActiveFilters,
    isOpen: boolean,
    onToggle: () => void,
    wrapperStyles?: string,
    filtersHandler: (filter: string, value: string, multichoice?: boolean) => void
}

export function DropdownFilterMultiple({
    filterOption,
    activeFilters,
    isOpen,
    onToggle,
    wrapperStyles,
    filtersHandler
}: IProps) {
    const isOptionsArrayEmpty = !Boolean(filterOption.options.length);

    const [selectedOptions, setSelectedOptions] = useState<string[]>(activeFilters[filterOption.filter]);

    const toggleOption = (option: string) => {
        const updatedOptions = [...selectedOptions];
        const index = updatedOptions.indexOf(option);
        if (index > -1) {
            updatedOptions.splice(index, 1);
        } else {
            updatedOptions.push(option);
        }
        setSelectedOptions(updatedOptions);
    };

    // Animation parameters
    const { containerAnimation } = getFilterAnimation();

    return (
        <div className={`text-t-blue-dark relative mt-1 ${isOptionsArrayEmpty ? 'hidden' : 'block'} ${wrapperStyles ? wrapperStyles : ''}`}>
            <Button
                className={`py-3 px-4 rounded-3xl text-t-blue-dark bg-white text-sm font-medium flex items-center justify-between gap-4 shadow-none lg:shadow-sm 
                    ${filterOption.filter === "sale" ? "border-2 border-transparent border-t-blue-dark animate-blink-border" : ""}`}
                onClick={onToggle}
            >

                <p className="relative">
                    {filterOption.title}
                    {selectedOptions.length !== 0 ?
                        <span className="absolute -top-[6px] -right-4 w-[17px] h-[17px] text-[13px] font-medium  text-white inline-flex items-center justify-center rounded-full bg-t-blue">{selectedOptions.length}</span>
                        :
                        null
                    }
                </p>
                <ArrowIcon isOpen={isOpen} />
            </Button>
            {isOpen && (
                <>
                    <motion.ul
                        className={`${openSansFont.className} fixed left-0 mobile:absolute z-[100] w-screen mobile:w-fit max-h-[450px] overflow-y-auto bg-t-pale mobile:bg-white p-5 mobile:p-2.5 rounded-bl-[35px] rounded-br-[35px] mobile:rounded-2xl mt-1 flex flex-row flex-wrap mobile:flex-nowrap mobile:flex-col gap-1.5 mobile:gap-y-[2px] shadow-md`}
                        variants={containerAnimation}
                        initial="hidden"
                        animate="visible"
                    >
                        {sortArray(filterOption.options)
                            .map((value, index) => (
                                <motion.li
                                    key={index}
                                    className={`${selectedOptions.includes(value) ? 'bg-t-blue text-white mobile:text-inherit mobile:bg-t-blue/20' : 'bg-white mobile:bg-none'} h-7 relative py-[9px] mobile:py-1 px-[18px] mobile:px-3 cursor-pointer p-1 rounded-3xl mobile:hover:bg-t-blue/30 active:scale-[0.97] duration-150 flex items-center`}
                                    initial={{ x: -5, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ duration: 0.2, delay: index * 0.05 }}
                                    onClick={() => {
                                        toggleOption(value);

                                        filtersHandler(filterOption.filter, value, true);
                                    }}
                                >
                                    <FilterItem
                                        itemValue={value}
                                        filterOption={filterOption}
                                    />
                                </motion.li>
                            ))}
                    </motion.ul>
                    {/* Blured space (mobile) */}
                    <div onClick={onToggle} className="block mobile:hidden fixed inset-0 top-32 z-40 bg-[#7E7E7E]/60 backdrop-blur-sm"></div>
                </>
            )}
        </div>
    );
}

function FilterItem({ itemValue, filterOption }: { itemValue: string, filterOption: IFilterOption }) {
    return (
        <>
            {/* {icon === undefined ? null : <span className="inline-block h-5 absolute left-1 bottom-[5px]">{icon}</span>} */}
            <OptionIcon filter={filterOption.filter} value={itemValue} />
            <p className={`text-nowrap flex items-center gap-x-[5px] text-sm font-normal whitespace-nowrap`}>
                {filterOption.filter === "price" ?
                    "категорія " + parseFloat(itemValue)
                    :
                    filterOption.filter === "sale" ?
                        itemValue + "%"
                        :
                        filterOption.filter === "rollWidth" || filterOption.filter === "tapeWidth" ?
                            itemValue + " мм"
                            :
                            itemValue
                }
            </p>
        </>
    )
}

function OptionIcon({ filter, value }: { filter: string, value: string }) {
    const FILTER_COLOR = "color";

    if (filter === FILTER_COLOR) {
        const colorIcon = filterValuesIcons[filter][value];

        return (
            <>
                {colorIcon === undefined ?
                    null
                    :
                    <span
                        className="inline-block h-[21px] w-[21px] relative -left-2 rounded-full"
                        style={{
                            backgroundColor: colorIcon,
                            border: colorIcon === "#FFFFFF" ? "1px solid #3372F9" : ""
                        }}
                    ></span>
                }
            </>
        )
    } else {
        return null;
    }
}