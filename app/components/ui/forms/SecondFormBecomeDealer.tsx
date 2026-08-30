'use client'

import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { FormDecorations } from "./FormBecomeDealer";
import { openSansFont } from "../fonts";
import { ReportMessage } from "../ReportMessage";
import { AnimatePresence, motion } from "framer-motion";
import { IBecomeDealerForm, sendDealerRequest } from "@/app/lib/api/apiRequests";
import Loader from "../Loader";

interface IFormProps {
    inputStyles: string,
    labelStyles: string,
    errorLabelStyles: string,
    errorStyles: string,
    formState: IBecomeDealerForm,
    initFormState: IBecomeDealerForm;
    setFormState: Dispatch<SetStateAction<IBecomeDealerForm>>,
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
    const [isLoading, setIsLoading] = useState<boolean>(false);

    async function btnHandler(e: FormEvent) {
        e.preventDefault();

        const formData: IBecomeDealerForm = {
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

        setIsLoading(true);
        try {
            const response = await sendDealerRequest(formData);

            if (response?.success) {
                setSendingStatus({ isVissible: true, status: true });

                setTimeout(() => {
                    setSendingStatus({ isVissible: false, status: true });
                    setFormState(initFormState);
                    setToggleForm(false);
                }, 2500);
            } else {
                setSendingStatus({ isVissible: true, status: false });
                setTimeout(() => setSendingStatus({ isVissible: false, status: true }), 3000);
            }
        } catch (err) {
            console.error('FAILED sending Become dealer form:', err);
            setSendingStatus({ isVissible: true, status: false });
            setTimeout(() => setSendingStatus({ isVissible: false, status: true }), 3000);
        } finally {
            setIsLoading(false);
        }
    }

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
                {isLoading ?
                    <motion.div className="absolute z-50 w-full h-full bg-[#00000030] rounded-[15px] flex items-center justify-center">
                        <Loader />
                    </motion.div>
                    :
                    null
                }
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