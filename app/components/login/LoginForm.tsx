'use client'

import { FormEvent, useState } from "react";
import { openSansFont } from "../ui/fonts";

export default function LoginForm() {
    const initFormState = {
        login: '',
        password: ''
    }

    const [formState, setFormState] = useState(initFormState);
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({
        login: false,
        password: false,
    });

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    const btnHandler = (e: FormEvent) => {
        e.preventDefault();
        // Check fields
        const { login, password } = formState;
        const newErrors = {
            login: !login,
            password: !password
        };
        setErrors(newErrors);

        const hasErrors = Object.values(newErrors).some(error => error);
        if (hasErrors) {
            return;
        } else {
            alert('Відправлено');
            console.log(formState);
            setFormState(initFormState);
        }
    }

    const inputsStyles = "rounded-[31px] text-sm md:text-base text-[#09022B] ${openSansFont.className} bg-white outline-none focus:ring-1 ring-t-blue duration-150";

    return (
        <form className="flex flex-col flex-shrink-0">
            <label htmlFor="login" className="font-bold text-[#09022B] mb-1.5 ml-3">Логін</label>
            <input
                id="login"
                type="text"
                placeholder="Введіть свій логін"
                className={`py-[9px] px-[13px] ${inputsStyles} ${errors.login ? "ring-1 ring-t-red" : ""}`}
                value={formState.login}
                onChange={(e) => {
                    setFormState({ ...formState, login: e.target.value });
                    setErrors({ ...errors, login: false });
                }}
            />

            <label htmlFor="password" className="font-bold text-[#09022B] mt-[21px] md:mt-6 mb-1.5 ml-3">Пароль</label>
            <div className="relative">
                <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Введіть свій пароль"
                    className={`w-full py-[9px] px-[13px] ${inputsStyles} ${errors.password ? "ring-1 ring-t-red" : ""}`}
                    value={formState.password}
                    onChange={(e) => {
                        setFormState({ ...formState, password: e.target.value });
                        setErrors({ ...errors, password: false });
                    }}
                />
                <button
                    type="button"
                    onClick={toggleShowPassword}
                    className="absolute top-1/2 -translate-y-1/2 right-4 cursor-pointer"
                >
                    {showPassword ? (
                        <img src="/assets/images/login-page/close-eye.svg" alt="Close eye icon" className="w-[30px]" />
                    ) : (
                        <img src="/assets/images/login-page/open-eye.svg" alt="Open eye icon" className="" />
                    )}
                </button>
            </div>

            <div className={`mt-[14px] flex items-center justify-between ${openSansFont.className} text-sm`}>
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        name=""
                        id="remember"
                        className="relative appearance-none h-[18px] w-[18px] border border-gray-300 rounded-full bg-white focus:outline-none transition duration-200 align-top cursor-pointer border-transparent checked:before:content-[''] checked:before:block checked:before:absolute checked:before:top-[2px] checked:before:left-[2px] checked:before:w-[15px] checked:before:h-[13px] checked:before:bg-[url('/assets/images/login-page/done.svg')] checked:before:bg-no-repeat"
                    />
                    <label htmlFor="remember" className="text-xm md:text-base cursor-pointer ml-2">Запам’ятай мене</label>
                </div>
                <a href="/login" className="text-xm md:text-base text-t-blue">Забули пароль?</a>
            </div>

            <button
                className="bg-m-blue-green-gradient font-semibold text-base md:text-xl text-white py-[13px] md:pt-3 md:pb-2.5 mt-[30px] rounded-[27px]"
                onClick={btnHandler}
            >
                Увійти
            </button>
        </form>
    )
}
