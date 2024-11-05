import Image from "next/image";
import { Modal, ModalContent, useDisclosure } from "@nextui-org/modal";
import { CloseIcon, FireIcon, ZoomIcon } from "../assets/icons";
import { openSansFont } from "../ui/fonts";
import { IProductItem } from "@/app/lib/types";
import { useState } from "react";
import WatermarkPiramid from "../ui/WatermarkPiramid";

interface IProps {
    productItem: IProductItem,
    onModalCloseHandler: () => void
}

export function ModalDesktop({ productItem, onModalCloseHandler }: IProps) {
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

    const [selectedImage, setSelectedImage] = useState<string | null>(imagesToRender[0]);
    const { isOpen: isZoomed, onOpen: onZoomed, onOpenChange: onZoomedChange } = useDisclosure();
    const [isImageLoading, setIsImageLoading] = useState(true);

    const technicalInformation = [
        { item: "Затемнення", info: transparency || 'відсутнє' },
        { item: "Водостійкість", info: water_resistance || 'відсутнє' },
        { item: "Фактура тканини", info: fabric_texture || 'відсутнє' },
        { item: "Склад", info: composition || 'відсутнє' },
        { item: "Гарантія", info: warranty || 'відсутнє' },
        { item: "Ширина рулону", info: roll_width || 'відсутнє' }
    ];

    return (
        <>
            <button className="w-fit h-fit absolute right-5 top-5" onClick={onModalCloseHandler}>
                <CloseIcon iconColor="#10005B" />
            </button>

            <ul className="flex flex-col gap-2.5">
                {imagesToRender.map((url, index) => (
                    <li
                        key={index}
                        onClick={() => {
                            setSelectedImage(url);
                            setIsImageLoading(true);
                        }}
                    >
                        <Image
                            src={url || "/assets/images/default-item.webp"}
                            alt="Варіант тканини"
                            width={47}
                            height={46}
                            loading="lazy"
                            className={`cursor-pointer rounded-md ring-1 hover:ring-offset-1 hover:ring-[#10005B] duration-150 ${selectedImage === color ? "ring-[#10005B]" : "ring-t-gray-text"}`}
                        />
                    </li>
                ))}
            </ul>

            <div className="absolute left-[120px] w-fit h-fit">
                <Image
                    alt={`Зображення товару ${name}`}
                    src={selectedImage || "/assets/images/default-item.webp"}
                    width={346}
                    height={620}
                    className={`h-[620px] w-[346px] object-cover rounded-[30px] transition-opacity duration-300 ${isImageLoading ? 'opacity-0' : 'opacity-100'}`} // применение классов для анимации
                    onLoad={() => setIsImageLoading(false)}
                />
                <WatermarkPiramid width={128} className="absolute bottom-4 left-4" />
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
                                <Image
                                    alt={`Зображення товару ${name}`}
                                    src={selectedImage || "/assets/images/default-item.webp"}
                                    width={1198}
                                    height={750}
                                    loading="lazy"
                                    className="object-cover"
                                />
                                <WatermarkPiramid className="absolute bottom-2 right-2" />
                                <button className="w-fit h-fit absolute top-3 right-3 z-50" onClick={onCloseZoomed}>
                                    <CloseIcon iconColor="#10005B" />
                                </button>
                            </>
                        )}
                    </ModalContent>
                </Modal>
            </div>

            <section className="w-[451px] xl:w-[515px]">
                <div>
                    <div className={`${openSansFont.className} flex items-center justify-between`}>
                        <p className="text-[#AEB1BA] text-xs uppercase">{category.name} <span className="text-t-blue-dark uppercase">/</span> {collection}</p>
                        <p className={`${availability === 'В наявності'
                            ? "text-t-green"
                            : availability === 'Акція' ?
                                "text-[#F79D15]"
                                :
                                "text-[#FF4242]"
                            }`}>{availability}</p>
                    </div>
                    <h5 className="text-[32px] mt-3 mb-8">{name}</h5>
                    <div className="w-full flex items-center justify-between">
                        <div className="flex items-center gap-[15px]">
                            {/* {discount === null ? null : <p className="relative w-[113px] py-1 px-3 flex items-center justify-end text-xs font-bold text-[#F79D15] bg-[#FFEFD1] rounded-full">
                                <FireIcon className="absolute left-[6px] bottom-1" />
                                Акція {discount.discount_percentage}% 
                            </p>} */}
                            {/* TO_DO!!! */}
                            {/* <p className={`h-[25px] w-fit px-[14px] py-1 rounded-full text-[12px] font-bold  ${label === "Новинка" ? 
                                "text-white bg-t-blue" 
                                : 
                                label === "Розпродаж" ? "text-[#F79D15] bg-[#FFEFD1]" : "text-t-blue bg-[#DDE8FF]"}` 
                            }>
                                {label} 
                            </p> */}
                        </div>
                    </div>
                </div>

                <div className={`${openSansFont.className} text-lg font-normal mt-[60px]`}>
                    <p className="inline-block w-full pb-5 mb-5 border-b-1 border-[#DDE0E9]">Технічна інформація</p>

                    <ul className="text-lg grid grid-cols-3 gap-x-2 gap-y-[30px]">
                        {technicalInformation.map((infoItem, index) => (
                            <li key={index}>
                                <p>{infoItem.item}</p>
                                <p className="mt-1 text-sm text-[#AEB1BA]">{infoItem.info}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
        </>
    )
}
