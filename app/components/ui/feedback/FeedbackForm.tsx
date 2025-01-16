'use client'

import { useState } from "react";
import { openSansFont } from "../fonts";
import { AnimatePresence, motion } from "framer-motion";

function FeedbackForm() {
    const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);

    const [chosenRaitingValue, setChosenRaitingValue] = useState(0);
    const [hoveredStar, setHoveredStar] = useState(0);

    return (
        <>
            <button
                id="openFeedbackBtn"
                className="fixed bottom-12 left-12 z-40 flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-medium font-medium rounded-full shadow-lg hover:scale-105 transition-transform"
                onClick={() => setIsFeedbackOpen(!isFeedbackOpen)}
            >
                <span className="w-14 h-14 flex items-center justify-center bg-white border-4 border-blue-600 rounded-full absolute left-0 z-45">
                    <img src="./assets/images/feedback/feedback-icon.svg" alt="Feedback Icon" className="w-9 h-9" />
                </span>
                <span className="ml-10">Feedback</span>
            </button>

            <AnimatePresence>
                {isFeedbackOpen && <motion.main
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex fixed top-0 left-0 z-50 h-dvh w-screen bg-t-pale items-center justify-center"
                >
                    <form className="relative z-10 bg-white p-12 rounded-xl shadow-sm max-w-md w-full">
                        <h5 className="text-lg font-bold text-center uppercase text-gray-900 mb-4">
                            Ваші <span className="text-blue-600">враження</span> про платформу
                        </h5>

                        {/* <!-- Rating --> */}
                        <div
                            className="flex justify-between mb-8"
                            onMouseLeave={() => setHoveredStar(chosenRaitingValue)}
                        >
                            {[1, 2, 3, 4, 5].map((ratingValue) => (
                                <img
                                    key={ratingValue}
                                    src={hoveredStar >= ratingValue ? "./assets/images/feedback/active-star.svg" : "./assets/images/feedback/star.svg"}
                                    alt="Rating Star"
                                    className="cursor-pointer w-15 h-15"
                                    onMouseOver={() => setHoveredStar(ratingValue)}
                                    onClick={() => setChosenRaitingValue(ratingValue)}
                                />
                            ))}
                        </div>

                        {/* <!-- Feedback Text --> */}
                        <p className="text-base font-bold text-gray-900 mb-2 ml-3">Що вас зацікавило найбільше?</p>
                        <textarea className={`${openSansFont.className} w-full h-24 bg-gray-200 text-gray-600 p-3 rounded-lg focus:outline-blue-600 placeholder-gray-400 mb-4 resize-none`} placeholder="Допоможіть нам покращити платформу."></textarea>

                        {/* <!-- Buttons --> */}
                        <button id="sendFeedbackBtn" className="w-full py-2 bg-gradient-to-r from-teal-400 via-blue-400 to-blue-700 text-white text-lg font-medium rounded-full  mb-3">
                            Відправити
                        </button>
                        <button
                            className="absolute top-2 right-2 bg-transparent border-none cursor-pointer"
                            onClick={(e) => {
                                e.preventDefault();
                                setIsFeedbackOpen(false);
                            }}>
                            <img src="./assets/images/feedback/close-feedback-btn.svg" alt="Close button" className="w-6 h-6" />
                        </button>
                    </form>

                    {/* <!-- Decorations --> */}
                    <div className="absolute w-48 h-48 bg-transparent">
                        {[1, 2, 3, 4, 5].map((circleRaitingValue) => (
                            <img
                                key={circleRaitingValue}
                                src="./assets/images/feedback/circle.webp"
                                alt="Circle decoration"
                                className={circleRaitingValue === 1 ?
                                    "w-44 h-44 absolute top-[-100%] right-[-100%] transition-opacity duration-500"
                                    :
                                    circleRaitingValue === 2 ?
                                        "w-[71px] h-[71px] absolute top-[-100%] right-0 rotate-[-25deg] transition-opacity duration-500"
                                        :
                                        circleRaitingValue === 3 ?
                                            "w-32 h-32 absolute bottom-[-100%] left-[-90%] rotate-[-35deg] transition-opacity duration-500"
                                            :
                                            circleRaitingValue === 4 ?
                                                "w-[117px] h-[117px] absolute bottom-[-20%] left-[-130%] rotate-[140deg] transition-opacity duration-500"
                                                :
                                                "w-24 h-24 absolute top-0 right-[-110%] rotate-[140deg] transition-opacity duration-500"
                                }
                                style={{
                                    opacity: hoveredStar >= circleRaitingValue ? 1 : 0
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