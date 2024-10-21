'use client'

import { Modal, ModalContent, ModalBody, useDisclosure } from "@nextui-org/modal";
import { useEffect, useState } from "react";
import Image from "next/image";
import { openSansFont } from "../ui/fonts";
import { CoinIcon, FireIcon } from "../assets/icons";
import { ModalDesktop } from "./ModalDesktop";
import { ModalTabletMobile } from "./ModalTabletMobile";
import { IProductItem } from "@/app/lib/types";
import CountdownTimer from "../ui/CountdownTimer";

interface IProps {
    productItem: IProductItem
}

export default function CatalogItem({ productItem }: IProps) {
    // Modal control
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
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

    // TO_DO!
    const isFabricOfTheWeek: boolean = false;

    // Additional styles
    const roundingExternalCorners = "before:inline-block before:w-6 before:h-6 before:absolute before:z-0 before:bottom-[76%] mobile:before:bottom-[85%] before:right-[-3px] before:rounded-br-xl before:border-r-4 before:border-b-4 before:border-t-pale after:inline-block after:w-6 after:h-6 after:absolute after:z-0 after:top-[68%] mobile:after:top-[82%] after:right-[-5px] after:rounded-tr-2xl after:border-r-5 after:border-t-5 after:border-t-pale"

    // State to check if running on client
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return null;
    }

    return (
        <>
            <button
                onClick={onOpen}
                className="group relative inline-flex w-full mobile:w-[282px] h-[231px] mobile:h-[381px] rounded-xl overflow-hidden mobile:hover:ring-4 ring-offset-4 ring-t-blue/40 duration-400"
            >
                <CountdownTimer className="absolute top-2 right-0 z-50" />

                <Image
                    alt={`Зображення товару ${name} із категорії ${category}`}
                    src={images_url[0] !== null ? images_url[0] : "/assets/images/default-item.webp"}
                    width={282}
                    height={381}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 duration-150"
                />
                {/* TO_DO!!! */}
                {/* Price category field */}
                {/* <p className={`${openSansFont.className} px-2 mobile:px-[14px] py-0 mobile:py-1 bg-t-pale absolute top-4 right-0 text-[10px] mobile:text-sm text-t-blue-dark rounded-tl-full rounded-bl-full ${roundingExternalCorners}`}>
                    <span className="relative z-10">{priceCategory}</span>
                </p> */}

                {/* Product info fields*/}
                <div className={`absolute bottom-2 mobile:bottom-[11px] left-2 mobile:left-[11px] right-2 mobile:right-[11px] rounded-xl p-2 mobile:p-3 pt-1.5 mobile:pt-2  ${isFabricOfTheWeek ? "bg-t-blue" : "bg-white"} flex flex-col items-start group-hover:shadow-xl duration-150`}>
                    {/* Collection name field*/}
                    <p className={`mb-1 ${openSansFont.className} uppercase text-3xs mobile:text-xs ${isFabricOfTheWeek ? "text-white" : "text-t-gray-text"}`}>
                        {collection === null ?
                            "відсутнє"
                            :
                            collection
                        }
                    </p>
                    {/* Product name field*/}
                    <p className={`mb-[18px] text-sm text-left mobile:text-xl font-bold  ${isFabricOfTheWeek ? "text-white" : "text-t-blue-dark"}`}>{name}</p>
                    {/* Cashback field (by condition) TO_DO*/}
                    {/* {cashback === undefined ? null : <p className="absolute top-0 mobile:top-2 right-2 mobile:right-3">
                        <CoinIcon />
                    </p>} */}
                    {/* {discount === null ? null :
                        <p className="absolute right-0 -top-5 mobile:-top-7 inline-flex h-[18px] mobile:h-[25px] w-[89px] mobile:w-[113px] pr-1.5 mobile:pr-[11px] rounded-[36px] bg-[#FFEFD1] text-xxs mobile:text-xs text-[#F79D15] font-bold items-center justify-end">
                            <span className="absolute left-[5px] mobile:left-[7px] bottom-0.5 mobile:bottom-1">
                                <FireIcon />
                            </span>
                            Акція {discount.discount_percentage}%
                        </p>} */}
                    {/* isInStock and label info fields*/}
                    <div className="w-full flex items-center justify-between">
                        <p className={`${isFabricOfTheWeek ? "hidden mobile:inline px-2.5 bg-t-pale rounded-xl" : "inline"} w-fit h-[15px] py-1 mobile:h-[25px] ${openSansFont.className} text-[9px] leading-none mobile:leading-none mobile:text-sm ${availability === 'В наявності'
                            ? "text-t-green"
                            : availability === 'Акція' ?
                                "text-[#F79D15]"
                                :
                                "text-[#FF4242]"
                            }`}>
                            {availability}
                        </p>
                        {/* TO_DO!!! */}
                        {/* <p className={`h-[15px] mobile:h-[25px] w-fit px-1 mobile:px-[14px] pt-[2px] mobile:py-1 rounded-full text-3xs mobile:text-xs font-bold  ${label === "Новинка" ?
                            "text-white bg-t-blue"
                            :
                            label === "Розпродаж" ? "text-[#F79D15] bg-[#FFEFD1]" : "text-t-blue bg-[#DDE8FF]"}`
                        }>
                            {label}
                        </p> */}
                    </div>
                </div>
            </button>

            {isClient && window.innerWidth > 1024 ?
                // Desktop pop-up
                <Modal
                    backdrop="blur"
                    classNames={{
                        wrapper: "h-fit my-auto",
                        base: "relative max-w-[1048px] min-h-[540px] p-10 bg-[#FAFAFA] text-t-blue-dark rounded-[27px]",
                        body: "p-0 flex flex-row items-center justify-between gap-x-[330px]"
                    }}
                    isOpen={isOpen}
                    onOpenChange={onOpenChange}
                    scrollBehavior="outside"
                    hideCloseButton
                >
                    <ModalContent>
                        {(onClose) => (
                            <ModalBody>
                                <ModalDesktop productItem={productItem} onModalCloseHandler={onClose} />
                            </ModalBody >
                        )}
                    </ModalContent >
                </Modal >
                :
                // Tablet and mobile pop-up
                <Modal
                    isOpen={isOpen}
                    size="full"
                    backdrop="transparent"
                    onOpenChange={onOpenChange}
                    hideCloseButton
                    classNames={{
                        base: "relative",
                        body: "p-0 grid grid"
                    }}
                >
                    <ModalContent>
                        {(onClose) => (
                            <ModalBody>
                                <ModalTabletMobile productItem={productItem} onModalCloseHandler={onClose} />
                            </ModalBody>
                        )}
                    </ModalContent>
                </Modal>
            }
        </>
    )
};