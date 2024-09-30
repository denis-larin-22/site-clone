import { fetchCollections, fetchColors, fetchDesigns, fetchTransparencies } from "../api/apiRequests"
import { IFilterOption } from "../types"

export async function getFilterOptions() {
    // const filterByCriteria: IFilterOption = {
    //     filter: "criteria",
    //     options: [{ id: 1, name: "За популярністю" }, { id: 2, name: "За акціями" }, { id: 3, name: "За новинками" }, { id: 4, name: "За алфавітом" }],
    //     multichoice: false
    // }
    const filterByColors: IFilterOption = {
        filter: "color",
        title: "Колір",
        options: await fetchColors(),
        multichoice: true
    }
    const filterByDesigns: IFilterOption = {
        filter: "design",
        title: "Дизайн",
        options: await fetchDesigns(),
        multichoice: false
    }
    const filterByTransparencies: IFilterOption = {
        filter: "transparency",
        title: "Прозорість",
        options: await fetchTransparencies(),
        multichoice: false
    }
    const filterByCollections: IFilterOption = {
        filter: "collection",
        title: "Колекція",
        options: await fetchCollections(),
        multichoice: true
    }
    // const filterByPrice: IFilterOption = {
    //     filter: "price",
    //     title: "Категорія ціни",
    //     options: [{ id: 1, name: "1 категорія" }, { id: 2, name: "2 категорія" }, { id: 3, name: "3 категорія" }, { id: 4, name: "4 категорія" }],
    //     multichoice: true
    // }

    // return [filterByCriteria, filterByColors, filterByDesigns, filterByTransparencies, filterByCollections, filterByPrice];
    return [filterByColors, filterByDesigns, filterByTransparencies, filterByCollections];
}