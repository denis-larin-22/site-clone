'use client'

import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { FormDecorations, IFormState } from "./FormBecomeDealer";
import { openSansFont } from "../fonts";
import emailjs from "@emailjs/browser";
import { ReportMessage } from "../ReportMessage";
import { AnimatePresence, motion } from "framer-motion";

interface IFormProps {
    inputStyles: string,
    labelStyles: string,
    errorLabelStyles: string,
    errorStyles: string,
    formState: IFormState,
    initFormState: IFormState;
    setFormState: Dispatch<SetStateAction<IFormState>>,
    isHovered: boolean,
    setIsHovered: Dispatch<SetStateAction<boolean>>;
    setToggleForm: Dispatch<SetStateAction<boolean>>
}

export default function SecondFormBecomeDealer({
    inputStyles,
    labelStyles,
    formState,
    setFormState,
    initFormState,
    isHovered,
    setIsHovered,
    setToggleForm
}: IFormProps) {
    // Sending status message
    const [sendingStatus, setSendingStatus] = useState({
        isVissible: false,
        status: true
    });

    const btnHandler = (e: FormEvent) => {
        e.preventDefault();

        const serviceID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
        const templateID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_BECOME_DEALER_ID;
        const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

        const formData = {
            userName: formState.userName,
            userSurname: formState.userSurname,
            companyName: formState.companyName,
            position: formState.position,
            userEmail: formState.userEmail,
            userTelNumber: formState.userTelNumber,
            cityActivity: formState.cityActivity,
            EDRPOUcode: formState.EDRPOUcode,
            salePointsCount: formState.salePointsCount,
            webSite: formState.webSite,
            userMessage: formState.userMessage
        }

        if (serviceID && templateID && publicKey) {
            emailjs.send(serviceID, templateID, formData, { publicKey: publicKey })
                .then(() => {
                    setSendingStatus({ isVissible: true, status: true });
                    setTimeout(() => {
                        // Sending status pop-up
                        setSendingStatus({ isVissible: false, status: true });
                        // Clear form inputs
                        setFormState(initFormState);
                        // Switch to first form
                        setToggleForm(false);
                    }, 3000)
                })
                .catch((err) => {
                    console.log('FAILED...', err);
                    setSendingStatus({ isVissible: true, status: false });
                    setTimeout(() => {
                        setSendingStatus({ isVissible: false, status: true });
                    }, 3000)
                })
        } else {
            console.log('No keys found for the request!');
            setSendingStatus({ isVissible: true, status: false });
            setTimeout(() => {
                setSendingStatus({ isVissible: false, status: true });
            }, 3000)
        }
    };

    return (
        <>
            {/* Sending status pop-up */}
            <AnimatePresence>
                {sendingStatus.isVissible &&
                    <motion.div
                        className="relative z-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <ReportMessage
                            isSuccess={sendingStatus.status}
                            successMessage="Відправлено"
                            errorMessage="Щось пішло не так"
                        />
                    </motion.div>
                }
            </AnimatePresence>
            {/* Form */}
            <div className="relative w-full lg:w-[503px]">
                <form className="relative z-10 bg-white py-[30px] px-4 md:p-[45px] lg:py-[22px] lg:px-[24px] xl:p-[22px] rounded-[15px] flex flex-col gap-y-[30px]" >
                    {/* City activity */}
                    <div className="relative flex flex-col">
                        <label htmlFor="cityActivity" className={labelStyles}>Основне місто вашої діяльності</label>
                        <input
                            id="cityActivity"
                            type="text"
                            placeholder="Введіть місто вашої діяльності"
                            className={inputStyles}
                            value={formState.cityActivity}
                            onChange={(e) => {
                                setFormState({ ...formState, cityActivity: e.target.value });
                            }}
                        />
                    </div>
                    {/* EDRPOU code */}
                    <div className="relative flex flex-col">
                        <label htmlFor="EDRPOUcode" className={labelStyles}>Код ЄДРПОУ</label>
                        <input
                            id="EDRPOUcode"
                            type="text"
                            placeholder="Введіть унікальний 8-значний номер"
                            className={inputStyles}
                            value={formState.EDRPOUcode}
                            onChange={(e) => {
                                setFormState({ ...formState, EDRPOUcode: e.target.value });
                            }}
                        />
                    </div>
                    {/* Sale points count */}
                    <div className="relative flex flex-col">
                        <label htmlFor="salePointsCount" className={labelStyles}>Кількість точок продажу</label>
                        <input
                            id="salePointsCount"
                            type="text"
                            className={inputStyles}
                            placeholder="Введіть кількість офлайн-точок продажу"
                            value={formState.salePointsCount}
                            onChange={(e) => {
                                setFormState({ ...formState, salePointsCount: e.target.value });
                            }}
                        />
                    </div>
                    {/* Web site */}
                    <div className="relative flex flex-col">
                        <label htmlFor="webSite" className={labelStyles}>Веб-сайт</label>
                        <input
                            id="webSite"
                            type="text"
                            className={inputStyles}
                            placeholder="Введіть свій корпоративний веб-сайт"
                            value={formState.webSite}
                            onChange={(e) => {
                                setFormState({ ...formState, webSite: e.target.value });
                            }}
                        />
                    </div>

                    {/* User message */}
                    <div className="flex flex-col">
                        <label htmlFor="userMessage" className={labelStyles}>Що вас зацікавило найбільше?</label>
                        <textarea
                            id="userMessage"
                            name="userMessage"
                            placeholder="Допоможіть нам підготувати найкращу можливу демонстрацію, яка відповідатиме вашим потребам та цілям бізнесу."
                            className={`${openSansFont.className} w-full h-[154px] lg:h-[102px] text-sm md:text-base text-[#09022B] bg-t-pale px-[17px] py-[11px] rounded-[15px] focus:outline-none focus:ring-1 ring-offset-1 ring-t-blue duration-200 resize-none `}
                            value={formState.userMessage}
                            onChange={(e) => setFormState({ ...formState, userMessage: e.target.value })}
                        />
                    </div>

                    <button
                        type="submit"
                        className="relative group py-[13px] xl:pt-3 xl:pb-2.5 text-base xl:text-xl text-white font-semibold rounded-[27px] cursor-pointer overflow-hidden"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        onClick={btnHandler}
                    >
                        <span className="absolute top-0 bottom-0 right-0 group-hover:-right-1/4 group-focus:-right-1/4 duration-500 inline-block w-[130%] bg-m-blue-green-gradient"></span>
                        <span className="relative z-10">Відправити</span>
                    </button>

                </form>

                <FormDecorations visibleState={isHovered} />
            </div>
        </>
    )
};