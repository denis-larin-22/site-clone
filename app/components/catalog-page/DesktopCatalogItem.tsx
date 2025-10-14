'use client'

import { IProductItem } from "@/app/lib/types"
import { Modal, ModalContent, useDisclosure } from "@nextui-org/react"
import { useState } from "react"
import { CloseIcon, ZoomIcon } from "../assets/icons"
import Image from "next/image"
import ImageWithLoader from "../ui/ImageWithLoader"
import { openSansFont } from "../ui/fonts"
import { motion, MotionProps } from "framer-motion"
import { Description } from "../ui/catalog/Description"
import TopProductIcon from "../ui/catalog/TopProductIcon"
import { reverseDateValue } from "@/app/lib/utils/utils"
import SaleValue from "../ui/catalog/SaleValue"

interface IProps {
    productItem: IProductItem | null,
    priceValue: number | null
}

function DesktopCatalogItem({ productItem, priceValue }: IProps) {
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
            water_resistance,
        },
        price: {
            date_off_sale,
            date_on_sale,
            sale,
            price_5
        },
    } = productItem;

    const [selectedImage, setSelectedImage] = useState<string | null>(images_url[0]);
    const { isOpen: isZoomed, onOpen: onZoomed, onOpenChange: onZoomedChange } = useDisclosure();

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
        <motion.section
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="relative z-20 my-20 max-w-[1048px] h-[540px] p-10 pt-[60px] mx-auto hidden tablet:flex items-center justify-between bg-[#FAFAFA]  rounded-[26px]"
        >
            <BackButton className="absolute -top-[65px] left-0" />

            <button
                className="w-fit h-fit absolute right-5 top-5"
                title="Назад до каталогу"
                onClick={() => window.history.back()}
            >
                <CloseIcon iconColor="#10005B" />
            </button >
            <motion.ul
                className="w-fit flex flex-col gap-2.5"
                initial="hidden"
                animate="visible"
                variants={{
                    hidden: { opacity: 0 },
                    visible: {
                        opacity: 1,
                        transition: {
                            staggerChildren: 0.1, // pause between elements
                        },
                    },
                }}
            >
                {images_url.map((url, index) => {
                    if (url === DEFAULT_IMAGE) return null;

                    return (
                        <motion.li
                            key={index}
                            onClick={() => {
                                setSelectedImage(url);
                            }}
                            variants={{
                                hidden: { opacity: 0, x: -50 },
                                visible: { opacity: 1, x: 0 },
                            }}
                            transition={{ duration: 0.3 }}
                        >
                            <Image
                                src={url || DEFAULT_IMAGE}
                                alt="Варіант тканини"
                                width={47}
                                height={46}
                                loading="lazy"
                                className={`w-[47px] h-[46px] cursor-pointer rounded-md ring-1 hover:ring-offset-1 hover:ring-[#10005B] duration-150 ${selectedImage === url ? "ring-[#10005B]" : "ring-t-gray-text"}`}
                            />
                        </motion.li>
                    )
                })}
            </motion.ul>

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2, delay: 0.2 }}
                className="relative w-fit h-fit"
            >
                <ImageWithLoader
                    alt={`Зображення товару ${name}`}
                    src={selectedImage || "/assets/images/default-item.webp"}
                    width={346}
                    height={620}
                    quality={75}
                    className={`relative -top- h-[620px] w-[346px] object-cover rounded-[30px]`}
                    watermark
                    watermarkPosition="center"
                />

                {/* Top product icon */}
                {sale === null ? null : <SaleValue saleValue={sale} className="absolute top-24 -right-3" />}
                {sort_order === 1 && <TopProductIcon className="absolute -top-5 -right-5" />}

                <button onClick={onZoomed} className="w-[65px] h-[65px] absolute bottom-[30px] right-[30px] rounded-full bg-white flex items-center justify-center">
                    <ZoomIcon />
                </button>
                <Modal
                    isOpen={isZoomed}
                    onOpenChange={onZoomedChange}
                    size="3xl"
                    radius="lg"
                    hideCloseButton
                    classNames={{
                        body: "relative"
                    }}
                >
                    <ModalContent>
                        {(onCloseZoomed) => (
                            <>
                                <ImageWithLoader
                                    alt={`Зображення товару ${name}`}
                                    src={selectedImage || "/assets/images/default-item.webp"}
                                    width={1198}
                                    height={750}
                                    loading="lazy"
                                    quality={100}
                                    className="object-cover"
                                    watermark
                                />
                                <button className="w-fit h-fit absolute top-3 right-3 z-50" onClick={onCloseZoomed}>
                                    <CloseIcon iconColor="#10005B" />
                                </button>
                            </>
                        )}
                    </ModalContent>
                </Modal>
            </motion.div>


            {/* Main product information */}
            <article className="w-[451px] xl:w-[515px] h-full overflow-y-auto pr-1">
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
                        className="text-[32px] mt-3 mb-8 "
                    >
                        {name}
                    </motion.h5>


                    <PriceString
                        category={category.id}
                        price5={price_5}
                        priceValue={priceValue}
                    />

                    {availability === "Закінчується" &&
                        low_stock_meters &&
                        <RemainderStockMeters lowStockMeters={low_stock_meters} />
                    }

                    {/* Description */}
                    {description &&
                        <motion.div
                            {...getMotionAttributes(0.4)}
                        >
                            <Description descriptionText={description} />
                        </motion.div>}

                    {/* TO_DO */}
                    {/* <div className="w-full flex items-center justify-between"> */}
                    {/* <div className="flex items-center justify-between gap-[15px]">
                            {sale_tk === null ? null : <p className="relative w-[113px] py-1 px-3 flex items-center justify-end text-xs font-bold text-[#F79D15] bg-[#FFEFD1] rounded-full">
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

                <div className={`${openSansFont.className} text-lg font-normal mt-7`}>
                    <motion.p
                        {...getMotionAttributes(0.5)}
                        className="inline-block w-full pb-5 mb-5 border-b-1 border-[#DDE0E9]"
                    >
                        Технічна інформація
                    </motion.p>

                    <ul className="text-lg grid grid-cols-3 gap-x-2 gap-y-[30px]">
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
                </div>
            </article>
        </motion.section>
    )
};

export default DesktopCatalogItem;

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
                    <p className={`${openSansFont.className} text-t-red/80 font-semibold text-sm `}>
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
            className={`${openSansFont.className} text-sm font-semibold text-t-orange mb-4`}
        >
            <span className="w-4 h-4 inline-flex items-center justify-center rounded-full border-t-orange/70 border-2 font-semibold">!</span> Лишилось {lowStockMeters ? lowStockMeters : ""} м.
        </motion.p>
    )
}

function BackButton({ className = "" }: { className?: string }) {
    return (
        <button
            className={`
            group
        flex items-center justify-center 
        h-12 w-[100px] 
        bg-white hover:bg-t-blue rounded-[26px] 
        border-none cursor-pointer 
        transition-all duration-75 ease-linear 
        hover:-translate-y-[2px] 
        hover:shadow-[9px_9px_33px_#d1d1d1,-9px_-9px_33px_#ffffff]
        text-black hover:text-white text-sm ${className}`}
            onClick={() => window.history.back()}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                viewBox="0 0 1024 1024"
                height="20"
                width="20"
                className="
          mx-1 text-[20px] 
          transition-all duration-200 ease-in 
          group-hover:-translate-x-[5px] group-hover:text-[1.2em]
          fill-black group-hover:fill-white
        "
            >
                <path d="M874.690416 495.52477c0 11.2973-9.168824 20.466124-20.466124 20.466124l-604.773963 0 188.083679 188.083679c7.992021 7.992021 7.992021 20.947078 0 28.939099-4.001127 3.990894-9.240455 5.996574-14.46955 5.996574-5.239328 0-10.478655-1.995447-14.479783-5.996574l-223.00912-223.00912c-3.837398-3.837398-5.996574-9.046027-5.996574-14.46955 0-5.433756 2.159176-10.632151 5.996574-14.46955l223.019353-223.029586c7.992021-7.992021 20.957311-7.992021 28.949332 0 7.992021 8.002254 7.992021 20.957311 0 28.949332l-188.073446 188.073446 604.753497 0C865.521592 475.058646 874.690416 484.217237 874.690416 495.52477z"></path>
            </svg>
            <span className="tracking-[1px]">Назад</span>
        </button>
    );
};

function PriceString({
    category,
    priceValue,
    price5,
}: {
    category: number;
    priceValue: number | null;
    price5: string | null;
}) {
    let unitText = "";

    if (category === 1 || category === 2) {
        unitText = "за розмір (400 × 1400мм)";
    } else if (category === 3 || category === 4) {
        unitText = "за 1 м²";
    }

    return (
        <motion.p
            {...getMotionAttributes(0.2)}
            className={`${openSansFont.className} text-lg mb-3 flex items-center gap-2`}
        >
            <span className="flex flex-col">
                <span className="border-b-2 border-t-pale">
                    <span className="opacity-50">₴</span> {priceValue} грн.
                </span>
                <span>
                    <span className="opacity-50">$</span> {price5} у.од.
                </span>
            </span>

            {unitText && (
                <>
                    <span className="text-3xl text-t-gray-text">/</span>
                    <span className={`${openSansFont.className} text-base text-t-gray-text`}>
                        {unitText}
                    </span>
                </>
            )}
        </motion.p>
    );
}
