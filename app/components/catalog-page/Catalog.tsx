'use client'

import CatalogList from './CatalogList';
import Link from "next/link";
import { Filters } from './Filters';
import { ICategory, IFilterOption, IProductItem } from '@/app/lib/types';
import { fetchCategories, fetchProductsList, SYSTEM_SALE_CATEGORY_ID, SYSTEM_TOP_CATEGORY_ID } from '@/app/lib/api/apiRequests';
import { getFilterOptions } from '@/app/lib/data/getFilterOptions';
import CategoryNavigation from './CategoryNavigation';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Button } from '@nextui-org/react';
import { SS_PIRAMID_CATALOG_FILTERS_PARAMS_KEY } from '@/app/lib/data/sessionStorage';
import { useCategoriesList, useProductList } from '@/app/lib/hooks/catalogHooks';
import Loader from '../ui/Loader';

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


export default function Catalog({ activeCategoryId }: { activeCategoryId: string }) {
    const catalogContainerRef = useRef<HTMLDivElement>(null);

    const { productList: productListInit, isLoading: isProductListLoading } = useProductList();
    const [productList, setProductList] = useState<IProductList>({
        initList: productListInit,
        listToRender: []
    });

    const { categoriesList, isLoading: isCategoriesListLoading } = useCategoriesList();
    const [categories, setCategories] = useState<ICategoryList>({
        allCategories: categoriesList,
        activeCategory: Number(activeCategoryId)
    });

    const [filterOptions, setFilterOptions] = useState<FilterOptions>([]);
    const [activeFilters, setActiveFilters] = useState<IActiveFilters>({});

    // GET CATALOG DATA
    useEffect(() => {
        async function fetchCatalogData() {
            const productListByActiveCategory = getFiltredCatalogBySelectedCategory(+activeCategoryId, productListInit); // filtered list by active category
            const optionsFilter = getFilterOptions(productListByActiveCategory); // all filters/filter values by selected products

            setCategories({ ...categories, allCategories: categoriesList });
            setFilterOptions(optionsFilter);

            const filterParamsFromSS = sessionStorage.getItem(SS_PIRAMID_CATALOG_FILTERS_PARAMS_KEY); // saved filter params from the session storage

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
    }, [isProductListLoading, isCategoriesListLoading]);

    // CATEGORY HANDLER
    function categoriesHandler(categoryId: number) {
        setCategories({ ...categories, activeCategory: categoryId });
        // remoove previous saved filter params in the session storage
        sessionStorage.removeItem(SS_PIRAMID_CATALOG_FILTERS_PARAMS_KEY);
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
        sessionStorage.setItem(SS_PIRAMID_CATALOG_FILTERS_PARAMS_KEY, JSON.stringify(updatedActiveFilters));
    }

    // RESET FILTERS
    function resetFiltersHandler() {
        setActiveFilters({});
        sessionStorage.removeItem(SS_PIRAMID_CATALOG_FILTERS_PARAMS_KEY);
        window.location.reload();
    }

    return (
        <>
            <CategoryNavigation
                isLoading={isCategoriesListLoading}
                activeCategory={categories.activeCategory}
                categoriesList={categories.allCategories}
                categoriesHandler={categoriesHandler}
            />

            <div ref={catalogContainerRef} className="flex flex-col items-center flex-grow overflow-y-auto overflow-x-hidden ml-0 mobile:ml-24 p-3 mobile:py-[60px]">
                <div className="flex justify-between items-center mobile:hidden w-screen px-5 mb-8">
                    <Link href={"/"}>
                        {/* Default logo */}
                        <Image
                            alt='Piramid logo'
                            src={"/assets/images/full_logo_small.svg"}
                            width={129}
                            height={25}
                        />
                    </Link>

                    <Button
                        as={Link}
                        href='/catalog'
                        variant='light'
                        className='flex items-center mobile:hidden text-xs text-white font-bold pt-0.5 px-2 h-7 bg-t-blue'
                    >
                        <span className="text-base inline-block w-3 overflow-hidden">⬅</span>  Усі категорії
                    </Button>
                </div>

                <Filters
                    activeFilters={activeFilters}
                    filterOptions={filterOptions}
                    filtersHandler={filtersHandler}
                    resetFiltersButtonHandler={resetFiltersHandler}
                    sortByPriceHandler={() => { }}
                />
                {!isProductListLoading ?
                    <CatalogList
                        listToRender={productList.listToRender}
                        catalogContainerRef={catalogContainerRef}
                    />
                    :
                    <Loader />
                }
            </div>
        </>
    );
}

function getFiltredCatalogBySelectedCategory(activeCategoryId: number, catalogList: IProductItem[]) {
    let filtredList: IProductItem[];

    if (activeCategoryId === SYSTEM_SALE_CATEGORY_ID) {
        filtredList = catalogList.filter((product) => product.price.sale !== null);
    } else if (activeCategoryId === SYSTEM_TOP_CATEGORY_ID) {
        filtredList = catalogList.filter((product) => product.sort_order === 1);
    } else {
        filtredList = catalogList.filter((product) => product.category_id === +activeCategoryId);
    }

    return filtredList;
}


// Code refactoring TEST version
function getFilteredItems(products: IProductItem[], activeFilters: IActiveFilters, activeCategoryId: number) {
    const { availability, color, collection, rollWidth, tapeWidth, transparency, price, sale } = activeFilters;

    const result = products.filter((product) => {
        const { technical_info, price: productPrice, category_id, availability: productAvailability } = product;
        const { color: productColor, transparency: productTransparency, collection: productCollection, roll_width, tape_width } = technical_info;

        const matches = [
            category_id === activeCategoryId, // ВОТЗДЕСЬ НУЖНО УЧИТІВАТЬ SYSTEM_SALE_CATEGORY_ID И  SYSTEM_TOP_CATEGORY_ID
            !color.length || color.includes(productColor),
            !transparency.length || transparency.includes(productTransparency),
            !collection.length || collection.includes(productCollection),
            !rollWidth.length || rollWidth.includes(roll_width),
            !tapeWidth.length || tapeWidth.includes(tape_width),
            !price.length || price.includes(productPrice.price_5),
            !availability.length || availability.includes(productAvailability),
            !sale.length || sale.includes(productPrice.sale)
        ];

        return matches.every(Boolean);
    });
    return result;
};