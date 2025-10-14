import { useState, useEffect } from 'react';
import { ICategory, IProductItem } from '../types';
import { SS_PIRAMID_CATALOG_CATEGORIES_LIST_KEY, SS_PIRAMID_CATALOG_LIST_KEY } from '../data/sessionStorage';
import { fetchCategories, fetchProductItem, fetchProductsList, SYSTEM_SALE_CATEGORY_ID, SYSTEM_TOP_CATEGORY_ID } from '../api/apiRequests';

// hook for catalog list state
export function useProductList() {
    const [productList, setProductList] = useState<IProductItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function loadProductList() {
            const products = await fetchProductsList();
            setProductList(products);

            setIsLoading(false);
        }

        loadProductList();

        // old cash
        // async function loadProductList() {
        //     const catalogListDataFromStorage = sessionStorage.getItem(SS_PIRAMID_CATALOG_LIST_KEY);

        //     if (catalogListDataFromStorage === null) {
        //         const products = await fetchProductsList();
        //         sessionStorage.setItem(SS_PIRAMID_CATALOG_LIST_KEY, JSON.stringify(products));
        //         setProductList(products);
        //     } else {
        //         const productsFromStorage = JSON.parse(catalogListDataFromStorage) as IProductItem[];
        //         setProductList(productsFromStorage);
        //     }

        //     setIsLoading(false);
        // }

        // loadProductList();
    }, []);

    return { productList, isLoading };
}

// hook for catalog categories list state
export type CategoriesListWithImages = Array<ICategory & { imageSrc: string }>;

export function useCategoriesList() {
    const [categoriesList, setCategoriesList] = useState<CategoriesListWithImages>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function loadCategoriesList() {
            const categoriesListDataFromStorage = sessionStorage.getItem(SS_PIRAMID_CATALOG_CATEGORIES_LIST_KEY);

            if (categoriesListDataFromStorage === null) {
                const categories = await fetchCategories();
                const categoriesWithImages = getCategoriesImages(categories);

                sessionStorage.setItem(SS_PIRAMID_CATALOG_CATEGORIES_LIST_KEY, JSON.stringify(categories));
                setCategoriesList(categoriesWithImages);
            } else {
                const categoriesFromStorage = JSON.parse(categoriesListDataFromStorage) as ICategory[];
                const categoriesWithImages = getCategoriesImages(categoriesFromStorage);

                setCategoriesList(categoriesWithImages);
            }
            setIsLoading(false);
        }

        loadCategoriesList();
    }, []);

    return { categoriesList, isLoading };
}

// util for categories list
function getCategoriesImages(categoriesList: ICategory[]): CategoriesListWithImages {

    return categoriesList.map((category) => {
        let path: string;

        switch (category.id) {
            case 1:
                path = "/assets/images/category-day-night.webp";
                break;
            case 2:
                path = "/assets/images/category-roller-blinds.webp";
                break;
            case 3:
                path = "/assets/images/category-horizontal-blinds.webp";
                break;
            case 4:
                path = "/assets/images/category-vertical-blinds.webp";
                break;
            case 5:
                path = "/assets/images/category-components.webp";
                break;
            case 6:
                path = "/assets/images/category-promotional-items.webp";
                break;
            case SYSTEM_SALE_CATEGORY_ID:
                path = "/assets/images/category-sale.webp";
                break;
            case SYSTEM_TOP_CATEGORY_ID:
                path = "/assets/images/category-top.webp";
                break;
            default:
                path = "/assets/images/category-default-item.webp";
        }

        return {
            ...category,
            imageSrc: path
        }
    });
};

export function useProductItem(productId: string | number) {
    const [productItem, setProductItem] = useState<IProductItem | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        async function getProductItem() {
            const catalogListFromSessionStorage = sessionStorage.getItem(SS_PIRAMID_CATALOG_LIST_KEY);

            if (catalogListFromSessionStorage === null) {
                const result = await fetchProductItem(productId);
                setProductItem(result);
            } else {
                const catalogList = JSON.parse(catalogListFromSessionStorage) as IProductItem[];
                const product = catalogList.find((product) => product.id === +productId);

                setProductItem(product || null);
            }
            setIsLoading(false);
        }

        getProductItem();
    }, [productId]);

    return { productItem, isLoading };
};