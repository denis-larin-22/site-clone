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
    const all = productList.map((product) => {
        if (product.technical_info.color === null) {
            return "відсутнє"
        } else {
            return product.technical_info.color;
        }
    });

    const withoutDuplicates = Array.from(new Set(all));

    return withoutDuplicates.map((value, index) => {
        return {
            id: index,
            name: value
        }
    })
}

function getTransparencies(productList: IProductItem[]) {
    const all = productList.map((product) => {
        if (product.technical_info.transparency === null) {
            return "відсутнє"
        } else {
            return product.technical_info.transparency;
        }
    });

    const withoutDuplicates = Array.from(new Set(all));

    return withoutDuplicates.map((value, index) => {
        return {
            id: index,
            name: value
        }
    })
};

function getCollections(productList: IProductItem[]) {
    const all = productList.map((product) => {
        if (product.technical_info.collection === null) {
            return "відсутнє"
        } else {
            return product.technical_info.collection;
        }
    });

    const withoutDuplicates = Array.from(new Set(all));

    return withoutDuplicates.map((value, index) => {
        return {
            id: index,
            name: value
        }
    })
};

function getPriceCategories(productList: IProductItem[]) {
    const all = productList.map((product) => {
        if (product.price.price_5 === null) {
            return "відсутнє"
        } else {
            return product.price.price_5;
        }
    });

    const withoutDuplicates = Array.from(new Set(all));

    return withoutDuplicates.map((value, index) => {
        return {
            id: index,
            name: value
        }
    })
};

