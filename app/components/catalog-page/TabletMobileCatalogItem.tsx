'use client'

import { IProductItem } from "@/app/lib/types";
import { useState } from "react";
import { CloseArrowIcon } from "../assets/icons";
import Image from "next/image";
import ImageWithLoader from "../ui/ImageWithLoader";
import { openSansFont } from "../ui/fonts";
import Link from "next/link";
import { Description } from "../ui/catalog/Description";
import { motion, MotionProps } from "framer-motion";
import TopProductIcon from "../ui/catalog/TopProductIcon";
import { reverseDateValue } from "@/app/lib/utils/utils";

interface IProps {
    productItem: Omit<IProductItem, 'price'> | IProductItem | null
}

function TabletMobileCatalogItem({ productItem }: IProps) {
    if (productItem === null) return null;

    const DEFAULT_IMAGE = "https://api.piramidspace.com/storage/default.jpg";

    // Catalog item properties
    const {
        name,
        images_url,
        availability,
        date_on_stock,
        low_stock_meters,
        sort_order,
        category,
        technical_info: {
            collection,
            color,
            composition,
            description,
            fabric_texture,
            roll_width,
            tape_width,
            transparency,
            warranty,
            water_resistance
        }
    } = productItem;

    // const imagesToRender = images_url.filter((url) => url !== DEFAULT_IMAGE);

    const [selectedImage, setSelectedImage] = useState<string | null>(images_url[0]);
    // To hide tachinical information
    const [isHide, setIsHide] = useState<boolean>(false);

    const technicalInformation = [
        { item: "Затемнення", info: transparency },
        { item: "Водостійкість", info: water_resistance },
        { item: "Фактура тканини", info: fabric_texture },
        { item: "Склад", info: composition },
        { item: "Гарантія", info: warranty },
        { item: "Ширина рулону", info: roll_width ? (roll_width + " мм") : null },
        { item: "Ширина ламелі", info: tape_width ? (tape_width + " мм") : null }
    ];

    return (
        // <section className="relative block tablet:hidden grow"> // Default
        <section className="relative z-20 block tablet:hidden grow">
            <button
                className="absolute z-10 left-5 mobile:left-10 top-3 mobile:top-12"
                onClick={() => window.history.back()}
            >
                <CloseArrowIcon />
            </button>

            {/* Default logo */}
            <Image
                alt="Piramid logo"
                src={"/assets/images/full_logo_small.svg"}
                width={129}
                height={25}
                className="inline mobile:hidden absolute z-10 top-[15px] right-5"
            />

            <div onClick={() => setIsHide(!isHide)}>
                <ImageWithLoader
                    src={selectedImage || DEFAULT_IMAGE}
                    alt={`Фото варінта тканини для ${name}`}
                    width={1024}
                    height={1366}
                    quality={100}
                    className={`relative z-0 top-0 left-0 w-full ${isHide ? 'h-screen object-contain' : 'h-[60vh] object-cover'} mobile:h-full overflow-hidden duration-200`}
                    watermark
                />
            </div>

            <div className={`wrap absolute ${isHide ? 'bottom-12' : 'bottom-0'} left-0 right-0 p-0 mobile:p-9 duration-200`}>
                {/* Top product icon */}
                {sort_order === 1 && <TopProductIcon className="absolute -top-7 right-0" />}

                <ul className="flex gap-2.5 pl-5 mobile:pl-0">
                    {images_url.map((url, index) => {
                        if (url === DEFAULT_IMAGE) return null;

                        return (
                            <motion.li
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.3,
                                    delay: 0.05 + index * 0.07,
                                }}
                                onClick={() => {
                                    setSelectedImage(url);
                                }}
                            >
                                <Image
                                    src={url || DEFAULT_IMAGE}
                                    alt="Варіант тканини"
                                    width={47}
                                    height={46}
                                    loading="lazy"
                                    className={`w-[47px] h-[46px] cursor-pointer rounded-md ring-1 duration-150 ${selectedImage === url ? "ring-[#10005B]" : "ring-t-gray-text"}`}
                                />
                            </motion.li>
                        )
                    })}
                </ul>

                {!isHide && <section className="p-9 mobile:p-10 mt-5 max-h-[50vh] rounded-2xl bg-[#FAFAFA] text-t-blue-dark overflow-y-auto hide-scrollbar">
                    <div>
                        <motion.div
                            {...getMotionAttributes(0.1)}
                            className={`${openSansFont.className} flex items-center justify-between`}
                        >
                            {/* Availability, category and collection values */}
                            <ProductTitles
                                availability={availability}
                                date_on_stock={date_on_stock}
                                category={category.name}
                                collection={collection}
                            />
                        </motion.div>

                        {/* Product name */}
                        <motion.h5
                            {...getMotionAttributes(0.2)}
                            className="text-[32px] mt-3 mb-5 mobile:mb-8"
                        >
                            {name}
                        </motion.h5>

                        {availability === "Закінчується" &&
                            low_stock_meters &&
                            <RemainderStockMeters lowStockMeters={low_stock_meters} />
                        }

                        {/* TO_DO */}
                        {/* <div className="w-full flex items-center justify-between">
                            {sale_tk === null ? null : <p className="relative w-[113px] h-[25px] py-1 px-3 flex items-center justify-end text-xs font-bold text-[#F79D15] bg-[#FFEFD1] rounded-full">
                                <FireIcon className="absolute left-[6px] bottom-1" />
                                Акція {parseFloat(sale_tk)}%
                            </p>} */}
                        {/* TO_DO!!! */}
                        {/* <p className={`h-[25px] w-fit px-[14px] py-1 rounded-full text-[12px] font-bold  ${label === "Новинка" ?
                                    "text-white bg-t-blue"
                                    :
                                    label === "Розпродаж" ? "text-[#F79D15] bg-[#FFEFD1]" : "text-t-blue bg-[#DDE8FF]"}`
                                }>
                                    {label}
                                </p> */}
                        {/* </div> */}
                        {/* </div> */}
                    </div>

                    {/* Description */}
                    {description &&
                        <motion.div
                            {...getMotionAttributes(0.4)}
                        >
                            <Description descriptionText={description} />
                        </motion.div>}

                    <motion.div
                        {...getMotionAttributes(0.5)}
                        className={`${openSansFont.className} text-base mobile:text-lg font-normal mt-10 mobile:mt-11`}
                    >
                        <p className="inline-block w-full pb-[14px] mobile:pb-5 mb-4 mobile:mb-5 border-b-1 border-[#DDE0E9]">Технічна інформація</p>

                        <ul className="text-base mobile:text-lg grid grid-cols-2 sm:grid-cols-3 gap-x-2 gap-y-[23px] mobile:gap-y-[30px]">
                            {technicalInformation.map((infoItem, index) => {
                                if (infoItem.info !== null) {
                                    return (
                                        <motion.li
                                            key={index}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{
                                                duration: 0.3,
                                                delay: 0.5 + index * 0.07,
                                            }}
                                        >
                                            <p>{infoItem.item}</p>
                                            <p className="mt-1 text-sm text-[#AEB1BA]">{infoItem.info}</p>
                                        </motion.li>
                                    )
                                } else {
                                    return null;
                                }
                            })}
                        </ul>
                    </motion.div>
                </section>}
            </div>
        </section>
    )
}

