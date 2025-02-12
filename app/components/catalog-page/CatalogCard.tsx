import { openSansFont } from "../ui/fonts";
import { FireIcon } from "../assets/icons";
import { IProductItem } from "@/app/lib/types";
import ImageWithLoader from "../ui/ImageWithLoader";
import Link from "next/link";
import CountdownTimer from "../ui/catalog/CountdownTimer";
import TopProductIcon from "../ui/catalog/TopProductIcon";
import { reverseDateValue } from "@/app/lib/utils/utils";

interface IProps {
    productItem: IProductItem
}

export default function CatalogCard({ productItem }: IProps) {
    // Catalog item properties
    const {
        id,
        name,
        images_url,
        availability,
        date_on_stock,
        sort_order,
        category,
        price: {
            sale,
            date_on_sale,
            date_off_sale
        },
        technical_info: {
            collection
        }
    } = productItem;

    return (
        <>
            <Link
                href={`/catalog/${category.id}/category/${id}/catalog-item`}
                className={`group relative inline-flex w-full mobile:w-[282px] h-[231px] mobile:h-[381px] rounded-xl overflow-hidden mobile:hover:ring-4 ring-offset-4 ring-t-blue/40 duration-400 ${(availability === "Немає" || availability === "Виробництво припинено") ? "opacity-50" : ""} `}
            >
                {/* Availability of promotional offer */}
                {sale &&
                    date_on_sale &&
                    date_off_sale &&
                    <CountdownTimer
                        startDate={date_on_sale} // default dates
                        endDate={date_off_sale} // default dates
                        className="absolute top-2 right-0 z-20"
                    />}
                {/* Top product icon */}
                {(sort_order === 1) && <TopProductIcon className="absolute top-1 right-1 z-10 w-12 h-12 md:w-fit md:h-fit" />}

                <ImageWithLoader
                    alt={`Зображення товару ${name} із категорії ${category}`}
                    src={images_url[0] !== null ? images_url[0] : "/assets/images/default-item.webp"}
                    width={282}
                    height={381}
                    className="w-full h-full object-cover group-hover:scale-105 duration-150"
                />

                {/* TO_DO!!! */}
                {/* Price category field */}
                {/* <PriceCategory priceCategory={priceCategory}/> */}

                {/* Product info fields*/}
                <div className={`absolute bottom-2 mobile:bottom-[11px] left-2 mobile:left-[11px] right-2 mobile:right-[11px] rounded-xl p-2 mobile:p-3 pt-1.5 mobile:pt-2  ${sort_order === 1 ? "bg-t-blue" : "bg-white"} flex flex-col items-start group-hover:shadow-xl duration-150`}>
                    {/* Collection name field*/}
                    <p className={`mb-1 ${openSansFont.className} uppercase text-3xs mobile:text-xs ${sort_order === 1 ? "text-white" : "text-t-gray-text"}`}>
                        {collection === null ?
                            "відсутнє"
                            :
                            collection
                        }
                    </p>

                    {/* Product name field*/}
                    <p className={`mb-[18px] text-sm text-left mobile:text-xl font-bold  ${sort_order === 1 ? "text-white" : "text-t-blue-dark"}`}>{name}</p>

                    {/* Cashback field (by condition) TO_DO*/}
                    {/* {cashback === undefined ? null : <p className="absolute top-0 mobile:top-2 right-2 mobile:right-3">
                        <CoinIcon />
                    </p>} */}

                    {/* Sale offer */}
                    {sale === null ? null : <SaleOffer sale={sale} />}

                    {/* isInStock and label info fields*/}
                    <div className="w-full flex items-center justify-between">
                        <AvailabilityStatus
                            availability={availability}
                            blueTheme={sort_order === 1}
                        />
                        {/* TO_DO!!! */}
                        {/* <NewProduct label={label}/> */}
                    </div>

                </div>


                {/* If item is not availabile */}
                {availability === 'Немає' ?
                    <DateOnStockValue date_on_stock={date_on_stock} />
                    :
                    null
                }
            </Link>
        </>
    )
};

// UI elements

function SaleOffer({ sale }: { sale: string }) {
    return (
        <p className="absolute right-0 -top-5 mobile:-top-7 inline-flex h-[18px] mobile:h-[25px] w-[89px] mobile:w-[113px] pr-1.5 mobile:pr-[11px] rounded-[36px] bg-[#FFEFD1] text-xxs mobile:text-xs text-[#F79D15] font-bold items-center justify-end animate-bounce">
            <span className="absolute left-[5px] mobile:left-[7px] bottom-0.5 mobile:bottom-1">
                <FireIcon />
            </span>
            Акція {parseFloat(sale)}%
        </p>
    )
}

function AvailabilityStatus({ availability, blueTheme }: { availability: string, blueTheme: boolean }) {
    return (
        <p className={`${blueTheme ? "hidden mobile:inline px-2.5 bg-t-pale rounded-xl" : "inline"} w-fit h-[15px] py-1 mobile:h-[25px] ${openSansFont.className} text-[9px] leading-none mobile:leading-none mobile:text-sm ${availability === 'В наявності'
            ? "text-t-green"
            : availability === 'Закінчується' ?
                "text-[#F79D15]"
                :
                "text-[#FF4242]"
            }`}>
            {availability}
        </p>
    )
}

function NewProduct({ label }: { label: string }) {
    return (
        <p className={`h-[15px] mobile:h-[25px] w-fit px-1 mobile:px-[14px] pt-[2px] mobile:py-1 rounded-full text-3xs mobile:text-xs font-bold  ${label === "Новинка" ?
            "text-white bg-t-blue"
            :
            label === "Розпродаж" ? "text-[#F79D15] bg-[#FFEFD1]" : "text-t-blue bg-[#DDE8FF]"}`
        }>
            {label}
        </p>
    )
}

function PriceCategory({ priceCategory, }: { priceCategory: string, }) {
    const roundingExternalCorners = "before:inline-block before:w-6 before:h-6 before:absolute before:z-0 before:bottom-[76%] mobile:before:bottom-[85%] before:right-[-3px] before:rounded-br-xl before:border-r-4 before:border-b-4 before:border-t-pale after:inline-block after:w-6 after:h-6 after:absolute after:z-0 after:top-[68%] mobile:after:top-[82%] after:right-[-5px] after:rounded-tr-2xl after:border-r-5 after:border-t-5 after:border-t-pale"

    return (
        <p className={`${openSansFont.className} px-2 mobile:px-[14px] py-0 mobile:py-1 bg-t-pale absolute top-4 right-0 text-[10px] mobile:text-sm text-t-blue-dark rounded-tl-full rounded-bl-full ${roundingExternalCorners}`}>
            <span className="relative z-10">{priceCategory}</span>
        </p>
    )
}

function DateOnStockValue({ date_on_stock }: { date_on_stock: string | null }) {
    return (
        <p className={`${openSansFont.className} absolute z-30 top-1/3 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-t-blue w-[90%] md:w-fit text-center py-1 px-3 rounded-2xl text-white font-semibold text-sm ring-2 ring-t-blue/50 whitespace-normal md:whitespace-nowrap`}>
            <span className="animate-spin inline-block">⏲</span> Очікується {date_on_stock ? reverseDateValue(date_on_stock) : ""}
        </p>
    )
}