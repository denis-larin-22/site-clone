'use client'

import { useState } from "react";
import { openSansFont } from "../fonts";
import { AnimatePresence, motion } from "framer-motion";
import { WarningIcon } from "../../assets/icons";
import { ReportMessage } from "../ReportMessage";
import { sendFeedbackMail } from "@/app/lib/api/apiRequests";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Loader from "../Loader";

function FeedbackForm() {
    // Getting current url for location in the message
    const currentPath = usePathname();

    const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
    const [hoveredStar, setHoveredStar] = useState(0);
    const [sendingProcess, setSendingProcess] = useState(false);
    const [sendingStatus, setSendingStatus] = useState({
        isVissible: false,
        status: true
    });

    const errorLabelStyles = `${openSansFont.className} text-sm text-[#A2A2A8] flex items-center gap-1.5 absolute bottom-0`;

    // Form values
    const initFormState = {
        name: "",
        rating: 0,
        message: ""
    };
    const [formState, setFormState] = useState(initFormState);

    const [errors, setErrors] = useState({
        name: false,
        rating: false,
        message: false
    });

    async function sendFeedback() {
        setSendingProcess(true);
        const { name: nameValue, rating: ratingValue, message: messageValue } = formState;

        const checkErrors = {
            name: !nameValue,
            rating: !ratingValue,
            message: !messageValue
        };
        setErrors(checkErrors);
        const hasErrors = Object.values(checkErrors).some(error => error);

        if (!hasErrors) {
            const responseResult = await sendFeedbackMail(nameValue, messageValue, ratingValue, "piramidspace.com" + currentPath);

            // Check sending status
            if (responseResult?.success) {
                setSendingProcess(false);
                setSendingStatus({ isVissible: true, status: true })
            } else {
                setSendingProcess(false);
                setSendingStatus({ isVissible: true, status: false })
            }
            setTimeout(() => { setSendingStatus({ ...sendingStatus, isVissible: false }) }, 3000)

            // Reset form inputs values
            setFormState(initFormState);
            // Close feedback
            setTimeout(() => { setIsFeedbackOpen(false) }, 3500)
        } else {
            return;
        }
    };

    async function check() {
        setTimeout(() => {
            return {

            }
        }, 3000)
    }

    return (
        <>
            {/* Feedback button */}
            <button
                className="fixed bottom-8 md:bottom-5 left-3 mdright-auto z-[60] flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-medium font-medium rounded-full shadow-lg hover:scale-105 transition-transform"
                onClick={() => setIsFeedbackOpen(!isFeedbackOpen)}
            >
                <motion.span
                    className="inline-block md:hidden w-16 h-16 rounded-full bg-t-blue/40 absolute z-0 -top-6 -left-1"
                    animate={{ scale: [1, 1.1, 1], opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 1.5, ease: "easeInOut", repeat: Infinity }}
                />
                <span className="w-14 h-14 flex items-center justify-center bg-white border-4 border-blue-600 rounded-full absolute left-0 z-45">
                    <Image
                        src="/assets/images/feedback/feedback-icon.svg"
                        alt="Feedback Icon"
                        width={36}
                        height={36}
                        className="w-9 h-9"
                    />
                </span>
                <span className="hidden md:inline ml-10">Feedback</span>
            </button>

            {/* REPORT MESSAGE */}
            <AnimatePresence>
                {sendingProcess &&
                    <div className="z-[70] fixed top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-white rounded-2xl p-4">
                        <Loader />
                    </div>
                }
                {sendingStatus.isVissible &&
                    <motion.div
                        className="relative z-[70]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <ReportMessage
                            isSuccess={sendingStatus.status}
                            successMessage="Дякуємо за відгук!"
                            errorMessage="Щось пішло не так"
                        />
                    </motion.div>
                }
            </AnimatePresence>

            <AnimatePresence>
                {isFeedbackOpen && <motion.main
                    key="feedbackForm"
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.5 }}
                    className="flex fixed top-0 left-0 z-50 h-dvh w-screen bg-t-pale items-center justify-center"
                >
                    <form className="relative z-10 bg-white p-4 md:p-12 rounded-xl shadow-sm max-w-[95%] md:max-w-md w-full">
                        <h5 className="text-lg font-bold text-center uppercase text-gray-900 mb-4">
                            Ваші <span className="text-blue-600">враження</span>
                        </h5>

                        {/* <!-- Rating --> */}
                        <div
                            className={`${errors.message ? "animate-appearance-in" : "animate-none"} flex justify-between mb-8`}
                            onMouseLeave={() => setHoveredStar(formState.rating)}
                        >
                            {[1, 2, 3, 4, 5].map((ratingValue) => (
                                <Image
                                    key={ratingValue}
                                    src={hoveredStar >= ratingValue ? "/assets/images/feedback/active-star.svg" : "/assets/images/feedback/star.svg"}
                                    alt="Rating Star"
                                    width={56}
                                    height={56}
                                    className="cursor-pointer w-14 h-14"
                                    onMouseOver={() => setHoveredStar(ratingValue)}
                                    onClick={() => {
                                        setFormState({ ...formState, rating: ratingValue })
                                        setErrors({ ...errors, rating: false })
                                    }}
                                />
                            ))}
                        </div>

                        {/* User name */}
                        <input
                            type="text"
                            className={`${openSansFont.className} ${errors.name ? "ring-1 ring-t-red" : ""} w-full bg-gray-200 text-gray-600 p-3 rounded-lg focus:outline-blue-600 placeholder-gray-400 mb-4 resize-none`}
                            placeholder="Ім'я"
                            value={formState.name}
                            onChange={(e) => {
                                setFormState({
                                    ...formState,
                                    name: e.target.value
                                });
                                setErrors({ ...errors, name: false })
                            }}
                        />

                        {/* <!-- Feedback Text --> */}
                        <div className="relative">
                            <label htmlFor="messageText" className="text-base font-bold text-gray-900 ml-3">Що вас зацікавило найбільше?</label>
                            <textarea
                                id="messageText"
                                className={`${openSansFont.className} ${errors.message ? "ring-1 ring-t-red" : ""} w-full h-24 mt-2 bg-gray-200 text-gray-600 p-3 rounded-lg focus:outline-blue-600 placeholder-gray-400 mb-4 resize-none`} placeholder="Допоможіть нам стати краще"
                                value={formState.message}
                                onChange={(e) => {
                                    setFormState({
                                        ...formState,
                                        message: e.target.value
                                    })
                                    setErrors({ ...errors, message: false })
                                }}
                            ></textarea>
                            {/* ERRORS MESSAGE */}
                            {(errors.message || errors.name || errors.rating) && <p className={errorLabelStyles}><WarningIcon /> Заповніть усі поля та оберіть рейтинг</p>}
                        </div>

                        {/* <!-- Buttons --> */}
                        <button
                            className="w-full py-2 mt-5 bg-gradient-to-r from-teal-400 via-blue-400 to-blue-700 text-white text-lg font-medium rounded-full  mb-3"
                            onClick={(e) => {
                                e.preventDefault();
                                sendFeedback();
                            }}
                        >
                            Відправити
                        </button>
                        <button
                            className="absolute top-2 right-2 bg-transparent border-none cursor-pointer"
                            onClick={(e) => {
                                e.preventDefault();
                                setIsFeedbackOpen(false);
                            }}>
                            <Image
                                src="/assets/images/feedback/close-feedback-btn.svg"
                                alt="Close button"
                                width={24}
                                height={24}
                                className="w-6 h-6"
                            />
                        </button>
                    </form>

                    {/* <!-- Decorations --> */}
                    <div className="absolute w-48 h-48 bg-transparent">
                        {[1, 2, 3, 4, 5].map((circleratingValue) => (
                            <Image
                                key={circleratingValue}
                                src="/assets/images/feedback/circle.webp"
                                alt="Circle decoration"
                                width={150}
                                height={150}
                                className={circleratingValue === 1 ?
                                    "w-44 h-44 absolute top-[-100%] right-[-100%] transition-opacity duration-500"
                                    :
                                    circleratingValue === 2 ?
                                        "w-[71px] h-[71px] absolute top-[-100%] right-0 rotate-[-25deg] transition-opacity duration-500"
                                        :
                                        circleratingValue === 3 ?
                                            "w-32 h-32 absolute bottom-[-100%] -left-1/2 md:left-[-90%] rotate-[-35deg] transition-opacity duration-500"
                                            :
                                            circleratingValue === 4 ?
                                                "w-[117px] h-[117px] absolute bottom-[120%] md:bottom-[-20%] -left-1/2 md:left-[-130%] rotate-[140deg] transition-opacity duration-500"
                                                :
                                                "w-24 h-24 absolute top-[130%] md:top-0 -right-1/2 md:right-[-110%] rotate-[140deg] transition-opacity duration-500"
                                }
                                style={{
                                    opacity: hoveredStar >= circleratingValue ? 1 : 0
                                }}
                            />
                        ))}
                    </div>
                </motion.main>}
            </AnimatePresence >
        </>
    )
};

export default FeedbackForm;