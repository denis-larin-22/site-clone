'use client'

import { useState } from "react";
import { openSansFont } from "../fonts";
import { AnimatePresence, motion } from "framer-motion";
import FirstFormBecomeDealer from "./FirstFormBecomeDealer";
import SecondFormBecomeDealer from "./SecondFormBecomeDealer";
import { CircleDecoreIcon } from "../../assets/icons";

export interface IFormState {
    userName: string;
    userSurname: string;
    companyName: string;
    position: string;
    userEmail: string;
    userTelNumber: string;
    cityActivity: string;
    EDRPOUcode: string;
    salePointsCount: string;
    webSite: string;
    userMessage: string;
};

export default function FormBecomeDealer() {
    const initFormState: IFormState = {
        userName: "",
        userSurname: "",
        companyName: "",
        position: "",
        userEmail: "",
        userTelNumber: "",
        cityActivity: "",
        EDRPOUcode: "",
        salePointsCount: "",
        webSite: "",
        userMessage: ""
    };

    const [isHovered, setIsHovered] = useState(false);
    const [formState, setFormState] = useState(initFormState);
    // Forms toggler
    const [toggleForm, setToggleForm] = useState(false);

    // Forms states styles
    const labelStyles = "font-bold text-m-blue-dark ml-3 mb-1.5 cursor-pointer";
    const inputStyles = `${openSansFont.className} min-w-[227px] w-full text-sm md:text-base text-[#09022B] bg-t-pale px-[13px] py-[9px] rounded-[31px] focus:outline-none focus:ring-1 ring-offset-1 ring-t-blue duration-200 focus:text-m-blue-dark`;
    const errorStyles = "ring-1 ring-t-red";
    const errorLabelStyles = `${openSansFont.className} text-sm md:text-base text-[#A2A2A8] flex items-center gap-1.5 absolute -bottom-6`;

    return (
        <section className="w-full max-h-[654px]">
            <AnimatePresence>
                {!toggleForm ?
                    <motion.div
                        key="firstForm"
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1, transition: { duration: 0.5, delay: 0.5 } }}
                        exit={{ x: -30, opacity: 0, transition: { duration: 0.5 } }}
                    >
                        <FirstFormBecomeDealer
                            inputStyles={inputStyles}
                            labelStyles={labelStyles}
                            errorLabelStyles={errorLabelStyles}
                            errorStyles={errorStyles}
                            formState={formState}
                            setFormState={setFormState}
                            initFormState={initFormState}
                            isHovered={isHovered}
                            setIsHovered={setIsHovered}
                            setToggleForm={setToggleForm}
                        />
                    </motion.div>
                    :
                    <motion.div
                        key="secondForm"
                        initial={{ x: 30, opacity: 0 }}
                        animate={{ x: 0, opacity: 1, transition: { duration: 0.5, delay: 0.5 } }}
                        exit={{ scale: 0.95, opacity: 0 }}
                    >
                        <SecondFormBecomeDealer
                            inputStyles={inputStyles}
                            labelStyles={labelStyles}
                            errorLabelStyles={errorLabelStyles}
                            errorStyles={errorStyles}
                            formState={formState}
                            setFormState={setFormState}
                            initFormState={initFormState}
                            isHovered={isHovered}
                            setIsHovered={setIsHovered}
                            setToggleForm={setToggleForm}
                        />
                    </motion.div>
                }
            </AnimatePresence>
        </section>
    )
}

// Decoration circles on button hover action
export function FormDecorations({ visibleState }: { visibleState: boolean }) {
    return (
        <>
            {/* Decoration elements (button is not hovered)*/}
            {
                [1, 2].map((item) => (
                    <CircleDecoreIcon
                        key={item}
                        fillColor="#3372F9"
                        width={item === 1 ? 302 : 159}
                        height={item === 1 ? 302 : 159}
                        className={item === 1 ?
                            `absolute scale-90 xl:scale-100 ${!visibleState ? '-top-[15%] xl:-top-[10%] -right-[30%] xl:-right-[10%] opacity-100 rotate-[80deg]' : 'top-1/4 right-1/4 opacity-0 rotate-0'} duration-700 z-0`
                            :
                            `absolute scale-90 xl:scale-100 ${!visibleState ? '-bottom-[10%] xl:bottom-[8%] -left-[15%] xl:-left-[10%] opacity-100 rotate-[195deg]' : 'bottom-1/4 left-1/4 opacity-0 rotate-0'} duration-700 z-0`
                        }
                    />
                ))
            }
            {/* Decoration elements (button is hovered)*/}
            {
                [1, 2, 3, 4].map((item) => {
                    switch (item) {
                        case 1: return (
                            <CircleDecoreIcon key={item} fillColor="#07FAB9" width={116} height={116} className={`hidden xl:inline-block absolute z-0 left-[35%] ${visibleState ? '-top-[20%] -rotate-180 opacity-100' : 'top-1/4 rotate-0 opacity-0'} duration-500 ease-in-out`}
                            />
                        )
                        case 2: return (
                            <CircleDecoreIcon key={item} fillColor="#07FAB9" width={243} height={243} className={`hidden xl:inline-block absolute z-0  ${visibleState ? '-top-[15%] -right-[19%] -rotate-180 opacity-100' : 'top-1/4 right-0 rotate-90 opacity-0'} duration-700 ease-in-out`}
                            />
                        )
                        case 3: return (
                            <CircleDecoreIcon key={item} fillColor="#07FAB9" width={116} height={116} className={`hidden xl:inline-block absolute z-0 bottom-[7%] ${visibleState ? '-right-[7%] rotate-[200deg] opacity-100' : 'right-0 rotate-0 opacity-0'} duration-700 ease-in-out`}
                            />
                        )
                        case 4: return (
                            <CircleDecoreIcon key={item} fillColor="#07FAB9" width={237} height={237} className={`hidden xl:inline-block absolute z-0 bottom-[3%] ${visibleState ? '-left-[10%] -rotate-[80deg] opacity-100' : 'left-0 rotate-0 opacity-0'} duration-700 ease-in-out`}
                            />
                        )
                    }
                })
            }
        </>
    )
}