export default TabletMobileCatalogItem;

function getMotionAttributes(delay: number): MotionProps {
    return {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.3, delay },
    };
};

// UI

function ProductTitles({ availability, date_on_stock, category, collection }: { availability: string, date_on_stock: string | null, category: string, collection: string | null }) {
    return (
        <>
            <p className="text-[#AEB1BA] text-xs uppercase">{category} <span className="text-t-blue-dark uppercase">/</span> {collection ? collection : "Відсутнє"}</p>
            <div className="flex flex-col items-end">
                <p className={availability === 'В наявності'
                    ? "text-t-green"
                    : availability === 'Закінчується' ?
                        "text-[#F79D15]"
                        :
                        "text-[#FF4242]"
                }>
                    {availability}
                </p>
                {availability === "Немає" ?
                    <p className={`${openSansFont.className} text-t-red/80 font-semibold text-sm w-fit text-end`}>
                        <span className="animate-spin inline-block">⏲</span> Очікується {date_on_stock ? reverseDateValue(date_on_stock) : ""}
                    </p>
                    :
                    null
                }
            </div>
        </>
    )
}

function RemainderStockMeters({ lowStockMeters }: { lowStockMeters: string }) {
    return (
        <motion.p
            {...getMotionAttributes(0.3)}
            className={`${openSansFont.className} text-sm font-semibold text-t-orange mb-3`}
        >
            <span className="w-4 h-4 inline-flex items-center justify-center rounded-full border-t-orange/70 border-2 font-semibold">!</span> Лишилось {lowStockMeters ? lowStockMeters : ""} м.
        </motion.p>
    )
}
