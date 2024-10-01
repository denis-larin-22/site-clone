import { ICategory, IColor, IDesign, IProductItem } from "../types";
import { formatImagePathFromApi } from "../utils/utils";

// ↓↓↓↓ CATALOG PAGE API ↓↓↓↓

const BASE_URL = "https://piramidspace.com/api/";
// GET Product list
export async function fetchProductsList(): Promise<IProductItem[]> {
    try {
        const response = await fetch(`${BASE_URL}api/cms/jaluji/products`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        return data.map((item: any) => {
            const productItem: IProductItem = {
                id: item.id,
                name: item.name,
                category_id: item.category_id,
                availability: item.availability,
                price: {
                    price_1: item.price.price_1,
                    price_2: item.price.price_2,
                    price_3: item.price.price_3,
                    price_4: item.price.price_4,
                    price_5: item.price.price_5,
                    sale_tk: item.price.sale_tk
                },
                category: {
                    id: item.category.id,
                    name: item.category.name
                },
                images_url: [
                    item.image.image_url_1 ? formatImagePathFromApi(item.image.image_url_1) : null,
                    item.image.image_url_2 ? formatImagePathFromApi(item.image.image_url_2) : null,
                    item.image.image_url_3 ? formatImagePathFromApi(item.image.image_url_3) : null,
                    item.image.image_url_4 ? formatImagePathFromApi(item.image.image_url_4) : null,
                ],
                technical_info: {
                    name: item.technical_info.name,
                    blackout: item.technical_info.blackout,
                    water_resistance: item.technical_info.water_resistance,
                    fabric_texture: item.technical_info.fabric_texture,
                    composition: item.technical_info.composition,
                    warranty: item.technical_info.warranty,
                    roll_width: item.technical_info.roll_width,
                    tape_width: item.technical_info.tape_width,
                    collection: item.technical_info.collection,
                    transparency: item.technical_info.transparency,
                    color: item.technical_info.color,
                    description: item.technical_info.description,
                    max_width: item.technical_info.max_width,
                    max_height: item.technical_info.max_height,
                    max_area: item.technical_info.max_area,
                }
            };

            return productItem;
        });
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
}

// Categories
export async function fetchCategories(): Promise<ICategory[]> {
    try {
        const response = await fetch(`${BASE_URL}api/cms/jaluji/categories`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status} `);
        }
        const data = await response.json();
        return data.map((item: any) => ({
            id: item.id,
            name: item.name
        }))
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
};


// OLD API
// Filters
// export async function fetchColors(): Promise<IColor[]> {
//     try {
//         const response = await fetch(`${BASE_URL}api/cms/jaluji/colors`);
//         if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status} `);
//         }
//         const data = await response.json();
//         return data.map((item: any) => ({
//             id: item.id,
//             name: item.name
//         }))
//     } catch (error) {
//         console.error('Error fetching data:', error);
//         return [];
//     }
// }

// // Designs
// export async function fetchDesigns(): Promise<IDesign[]> {
//     try {
//         const response = await fetch(`${BASE_URL}api/cms/jaluji/designs`);
//         if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status} `);
//         }
//         const data = await response.json();
//         return data.map((item: any) => ({
//             id: item.id,
//             name: item.name
//         }))
//     } catch (error) {
//         console.error('Error fetching data:', error);
//         return [];
//     }
// }

// // Transparencies
// export async function fetchTransparencies(): Promise<IDesign[]> {
//     try {
//         const response = await fetch(`${BASE_URL}api/cms/jaluji/transparencies`);
//         if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status} `);
//         }
//         const data = await response.json();
//         return data.map((item: any) => ({
//             id: item.id,
//             name: item.name
//         }))
//     } catch (error) {
//         console.error('Error fetching data:', error);
//         return [];
//     }
// }

// // Collections
// export async function fetchCollections(): Promise<IDesign[]> {
//     try {
//         const response = await fetch(`${BASE_URL}api/cms/jaluji/collections`);
//         if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status} `);
//         }
//         const data = await response.json();
//         return data.map((item: any) => ({
//             id: item.id,
//             name: item.name
//         }))
//     } catch (error) {
//         console.error('Error fetching data:', error);
//         return [];
//     }
// }