'use client'

import Image from 'next/image';
import CatalogList from './CatalogList';
import Link from "next/link";
import { Filters } from './Filters';
import { ICategory, IFilterOption, IProductItem } from '@/app/lib/types';
import { fetchCategories, fetchProductsList } from '@/app/lib/api/apiRequests';
import { getFilterOptions } from '@/app/lib/data/getFilterOptions';
import CategoryNavigation from './CategoryNavigation';
import { useEffect, useState } from 'react';
import { removeDuplicates } from '@/app/lib/utils/utils';

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

interface ISavedActiveFiltersFromLS {
    savedCategory: number | null,
    savedFilters: IActiveFilters | null
}

export default function Catalog() {
    const LS_KEY = "piramid-saved_active_filters"
    const [LSSavedActiveFilters, setLSSavedActiveFilters] = useState<ISavedActiveFiltersFromLS>({
        savedCategory: null,
        savedFilters: null
    });


    // Product list contains: initList => fetched initial product list, listToRender => product list for rendering (after filtering)
    const [productList, setProductList] = useState<IProductList>({
        initList: [],
        listToRender: []
    });

    // Main categories list
    const [categories, setCategories] = useState<ICategoryList>({
        allCategories: [],
        activeCategory: null
    });

    // Filters list
    const [filterOptions, setFilterOptions] = useState<FilterOptions>([]);
    // Active filters
    const [activeFilters, setActiveFilters] = useState<IActiveFilters>({});

    useEffect(() => {
        async function fetchCatalogData() {
            // Fetch data (product list, category list, filters list)
            const listProduct = await fetchProductsList();
            const categoriesList = await fetchCategories();
            const optionsFilter = getFilterOptions(listProduct);

            // FROM LS
            let savedActiveFiltersFromLS = localStorage.getItem(LS_KEY);

            // Filters collection
            const activeFilters: IActiveFilters = optionsFilter
                .map((item) => item.filter)
                .reduce((acc, key) => {
                    acc[key] = [];
                    return acc;
                }, {} as IActiveFilters);
            console.log(activeFilters);

            if (savedActiveFiltersFromLS !== null) {
                const { savedCategory, savedFilters } = JSON.parse(savedActiveFiltersFromLS) as ISavedActiveFiltersFromLS;

                setProductList({
                    initList: listProduct,
                    listToRender: savedCategory === null ?
                        listProduct
                        :
                        listProduct.filter((product) => product.category_id === savedCategory)
                });

                // Set categories obj.
                setCategories({ activeCategory: savedCategory, allCategories: categoriesList });

                // Set filters options
                setFilterOptions(optionsFilter);
                // Set active values of filters
                setActiveFilters(activeFilters);

            } else {
                // Set product list obj. (include user category choise)
                const userCategoryChoise = getCategoryFromUrl(window.location.search);

                setProductList({
                    initList: listProduct,
                    listToRender: userCategoryChoise === null ?
                        listProduct
                        :
                        listProduct.filter((product) => product.category_id === userCategoryChoise)
                });

                // Set categories obj.
                setCategories({ activeCategory: userCategoryChoise, allCategories: categoriesList });

                // Set filters options
                setFilterOptions(optionsFilter);
                // Set active values of filters
                setActiveFilters(activeFilters);
            }
        }

        fetchCatalogData();
    }, []);

    function getFilteredItems(activeFilters: IActiveFilters, activeCategoryId?: number) {
        const activeCategory = activeCategoryId ?? categories.activeCategory; // Return null if activeCategoryId = undefined and categories.activeCategory = null

        // Search for matches of product attributes with corresponding values ​​of activeFilters attributes
        const { color, collection, transparency, price } = activeFilters;
        const updatedList = productList.initList.filter((product) => {
            const categoryMatch = activeCategory === null || product.category_id === activeCategory;
            const colorMatch = color.length === 0 || color.includes(product.technical_info.color);
            // const designMatch = design.length === 0 || design.includes(product.design_id); - TO DO
            const transparencyMatch = transparency.length === 0 || transparency.includes(product.technical_info.transparency);
            const collectionMatch = collection.length === 0 || collection.includes(product.technical_info.collection);

            // The product does not pass filtration if there is at least one "false" match values!
            // return categoryMatch && colorMatch && designMatch && transparencyMatch && collectionMatch; - init all filters
            return categoryMatch && colorMatch && transparencyMatch && collectionMatch;
        });

        setProductList({ ...productList, listToRender: updatedList });
    };

    function categoriesHandler(categoryId: number) {
        setCategories({ ...categories, activeCategory: categoryId });
        getFilteredItems(activeFilters, categoryId);

        const activeFiltersToSave: ISavedActiveFiltersFromLS = { ...LSSavedActiveFilters, savedCategory: categoryId };
        setLSSavedActiveFilters(activeFiltersToSave);
        localStorage.setItem(LS_KEY, JSON.stringify(activeFiltersToSave));
    };

    function filtersHandler(filter: string, value: string, multichoice: boolean = false) {
        const initActiveFilterState = activeFilters[filter];

        if (multichoice) {
            const isFilterValueInclude = initActiveFilterState.includes(value);

            if (isFilterValueInclude) {
                const removeDuplicateId = initActiveFilterState.filter((item) => item !== value);
                const updatedActiveFilters = {
                    ...activeFilters,
                    [filter]: [...removeDuplicateId]
                }

                getFilteredItems(updatedActiveFilters);
                setActiveFilters(updatedActiveFilters);
            } else {
                const updatedActiveFilters = {
                    ...activeFilters,
                    [filter]: removeDuplicates([...activeFilters[filter], value])
                }

                getFilteredItems(updatedActiveFilters);
                setActiveFilters(updatedActiveFilters);
            }

        } else {
            const updatedActiveFilters = {
                ...activeFilters,
                [filter]: [value]
            }

            getFilteredItems(updatedActiveFilters);
            setActiveFilters(updatedActiveFilters);
        }
    };

    // TO_DO
    // function sortByPriceHandler(order: PriceOrder) {
    //     if (order === 'fromLower') {
    //         const sortedProductList = productList.listToRender.sort((a, b) => a.price - b.price);
    //         setProductList({ ...productList, listToRender: sortedProductList })
    //     } else if (order === 'fromHigher') {
    //         const sortedProductList = productList.listToRender.sort((a, b) => b.price - a.price);;
    //         setProductList({ ...productList, listToRender: sortedProductList })
    //     } else {
    //         return;
    //     }
    // }

    return (
        <>
            <CategoryNavigation
                categoriesList={categories}
                categoriesHandler={categoriesHandler}
            />

            <div className="flex flex-col items-center flex-grow overflow-y-auto overflow-x-hidden ml-0 mobile:ml-24 p-3 mobile:py-[60px]">
                <div className="flex mobile:hidden w-screen pl-5 mb-8">
                    <Link href={"/"}>
                        <Image
                            alt='Piramid logo'
                            src={"/assets/images/full_logo_small.svg"}
                            width={129}
                            height={25}
                        />
                    </Link>
                </div>

                <Filters
                    filterOptions={filterOptions}
                    filtersHandler={filtersHandler}
                    sortByPriceHandler={() => { }}
                />
                <CatalogList
                    listToRender={productList.listToRender}
                />
            </div>
        </>
    );
};

function getCategoryFromUrl(search: string): number | null {
    const params = new URLSearchParams(search);
    const categoryIdValue = params.get("category");

    return categoryIdValue === null ? null : +categoryIdValue;
}