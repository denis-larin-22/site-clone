'use client'

import LoginDecorations from "../components/login/decoration-elements/LoginDecorations";
import LoginForm from "../components/login/LoginForm";
import { motion } from "framer-motion";
import { ralewayFont } from "../components/ui/fonts";

export default function LoginPage() {
    return (
        <main className="relative min-h-dvh w-full overflow-hidden flex flex-col items-center lg:items-start xl:justify-center">
            <section className="relative z-50 h-full max-w-[446px] my-auto md:mb-0 md:mt-[154px] xl:mt-0 ml-0 xl:ml-[10%] p-4 bg-t-pale rounded-lg">
                <motion.img
                    src="/assets/images/full_logo.svg"
                    alt="Piramid logo"
                    className="w-[164px] h-[30px] absolute -top-[90px] md:-top-[114px]"
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                />

                <motion.h1
                    className="text-t-blue font-bold text-[26px] md:text-[38px] uppercase"
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >Привіт, Партнере!</motion.h1>
                <motion.p
                    className={`${ralewayFont.className} text-sm md:text-base mb-[55px] md:mb-11 mt-[15px] md:mt-2.5`}
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                >Введіть свої дані, щоб увійти у обліковий запис</motion.p>
                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                >
                    <LoginForm />
                </motion.div>
            </section>

            {/* Animated decorations */}
            <LoginDecorations />
        </main>
    )
}