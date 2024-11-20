'use client'

import Image from 'next/image';
import { useState } from 'react';
import Loader from './Loader';
import WatermarkPiramid from './WatermarkPiramid';

interface IImageProps {
    src: string;
    alt: string,
    width?: number;
    height?: number;
    loading?: "lazy" | "eager";
    quality?: number;
    className?: string;
    watermark?: boolean
}

export default function ImageWithLoader({
    src,
    alt,
    width = 282,
    height = 381,
    loading = "lazy",
    quality = 75,
    className = "",
    watermark = false
}: IImageProps) {
    const [isLoading, setIsLoading] = useState(true);

    const wrapStyles = `relative w-full mobile:w-[${width}px] h-full mobile:h-[${height}px]`

    return (
        <div className={wrapStyles}>
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <Loader />
                </div>
            )}

            <Image
                alt={alt}
                src={src}
                width={width}
                height={height}
                loading={loading}
                quality={quality}
                className={className}
                onLoad={() => setIsLoading(false)}
            />
            {!isLoading && watermark && <WatermarkPiramid width={128} className="absolute bottom-4 left-4" />}
        </div>
    );
}
