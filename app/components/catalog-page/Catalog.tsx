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
    const SS_KEY = "piramid-saved_active_filters"; // Session storage key

    const [productList, setProductList] = useState<IProductList>({
        initList: [],
        listToRender: []
    });

    const [categories, setCategories] = useState<ICategoryList>({
        allCategories: [],
        activeCategory: null
    });

    const [filterOptions, setFilterOptions] = useState<FilterOptions>([]);
    const [activeFilters, setActiveFilters] = useState<IActiveFilters>({});

    useEffect(() => {
        async function fetchCatalogData() {
            const listProduct = await fetchProductsList();
            const categoriesList = await fetchCategories();
            const optionsFilter = getFilterOptions(listProduct);

            const activeFilters: IActiveFilters = optionsFilter
                .map((item) => item.filter)
                .reduce((acc, key) => {
                    acc[key] = [];
                    return acc;
                }, {} as IActiveFilters);

            let savedActiveFiltersFromLS = sessionStorage.getItem(SS_KEY);
            if (savedActiveFiltersFromLS) {
                const { savedCategory, savedFilters } = JSON.parse(savedActiveFiltersFromLS) as ISavedActiveFiltersFromLS;

                setProductList({
                    initList: listProduct,
                    listToRender: (savedCategory !== null && savedFilters !== null) ? getFilteredItems(listProduct, savedFilters, savedCategory) : listProduct
                });

                setCategories({ activeCategory: savedCategory, allCategories: categoriesList });
                setFilterOptions(optionsFilter);
                setActiveFilters(savedFilters || activeFilters);
            } else {
                const userCategoryChoise = getCategoryFromUrl(window.location.search);

                setProductList({
                    initList: listProduct,
                    listToRender: userCategoryChoise === null ?
                        listProduct
                        :
                        listProduct.filter((product) => product.category_id === userCategoryChoise)
                });

                setCategories({ activeCategory: userCategoryChoise, allCategories: categoriesList });
                setFilterOptions(optionsFilter);
                setActiveFilters(activeFilters);
            }
        }

        fetchCatalogData();
    }, []);

    function getFilteredItems(products: IProductItem[], activeFilters: IActiveFilters, activeCategoryId?: number) {
        const activeCategory = activeCategoryId ?? categories.activeCategory;

        const { color, collection, transparency } = activeFilters;
        return products.filter((product) => {
            const categoryMatch = activeCategory === null || product.category_id === activeCategory;
            const colorMatch = color.length === 0 || color.includes(product.technical_info.color);
            const transparencyMatch = transparency.length === 0 || transparency.includes(product.technical_info.transparency);
            const collectionMatch = collection.length === 0 || collection.includes(product.technical_info.collection);

            return categoryMatch && colorMatch && transparencyMatch && collectionMatch;
        });
    }

    function categoriesHandler(categoryId: number) {
        const filteredItems = getFilteredItems(productList.initList, activeFilters, categoryId);

        setCategories({ ...categories, activeCategory: categoryId });
        setProductList({ ...productList, listToRender: filteredItems });

        const activeFiltersToSave: ISavedActiveFiltersFromLS = { savedCategory: categoryId, savedFilters: activeFilters };
        // setLSSavedActiveFilters(activeFiltersToSave);
        sessionStorage.setItem(SS_KEY, JSON.stringify(activeFiltersToSave));
    }

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
            categories.activeCategory ?? undefined
        );

        setActiveFilters(updatedActiveFilters);
        setProductList({ ...productList, listToRender: filteredItems });

        const activeFiltersToSave: ISavedActiveFiltersFromLS = {
            savedCategory: categories.activeCategory,
            savedFilters: updatedActiveFilters
        };
        // setLSSavedActiveFilters(activeFiltersToSave);
        sessionStorage.setItem(SS_KEY, JSON.stringify(activeFiltersToSave));
    }

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
                    activeFilters={activeFilters}
                    sortByPriceHandler={() => { }}
                />
                <CatalogList
                    listToRender={productList.listToRender}
                />
            </div>
        </>
    );
}

function getCategoryFromUrl(search: string): number | null {
    const params = new URLSearchParams(search);
    const categoryIdValue = params.get("category");

    return categoryIdValue === null ? null : +categoryIdValue;
}
