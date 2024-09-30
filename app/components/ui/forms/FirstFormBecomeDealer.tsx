'use client'

import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { FormDecorations, IFormState } from "./FormBecomeDealer";
import { validateEmail, validateTelNumber } from "@/app/lib/utils/utils";
import { WarningIcon } from "../../assets/icons";

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

export default function FirstFormBecomeDealer({
    inputStyles,
    labelStyles,
    errorLabelStyles,
    errorStyles,
    formState,
    setFormState,
    isHovered,
    setIsHovered,
    setToggleForm
}: IFormProps) {
    const [errors, setErrors] = useState({
        userName: false,
        userSurname: false,
        userEmail: false,
        userTelNumber: false,
    });

    const btnHandler = (e: FormEvent) => {
        e.preventDefault();
        const { userName, userSurname, companyName, position, userEmail, userTelNumber, cityActivity, EDRPOUcode, salePointsCount, webSite, userMessage } = formState;
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
            setToggleForm(true);
        }
    }

    const defaultErrorMessage: JSX.Element = (<p className={errorLabelStyles}><WarningIcon /> Це поле є обов’язковим</p>);

    return (
        <div className="relative w-full lg:w-[503px]">
            <form className="relative z-10 bg-white py-[30px] px-4 md:p-[45px] lg:py-[22px] lg:px-[24px] xl:p-[22px] rounded-[15px] flex flex-col gap-y-[30px]" >
                <div className="flex flex-col md:flex-row gap-y-6 gap-x-[5px]">
                    {/* User name */}
                    <div className="relative flex flex-col">
                        <label htmlFor="userName" className={labelStyles}>Ім’я</label>
                        <input
                            id="userName"
                            type="text"
                            placeholder="Введіть своє ім'я"
                            value={formState.userName}
                            onChange={(e) => {
                                setFormState({ ...formState, userName: e.target.value })
                                setErrors({ ...errors, userName: false })
                            }}
                            className={`${inputStyles} ${errors.userName ? errorStyles : ''}`}
                        />
                        {errors.userName && defaultErrorMessage}
                    </div>
                    {/* User surname */}
                    <div className="relative flex flex-col">
                        <label htmlFor="userSurname" className={labelStyles}>Прізвище</label>
                        <input
                            id="userSurname"
                            type="text"
                            placeholder="Введіть своє прізвище"
                            className={`${inputStyles} ${errors.userSurname ? errorStyles : ''}`}
                            value={formState.userSurname}
                            onChange={(e) => {
                                setFormState({ ...formState, userSurname: e.target.value })
                                setErrors({ ...errors, userSurname: false })
                            }}
                        />
                        {errors.userSurname && defaultErrorMessage}
                    </div>
                </div>
                {/* Company name */}
                <div className="relative flex flex-col">
                    <label htmlFor="companyName" className={labelStyles}>Компанія</label>
                    <input
                        id="companyName"
                        type="text"
                        placeholder="Введіть назву компанії"
                        className={inputStyles}
                        value={formState.companyName}
                        onChange={(e) => { setFormState({ ...formState, companyName: e.target.value }) }}
                    />
                </div>
                {/* Job position */}
                <div className="relative flex flex-col">
                    <label htmlFor="position" className={labelStyles}>Посада</label>
                    <input
                        id="position"
                        type="text"
                        className={inputStyles}
                        placeholder="Введіть назву вашої посади"
                        value={formState.position}
                        onChange={(e) => {
                            setFormState({ ...formState, position: e.target.value });
                        }}
                    />
                </div>
                {/* Email */}
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
                {/* User tel. number */}
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

                <button
                    type="submit"
                    className="relative group py-[13px] xl:pt-3 xl:pb-2.5 text-base xl:text-xl text-white font-semibold rounded-[27px] cursor-pointer overflow-hidden"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    onClick={btnHandler}
                >
                    <span className="absolute top-0 bottom-0 right-0 group-hover:-right-1/4 group-focus:-right-1/4 duration-500 inline-block w-[130%] bg-m-blue-green-gradient"></span>
                    <span className="relative z-10">Далі</span>
                </button>

            </form>

            <FormDecorations visibleState={isHovered} />
        </div>
    )
}