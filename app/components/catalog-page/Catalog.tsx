'use client'

import CatalogList from './CatalogList';
import Link from "next/link";
import { Filters } from './Filters';
import { ICategory, IFilterOption, IProductItem } from '@/app/lib/types';
import { fetchCategories, fetchProductsList } from '@/app/lib/api/apiRequests';
import { getFilterOptions } from '@/app/lib/data/getFilterOptions';
import CategoryNavigation from './CategoryNavigation';
import { useEffect, useState } from 'react';
import LogoChristmas from '../ui/themes/LogoChristmas';

export interface IProductList {
    initList: IProductItem[],
    listToRender: IProductItem[]
}

export interface ICategoryList {
    allCategories: ICategory[],
    activeCategory: number | null
}

export type FilterOptions = IFilterOption[];

export interface IActiveFilters {
    [key: string]: any[];
}

export const SS_CATALOG_FILTERS_PARAMS_KEY = "piramid_ss_filters";
export const SS_CATALOG_PAGINATION_PAGE_KEY = "piramid_ss_pagination_page";

export default function Catalog({ activeCategoryId }: { activeCategoryId: string }) {
    const [productList, setProductList] = useState<IProductList>({
        initList: [],
        listToRender: []
    });

    const [categories, setCategories] = useState<ICategoryList>({
        allCategories: [],
        activeCategory: Number(activeCategoryId)
    });

    const [filterOptions, setFilterOptions] = useState<FilterOptions>([]);
    const [activeFilters, setActiveFilters] = useState<IActiveFilters>({});

    // GET CATALOG DATA
    useEffect(() => {
        async function fetchCatalogData() {
            const listProduct = await fetchProductsList(); // init catalog list
            const categoriesList = await fetchCategories(); // category list

            const productListByActiveCategory = listProduct.filter((product) => product.category_id === Number(activeCategoryId)); // filtered list by active category
            const optionsFilter = getFilterOptions(productListByActiveCategory); // all filters/filter values by selected products

            setCategories({ ...categories, allCategories: categoriesList });
            setFilterOptions(optionsFilter);

            const filterParamsFromSS = sessionStorage.getItem(SS_CATALOG_FILTERS_PARAMS_KEY); // saved filter params from the session storage

            if (filterParamsFromSS) {
                const savedFilterParams = JSON.parse(filterParamsFromSS) as IActiveFilters;

                setActiveFilters(savedFilterParams);
                setProductList({
                    initList: productListByActiveCategory,
                    listToRender: getFilteredItems(productListByActiveCategory, savedFilterParams, Number(activeCategoryId)) // filtered by params from session storage
                });
            } else {
                // init activeFilters object
                const activeFilters: IActiveFilters = optionsFilter
                    .map((item) => item.filter)
                    .reduce((acc, key) => {
                        acc[key] = [];
                        return acc;
                    }, {} as IActiveFilters);

                setActiveFilters(activeFilters);
                setProductList({
                    initList: productListByActiveCategory,
                    listToRender: productListByActiveCategory
                });
            }
        }

        fetchCatalogData();
    }, []);

    // CATEGORY HANDLER
    function categoriesHandler(categoryId: number) {
        setCategories({ ...categories, activeCategory: categoryId });
        // remoove previous saved filter params in the session storage
        sessionStorage.removeItem(SS_CATALOG_FILTERS_PARAMS_KEY);
        sessionStorage.removeItem(SS_CATALOG_PAGINATION_PAGE_KEY);
    }

    // FILTERS HANDLER
    function filtersHandler(filter: string, value: string, multichoice: boolean = false) {
        const updatedActiveFilters: IActiveFilters = { ...activeFilters };
        const initActiveFilterState = activeFilters[filter];

        if (multichoice) {
            updatedActiveFilters[filter] = initActiveFilterState.includes(value)
                ? initActiveFilterState.filter((item) => item !== value)
                : [...initActiveFilterState, value];
        } else {
            updatedActiveFilters[filter] = [value];
        }

        // Передача activeCategory с заменой null на undefined
        const filteredItems = getFilteredItems(
            productList.initList,
            updatedActiveFilters,
            Number(activeCategoryId)
        );

        setActiveFilters(updatedActiveFilters);
        setProductList({ ...productList, listToRender: filteredItems });
        // saving updated filter params to the session storage
        sessionStorage.setItem(SS_CATALOG_FILTERS_PARAMS_KEY, JSON.stringify(updatedActiveFilters));
    }

    // RESET FILTERS
    function resetFiltersHandler() {
        setActiveFilters({});
        sessionStorage.removeItem(SS_CATALOG_FILTERS_PARAMS_KEY);
        sessionStorage.removeItem(SS_CATALOG_PAGINATION_PAGE_KEY);
        window.location.reload();
    }

    return (
        <>
            <CategoryNavigation
                activeCategory={categories.activeCategory}
                categoriesList={categories.allCategories}
                categoriesHandler={categoriesHandler}
            />

            <div className="flex flex-col items-center flex-grow overflow-y-auto overflow-x-hidden ml-0 mobile:ml-24 p-3 mobile:py-[60px]">
                <div className="flex mobile:hidden w-screen pl-5 mb-8">
                    <Link href={"/"}>
                        {/* Default logo */}
                        {/* <Image
                            alt='Piramid logo'
                            src={"/assets/images/full_logo_small.svg"}
                            width={129}
                            height={25}
                        /> */}
                        <LogoChristmas />
                    </Link>
                </div>

                <Filters
                    activeFilters={activeFilters}
                    filterOptions={filterOptions}
                    filtersHandler={filtersHandler}
                    resetFiltersButtonHandler={resetFiltersHandler}
                    sortByPriceHandler={() => { }}
                />
                <CatalogList
                    paginationPageHandler={(value) => {
                        sessionStorage.setItem(SS_CATALOG_PAGINATION_PAGE_KEY, JSON.stringify(value));
                    }}
                    listToRender={productList.listToRender}
                />
            </div>
        </>
    );
}

// get filtered product list by category and filters values
function getFilteredItems(products: IProductItem[], activeFilters: IActiveFilters, activeCategoryId: number) {
    const { color, collection, transparency, price } = activeFilters;

    return products.filter((product) => {
        const categoryMatch = product.category_id === activeCategoryId;
        const colorMatch = color.length === 0 || color.includes(product.technical_info.color);
        const transparencyMatch = transparency.length === 0 || transparency.includes(product.technical_info.transparency);
        const collectionMatch = collection.length === 0 || collection.includes(product.technical_info.collection);
        const priceMatch = price.length === 0 || price.includes(product.price.price_5);

        return categoryMatch && colorMatch && transparencyMatch && collectionMatch && priceMatch;
    });
};