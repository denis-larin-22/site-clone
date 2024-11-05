import Image from "next/image";

interface IProps {
    width?: number,
    height?: number,
    className?: string
}

function WatermarkPiramid({ width = 256, height = 45, className = "" }: IProps) {
    return (
        <Image
            src="/assets/images/watermark.webp"
            alt="Piramid"
            width={width}
            height={height}
            className={className}
        />
    )
};

export default WatermarkPiramid;