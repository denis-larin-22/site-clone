'use client'

import CatalogList from './CatalogList';
import Link from "next/link";
import { Filters } from './Filters';
import { ICategory, IFilterOption, IProductItem } from '@/app/lib/types';
import { SYSTEM_SALE_CATEGORY_ID, SYSTEM_TOP_CATEGORY_ID } from '@/app/lib/api/apiRequests';
import { getFilterOptions } from '@/app/lib/data/getFilterOptions';
import CategoryNavigation from './CategoryNavigation';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Button } from '@nextui-org/react';
import { useCategoriesList, useProductList } from '@/app/lib/hooks/catalogHooks';
import Loader from '../ui/Loader';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

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
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const router = useRouter()

    // Catalog list - init and render states
    const { productList: productListInit, isLoading: isProductListLoading } = useProductList(); // catalog list
    const [productList, setProductList] = useState<IProductList>({
        initList: productListInit, // init catalog list
        listToRender: [] // edited list for rendering
    });

    // Categories list and active category value
    const { categoriesList, isLoading: isCategoriesListLoading } = useCategoriesList(); // all categories
    const [activeCategory, setActiveCategory] = useState<number>(Number(activeCategoryId)); // active category

    // Filters options, all and active
    const [filterOptions, setFilterOptions] = useState<FilterOptions>([]); // for filters components
    const [activeFilters, setActiveFilters] = useState<IActiveFilters>({}); // for product list filtration

    // Getting filters params from url, return undefined if there in no active filters
    function getActiveFiltersFromURL() {
        const params = decodeURIComponent(searchParams.toString()); // pars if there is cyrilic
        const activeFiltersParams = params.length === 0 ? undefined : parseUrlStringToActiveFiltersParams(params)

        return activeFiltersParams;
    };

    // GET CATALOG DATA
    useEffect(() => {
        async function getCatalogData() {
            const productListByActiveCategory = getFiltredCatalogBySelectedCategory(+activeCategoryId, productListInit); // filtered list by active category
            const optionsFilter = getFilterOptions(productListByActiveCategory); // all filters/filter values by selected products
            setFilterOptions(optionsFilter);

            const activeFiltersFromURL = getActiveFiltersFromURL(); // acive filters

            if (activeFiltersFromURL !== undefined) {
                setActiveFilters(activeFiltersFromURL);
                setProductList({
                    initList: productListByActiveCategory,
                    listToRender: getFilteredItems(productListByActiveCategory, activeFiltersFromURL, Number(activeCategoryId)) // filtered by params from session storage
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
        };

        getCatalogData();
    }, [isProductListLoading, isCategoriesListLoading]);

    // CATEGORY HANDLER
    function categoriesHandler(categoryId: number) {
        setActiveCategory(categoryId);
    };

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

        // Passing activeCategory with null replaced by undefined
        const filteredItems = getFilteredItems(
            productList.initList,
            updatedActiveFilters,
            Number(activeCategoryId)
        );

        const updatedUrl = parseActiveFiltersParamsToUrlString(updatedActiveFilters);

        updateURL(updatedUrl); // saving active filters to url
        setActiveFilters(updatedActiveFilters);
        setProductList({ ...productList, listToRender: filteredItems });
    };
    // updating url string by active filters
    function updateURL(newParamsString: string) {
        router.replace(`${pathname}?${newParamsString}`);
    };

    // RESET FILTERS
    function resetFiltersHandler() {
        router.replace(pathname);
        setActiveFilters({});

        setTimeout(() => {
            window.location.reload();
        }, 200);
    };

    return (
        <>
            <CategoryNavigation
                isLoading={isCategoriesListLoading}
                activeCategory={activeCategory}
                categoriesList={categoriesList}
                categoriesHandler={categoriesHandler}
            />

            <div ref={catalogContainerRef} className="flex flex-col items-center flex-grow overflow-y-auto overflow-x-hidden ml-0 mobile:ml-24 p-3 mobile:py-[60px]">
                <div className="flex justify-between items-center mobile:hidden w-screen px-5 mb-2">
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
};

// filtration by category
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

// filtration by filters values
function getFilteredItems(products: IProductItem[], activeFilters: IActiveFilters, activeCategoryId: number) {
    const { availability, color, collection, rollWidth, tapeWidth, transparency, price, sale } = activeFilters;

    const result = products.filter((product) => {
        const { technical_info, price: productPrice, category_id, availability: productAvailability, sort_order } = product;
        const { color: productColor, transparency: productTransparency, collection: productCollection, roll_width, tape_width } = technical_info;

        // category match include Defaults API categories, TOP and SALE system categories
        const categoryMatch = activeCategoryId === SYSTEM_SALE_CATEGORY_ID ?
            Boolean(productPrice.sale)
            :
            activeCategoryId === SYSTEM_TOP_CATEGORY_ID ?
                Boolean(sort_order)
                :
                category_id === activeCategoryId


        const matches = [
            categoryMatch, // category match (include TOP and SALE system categories)
            !color.length || color.includes(productColor), // color match
            !transparency.length || transparency.includes(productTransparency), // transparency match
            !collection.length || collection.includes(productCollection), // collection match
            !rollWidth.length || rollWidth.includes(roll_width), // roll width match
            !tapeWidth.length || tapeWidth.includes(tape_width), // tape width match
            !price.length || price.includes(productPrice.price_5), // price category match
            !availability.length || availability.includes(productAvailability), // sale value match
            !sale.length || sale.includes(productPrice.sale)
        ];

        return matches.every(Boolean);
    });
    return result;
};

// parsing from url string to active filters object (IActiveFilters)
function parseUrlStringToActiveFiltersParams(urlParams: string): Record<string, string[]> {
    const requiredKeys = [
        "availability",
        "color",
        "collection",
        "rollWidth",
        "tapeWidth",
        "transparency",
        "price",
        "sale"
    ];

    const params = new URLSearchParams(urlParams);
    const result: Record<string, string[]> = {};

    // Fill in the data from the line
    params.forEach((value, key) => {
        if (!result[key]) {
            result[key] = [];
        }
        result[key].push(value);
    });

    // Make sure that all required keys are present in the object.
    for (const key of requiredKeys) {
        if (!result[key]) {
            result[key] = [];
        }
    }

    return result;
};

// parsing from active filters object (IActiveFilters) to url string (param=value) 
function parseActiveFiltersParamsToUrlString(activeFilters: Record<string, string[]>): string {
    const params = new URLSearchParams();

    for (const key in activeFilters) {
        const values = activeFilters[key];

        // Add each array element as a separate parameter
        values.forEach(value => {
            if (value) {
                params.append(key, value);
            }
        });
    }

    return params.toString();
};
