'use client'

import { useState } from "react";
import { PriceIcon } from "../../assets/icons";

interface IProps {
    sortByPriceHandler: (order: PriceOrder) => void
}

export type PriceOrder = "fromHigher" | "fromLower" | "default";

export function FilterByLevelPrice({ sortByPriceHandler }: IProps) {
    const [priceOrder, setPriceOrder] = useState<PriceOrder>("default");
    const isIconRotated = priceOrder === "fromLower";

    return (
        <button
            className="mt-1 w-10 h-10 rounded-full bg-white flex items-center justify-center "
            onClick={() => {
                if (priceOrder === "default" || priceOrder === "fromLower") {
                    sortByPriceHandler("fromLower");
                    setPriceOrder("fromHigher");
                }

                if (priceOrder === "default" || priceOrder === "fromHigher") {
                    sortByPriceHandler("fromHigher");
                    setPriceOrder("fromLower");
                }

                if (priceOrder === "default") return;
            }}
        >
            <PriceIcon isRotated={isIconRotated} />
        </button>
    )
}