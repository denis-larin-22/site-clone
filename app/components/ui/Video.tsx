'use client'

import { IVideoBannerContent } from "@/app/lib/contentful/contentful-api";
import { useRef, useState } from "react";

export function Video({ videoUrl, posterUrl }: IVideoBannerContent) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    return (
        <div className="relative w-full h-[237px] mobile:h-[383px] lg:h-[624px] rounded-[40px] overflow-hidden">
            <video
                muted
                src={videoUrl}
                poster={posterUrl}
                preload="metadata"
                width="600"
                loop
                ref={videoRef}
                className="w-full h-full object-cover"
                onClick={() => {
                    if (!videoRef.current) return;

                    if (videoRef.current.played) {
                        videoRef.current.pause();
                        setIsPlaying(false);
                    } else {
                        videoRef.current.play();
                    }
                }}
            />
            {!isPlaying && <button
                className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 cursor-pointer"
                onClick={() => {
                    if (videoRef.current) {
                        videoRef.current.play();
                    }
                    setIsPlaying(true);
                }}
            >
                <svg width="64" height="77" viewBox="0 0 64 77" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M59.4595 31.7601C64.3799 34.9063 64.3799 42.0937 59.4595 45.2399L12.5597 75.2291C7.23471 78.6341 0.250004 74.8098 0.250004 68.4892L0.250007 8.5108C0.250007 2.19022 7.2347 -1.63408 12.5597 1.7709L59.4595 31.7601Z" fill="#3372F9" />
                </svg>
            </button>}
        </div>
    )
}
