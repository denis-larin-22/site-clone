'use client'

import Header from "../ui/Header";
import Loader from "../ui/Loader";
import Footer from "../ui/Footer";
import DesktopCatalogItem from "./DesktopCatalogItem";
import TabletMobileCatalogItem from "./TabletMobileCatalogItem";
import { useProductItem } from "@/app/lib/hooks/catalogHooks";

interface IProps {
    itemId: string | number
}

function CatalogItem({ itemId }: IProps) {
    const { productItem, isLoading } = useProductItem(itemId);

    return (
        <div className="min-h-dvh overflow-hidden tablet:overflow-visible flex tablet:block flex-col justify-between bg-[#ECEAF0] shadow-2xl">
            <div className="hidden tablet:block">
                <Header />
            </div>
            {isLoading ?
                <div className="min-h-[75dvh] container flex items-center justify-center">
                    <Loader />
                </div>
                :
                <>
                    <DesktopCatalogItem productItem={productItem} />
                    <TabletMobileCatalogItem productItem={productItem} />
                </>
            }
            <div className="hidden tablet:block">
                <Footer />
            </div>
        </div>
    )
}


export default CatalogItem;


