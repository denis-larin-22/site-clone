'use client'

import { Button } from "@nextui-org/react";
import { useState } from 'react';
import { motion } from "framer-motion";
import { openSansFont } from "../fonts";
import { ArrowIcon } from "../../assets/icons";
import { getFilterAnimation } from "@/app/lib/utils/animations";
import { IFilterOption } from "@/app/lib/types";

export interface IProps {
    filterOption: IFilterOption,
    isOpen: boolean,
    onToggle: () => void,
    wrapperStyles?: string,
    filtersHandler: (filter: string, value: string, multichoice?: boolean) => void
}

// Dropdown list of options with single choice
export function DropdownFilterSingle({
    filterOption,
    isOpen,
    onToggle,
    wrapperStyles,
    filtersHandler
}: IProps) {
    const [optionTitle, setOptionTitle] = useState<string>(filterOption.title || filterOption.options[0]);
    const [selectedOption, setSelectedOption] = useState<string>(optionTitle);

    // Animation parameters
    const { containerAnimation } = getFilterAnimation();

    return (
        <div className={`relative text-t-blue-dark mt-1 ${wrapperStyles ? wrapperStyles : ''}`}>
            <Button
                className="py-3 px-4 rounded-3xl bg-white text-sm text-t-blue-dark font-medium flex items-center justify-between gap-4"
                onClick={() => {
                    onToggle();
                }}
            >
                {optionTitle}
                <ArrowIcon isOpen={isOpen} />
            </Button>
            {
                isOpen &&
                <>
                    <motion.ul
                        className={`${openSansFont.className} fixed left-0 mobile:absolute z-50 mt-[5px] py-[30px] mobile:py-2.5 px-5 mobile:px-2.5 w-screen mobile:w-fit bg-t-pale mobile:bg-white rounded-bl-[35px] rounded-br-[35px] mobile:rounded-2xl flex flex-col gap-y-[2px]`}
                        variants={containerAnimation}
                        initial="hidden"
                        animate="visible"
                    >
                        {filterOption.options.map((value, index) => (
                            <li
                                key={index}
                                className={`${selectedOption === value ? 'bg-white mobile:bg-t-pale' : 'bg-none'} h-[38px] mobile:h-7 px-[18px] mobile:px-3 mobile:py-1 cursor-pointer rounded-3xl text-sm hover:bg-t-pale duration-150 flex items-center gap-x-3 mobile:gap-x-1.5`}
                                onClick={() => {
                                    if (!filterOption.title) {
                                        setOptionTitle(value);
                                    }
                                    setSelectedOption(value);
                                    filtersHandler(filterOption.filter, value, false);
                                    onToggle();
                                }}
                            >
                                {/* {icon !== undefined ? <span className="inline-block h-fit">{icon}</span> : null} */}
                                <p className="flex items-center gap-1 text-sm font-normal whitespace-nowrap">{value}</p>
                            </li>
                        ))}
                    </motion.ul>
                    {/* Blured space (mobile) */}
                    <div onClick={onToggle} className="block mobile:hidden fixed inset-0 top-32 z-40 bg-[#7E7E7E]/60 backdrop-blur-sm"></div>
                </>
            }
        </div>
    )
}