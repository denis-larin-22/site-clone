'use client'

import { fetchProductItem } from "@/app/lib/api/apiRequests";
import { IProductItem } from "@/app/lib/types";
import { useEffect, useState } from "react";
import Header from "../ui/Header";
import Loader from "../ui/Loader";
import Footer from "../ui/Footer";
import DesktopCatalogItem from "./DesktopCatalogItem";
import TabletMobileCatalogItem from "./TabletMobileCatalogItem";

interface IProps {
    itemId: string | number
}

function CatalogItem({ itemId }: IProps) {
    const [productItem, setProductItem] = useState<Omit<IProductItem, 'price'> | null>(null);

    useEffect(() => {
        async function getProductItem(productId: string | number) {
            const result = await fetchProductItem(productId);

            setProductItem(result);
        }

        getProductItem(itemId);
    }, []);


    if (productItem === null) {
        return (
            <>
                <Header />
                <div className="min-h-[75dvh] contsiner flex items-center justify-center">
                    <Loader />
                </div>
                <Footer />
            </>
        )
    } else {
        return (
            <div className="min-h-dvh overflow-hidden tablet:overflow-visible flex tablet:block flex-col justify-between bg-[#ECEAF0]">
                <div className="hidden tablet:block">
                    <Header />
                </div>
                <DesktopCatalogItem productItem={productItem} />
                <TabletMobileCatalogItem productItem={productItem} />
                <div className="hidden tablet:block">
                    <Footer />
                </div>
            </div>
        )
    }
}

export default CatalogItem;


