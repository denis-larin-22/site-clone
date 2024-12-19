'use client'

import { IProductItem } from "@/app/lib/types"
import { Modal, ModalContent, useDisclosure } from "@nextui-org/react"
import { useState } from "react"
import { CloseIcon, ZoomIcon } from "../assets/icons"
import Image from "next/image"
import ImageWithLoader from "../ui/ImageWithLoader"
import { openSansFont } from "../ui/fonts"
import Link from "next/link"
import { motion } from "framer-motion"

interface IProps {
    productItem: Omit<IProductItem, 'price'> | null
}

function DesktopCatalogItem({ productItem }: IProps) {
    if (productItem === null) return;

    const DEFAULT_IMAGE = "https://piramidspace.com/admin/storage/default.jpg";
    // Catalog item properties
    const {
        name,
        images_url,
        availability,
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

    const imagesToRender = images_url.filter((url) => url !== DEFAULT_IMAGE);

    const [selectedImage, setSelectedImage] = useState<string | null>(images_url[0]);
    const { isOpen: isZoomed, onOpen: onZoomed, onOpenChange: onZoomedChange } = useDisclosure();

    const technicalInformation = [
        { item: "Затемнення", info: transparency || 'відсутнє' },
        { item: "Водостійкість", info: water_resistance || 'відсутнє' },
        { item: "Фактура тканини", info: fabric_texture || 'відсутнє' },
        { item: "Склад", info: composition || 'відсутнє' },
        { item: "Гарантія", info: warranty || 'відсутнє' },
        { item: "Ширина рулону", info: roll_width || 'відсутнє' }
    ];

    return (
        <motion.section
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="relative my-20 max-w-[1048px] h-[540px] p-10 pt-[60px] mx-auto hidden tablet:flex items-center justify-between bg-[#FAFAFA]  rounded-[26px]"
        >
            <Link href={`/catalog/${category.id}/category`} className="w-fit h-fit absolute right-5 top-5" title="Назад до каталогу">
                <CloseIcon iconColor="#10005B" />
            </Link >
            <motion.ul
                className="w-fit flex flex-col gap-2.5"
                initial="hidden"
                animate="visible"
                variants={{
                    hidden: { opacity: 0 },
                    visible: {
                        opacity: 1,
                        transition: {
                            staggerChildren: 0.1, // пауза между элементами
                        },
                    },
                }}
            >
                {imagesToRender.map((url, index) => (
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
                ))}
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

            <article className="w-[451px] xl:w-[515px]">
                <div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                        className={`${openSansFont.className} flex items-center justify-between`}
                    >
                        <p className="text-[#AEB1BA] text-xs uppercase">{category.name} <span className="text-t-blue-dark uppercase">/</span> {collection}</p>
                        <p className={availability === 'In Stock'
                            ? "text-t-green"
                            : availability === 'Low Stock' ?
                                "text-[#F79D15]"
                                :
                                "text-[#FF4242]"
                        }>
                            {availability === 'In Stock' ? "в наявності" :
                                availability === "Low Stock" ?
                                    "закінчується" : "немає"
                            }
                        </p>
                    </motion.div>
                    <motion.h5
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                        className="text-[32px] mt-3 mb-8"
                    >
                        {name}
                    </motion.h5>
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

                <div className={`${openSansFont.className} text-lg font-normal mt-[60px]`}>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.3 }}
                        className="inline-block w-full pb-5 mb-5 border-b-1 border-[#DDE0E9]"
                    >
                        Технічна інформація
                    </motion.p>

                    <ul className="text-lg grid grid-cols-3 gap-x-2 gap-y-[30px]">
                        {technicalInformation.map((infoItem, index) => (
                            <motion.li
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.3,
                                    delay: 0.4 + index * 0.07,
                                }}
                            >
                                <p>{infoItem.item}</p>
                                <p className="mt-1 text-sm text-[#AEB1BA]">{infoItem.info}</p>
                            </motion.li>
                        ))}
                    </ul>
                </div>
            </article>
        </motion.section>
    )
};

export default DesktopCatalogItem;