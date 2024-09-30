'use client'

import { validateEmail, validateTelNumber } from "@/app/lib/utils/utils";
import { FormEvent, useState } from "react";
import { openSansFont } from "../fonts";
import { AnimatePresence, motion } from "framer-motion";
import { CircleDecoreIcon, WarningIcon } from "../../assets/icons";
import emailjs from "@emailjs/browser";
import { ReportMessage } from "../ReportMessage";

export default function FormOrderDemo() {
    const initFormState = {
        userName: "",
        userSurname: "",
        userEmail: "",
        userTelNumber: "",
        userMessage: ""
    };

    const [isHovered, setIsHovered] = useState(false);
    const [formState, setFormState] = useState(initFormState);
    const [errors, setErrors] = useState({
        userName: false,
        userSurname: false,
        userEmail: false,
        userTelNumber: false,
    });
    // Sending status message
    const [sendingStatus, setSendingStatus] = useState({
        isVissible: false,
        status: true
    });

    const sendHandler = (e: FormEvent) => {
        e.preventDefault();
        const { userName, userSurname, userEmail, userTelNumber } = formState;
        const newErrors = {
            userName: !userName,
            userSurname: !userSurname,
            userEmail: !validateEmail(userEmail),
            userTelNumber: !validateTelNumber(userTelNumber),
        };
        setErrors(newErrors);

        const hasErrors = Object.values(newErrors).some(error => error);
        if (hasErrors) {
            return;
        } else {
            const serviceID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
            const templateID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ORDER_DEMO_ID;
            const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

            if (serviceID && templateID && publicKey) {
                emailjs.send(serviceID, templateID, formState, { publicKey: publicKey })
                    .then(() => {
                        setSendingStatus({ isVissible: true, status: true });
                        setTimeout(() => {
                            // Sending status pop-up
                            setSendingStatus({ isVissible: false, status: true });
                            // Clear form inputs
                            setFormState(initFormState);
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
        }
    }

    // Styles
    const labelStyles = "font-bold text-m-blue-dark ml-3 mb-1.5 cursor-pointer";
    const inputStyles = `${openSansFont.className} min-w-[227px] w-full text-sm md:text-base text-[#09022B] required:bg-t-pale px-[13px] py-[9px] rounded-[31px] focus:outline-none focus:ring-1 ring-offset-1 ring-t-blue duration-200 focus:text-m-blue-dark`;
    const errorStyles = "ring-1 ring-t-red";
    const errorLabelStyles = `${openSansFont.className} text-sm md:text-base text-[#A2A2A8] flex items-center gap-1.5 absolute -bottom-6`;

    return (
        <>
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

            <motion.div
                className="relative w-full lg:w-fit"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1, transition: { duration: 0.5, delay: 0.5 } }}
            >
                <form className="relative z-10 bg-white py-[30px] px-4 md:p-[45px] lg:py-[22px] lg:px-[24px] xl:p-[22px] rounded-[15px] flex flex-col gap-y-[30px]" >
                    <div className="flex flex-col md:flex-row gap-y-6 gap-x-[5px]">
                        <div className="relative flex flex-col">
                            <label htmlFor="userName" className={labelStyles}>Ім’я</label>
                            <input
                                id="userName"
                                required
                                type="text"
                                placeholder="Введіть своє ім'я"
                                value={formState.userName}
                                onChange={(e) => {
                                    setFormState({ ...formState, userName: e.target.value })
                                    setErrors({ ...errors, userName: false })
                                }}
                                className={`${inputStyles} ${errors.userName ? errorStyles : ''}`}
                            />
                            {errors.userName && <p className={errorLabelStyles}><WarningIcon /> Це поле є обов’язковим</p>}
                        </div>
                        <div className="relative flex flex-col">
                            <label htmlFor="userSurname" className={labelStyles}>Прізвище</label>
                            <input
                                id="userSurname"
                                required
                                type="text"
                                placeholder="Введіть своє прізвище"
                                className={`${inputStyles} ${errors.userSurname ? errorStyles : ''}`}
                                value={formState.userSurname}
                                onChange={(e) => {
                                    setFormState({ ...formState, userSurname: e.target.value })
                                    setErrors({ ...errors, userSurname: false })
                                }}
                            />
                            {errors.userSurname && <p className={errorLabelStyles}><WarningIcon /> Це поле є обов’язковим</p>}
                        </div>
                    </div>
                    <div className="relative flex flex-col">
                        <label htmlFor="userEmail" className={labelStyles}>Електронна пошта</label>
                        <input
                            id="userEmail"
                            required
                            type="email"
                            placeholder="Введіть свою пошту"
                            className={`${inputStyles} ${errors.userEmail ? errorStyles : ''}`}
                            value={formState.userEmail}
                            onChange={(e) => {
                                setFormState({ ...formState, userEmail: e.target.value })
                                setErrors({ ...errors, userEmail: false })
                            }}
                        />
                        {errors.userEmail && <p className={errorLabelStyles}><WarningIcon /> Введіть дійсну електронну адресу</p>}
                    </div>
                    <div className="relative flex flex-col">
                        <label htmlFor="userTelNumber" className={labelStyles}>Номер телефону</label>
                        <input
                            id="userTelNumber"
                            required
                            type="tel"
                            placeholder="Введіть свій номер телефону"
                            className={`${inputStyles} ${errors.userTelNumber ? errorStyles : ''}`}
                            value={formState.userTelNumber}
                            onChange={(e) => {
                                setFormState({ ...formState, userTelNumber: e.target.value })
                                setErrors({ ...errors, userTelNumber: false })
                            }}
                        />
                        {errors.userTelNumber && <p className={errorLabelStyles}><WarningIcon /> Введіть дійсний номер телефону</p>}
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="userMessage" className={labelStyles}>Що саме зараз вас цікавить?</label>
                        <textarea
                            id="userMessage"
                            name="userMessage"
                            placeholder="Допоможіть нам підготувати найкращу можливу демонстрацію, яка відповідатиме вашим потребам, цілям або просто першому інтересу."
                            className={`${openSansFont.className} w-full text-sm md:text-base text-[#09022B] bg-t-pale px-[17px] py-[11px] rounded-[15px] focus:outline-none focus:ring-1 ring-offset-1 ring-t-blue duration-200 resize-none h-[154px]`}
                            value={formState.userMessage}
                            onChange={(e) => setFormState({ ...formState, userMessage: e.target.value })}
                        />
                    </div>
                    <button
                        type="submit"
                        className="relative group py-[13px] xl:pt-3 xl:pb-2.5 text-base xl:text-xl text-white font-semibold rounded-[27px] cursor-pointer overflow-hidden"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        onClick={sendHandler}
                    >
                        <span className="absolute top-0 bottom-0 right-0 group-hover:-right-1/4 group-focus:-right-1/4 duration-500 inline-block w-[130%] bg-m-blue-green-gradient"></span>
                        <span className="relative z-10">Замовити демо</span>
                    </button>

                </form>

                <FormDecorations visibleState={isHovered} />
            </motion.div>
        </>
    )
}

function FormDecorations({ visibleState }: { visibleState: boolean }) {
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