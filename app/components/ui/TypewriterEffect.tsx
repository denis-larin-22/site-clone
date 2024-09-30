'use client'

import { useState } from 'react';
import Typewriter from 'typewriter-effect';

interface IProps {
    strings: string[],
    typingDuration?: number,
    pauseDuration?: number,
    deleteDuration?: number
}

export function TypewriterEffect({ strings, typingDuration = 50, pauseDuration = 1500, deleteDuration = 10 }: IProps) {
    const [selectionTrigger, setSelectionTrigger] = useState(false);

    return (
        <span className={`typewriter-wrapper ${selectionTrigger ? "bg-t-blue/20" : "bg-transparent"} duration-250`}>
            <Typewriter
                onInit={(typewriter) => {
                    strings.forEach((str) => {
                        typewriter.typeString(str)
                            .callFunction(() => {
                                setTimeout(() => {
                                    setSelectionTrigger(true);
                                }, pauseDuration - 500)
                            })
                            .pauseFor(pauseDuration)
                            .deleteAll(deleteDuration)
                            .callFunction(() => {
                                setSelectionTrigger(false);
                            })
                            .start();
                    });
                    typewriter.start();
                }}
                options={{
                    autoStart: true,
                    loop: true,
                    delay: typingDuration,
                    wrapperClassName: 'text-t-blue',
                    cursorClassName: 'relative text-xs text-transparent after:inline-block after:h-[36px] mobile-xs:after:h-[50px] after:w-[3px] after:rounded-lg after:bg-t-blue after:absolute after:-translate-y-[5%] mobile:after:translate-y-[-2%] after:animate-blink',
                }}
            />
        </span>
    )
}
