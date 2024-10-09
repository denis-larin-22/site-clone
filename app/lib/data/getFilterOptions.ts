import { IFilterOption, IProductItem } from "../types";

export function getFilterOptions(productList: IProductItem[]) {
    // TO DOz
    // const filterByCriteria: IFilterOption = {
    //     filter: "criteria",
    //     options: [{ id: 1, name: "За популярністю" }, { id: 2, name: "За акціями" }, { id: 3, name: "За новинками" }, { id: 4, name: "За алфавітом" }],
    //     multichoice: false
    // }
    const filterByColors: IFilterOption = {
        filter: "color",
        title: "Колір",
        // options: await fetchColors(),
        options: getColors(productList),
        multichoice: true
    }
    // TO DOz
    // const filterByDesigns: IFilterOption = {
    //     filter: "design",
    //     title: "Дизайн",
    //     options: await fetchDesigns(),
    //     multichoice: false
    // }
    const filterByTransparencies: IFilterOption = {
        filter: "transparency",
        title: "Прозорість",
        options: getTransparencies(productList),
        multichoice: false
    }
    const filterByCollections: IFilterOption = {
        filter: "collection",
        title: "Колекція",
        options: getCollections(productList),
        multichoice: true
    }
    const filterByPriceCategories: IFilterOption = {
        filter: "price",
        title: "Категорія ціни",
        options: getPriceCategories(productList),
        multichoice: true
    }

    // return [filterByCriteria, filterByColors, filterByDesigns, filterByTransparencies, filterByCollections, filterByPrice]; - init all filters
    return [filterByColors, filterByTransparencies, filterByCollections, filterByPriceCategories];
}

function getColors(productList: IProductItem[]) {
    const uniqueColorsArray = Array.from(
        productList.reduce<Set<string>>((acc, product) => {
            const color = product.technical_info.color;

            // Check that the color is not null and add it to the Set
            if (color !== null) {
                acc.add(color); // Adding color to Set for uniqueness
            }

            return acc;
        }, new Set<string>())
    );

    return uniqueColorsArray;
}

function getTransparencies(productList: IProductItem[]) {
    const uniqueTransparencyValuesArray = Array.from(
        productList.reduce<Set<string>>((acc, product) => {
            const transparency = product.technical_info.transparency;

            // Check that the transparency is not null and add it to the Set
            if (transparency !== null) {
                acc.add(transparency); // Adding transparency to Set for uniqueness
            }

            return acc;
        }, new Set<string>())
    );

    return uniqueTransparencyValuesArray;
};

function getCollections(productList: IProductItem[]) {
    const uniqueCollectionsArray = Array.from(
        productList.reduce<Set<string>>((acc, product) => {
            const collection = product.technical_info.collection;

            // Check that the collection is not null and add it to the Set
            if (collection !== null) {
                acc.add(collection); // Adding collection to Set for uniqueness
            }

            return acc;
        }, new Set<string>())
    );

    return uniqueCollectionsArray;
};

function getPriceCategories(productList: IProductItem[]) {
    const uniquePriceCategoriesArray = Array.from(
        productList.reduce<Set<string>>((acc, product) => {
            const priceCategory = product.price.price_5;

            // Check that the priceCategory is not null and add it to the Set
            if (priceCategory !== null) {
                acc.add(priceCategory); // Adding priceCategory to Set for uniqueness
            }

            return acc;
        }, new Set<string>())
    );

    return uniquePriceCategoriesArray;
};

