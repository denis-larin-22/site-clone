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
                description: item.description,
                price_1: item.price_1,
                price_2: item.price_2,
                price_3: item.price_3,
                price_4: item.price_4,
                price_5: item.price_5,
                primary_price_index: item.primary_price_index,
                promo_offer: item.promo_offer,
                availability: item.availability,
                stock_quantity: item.stock_quantity,
                category: {
                    id: item.category.id,
                    name: item.category.name
                },
                collection_id: item.collection_id,
                design_id: item.design_id,
                transparency_id: item.transparency_id,
                color_id: item.color_id,
                discount_id: item.discount_id,
                availability_id: item.availability_id,
                images_url: [
                    item.image.image_url_1 ? formatImagePathFromApi(item.image.image_url_1) : null,
                    item.image.image_url_2 ? formatImagePathFromApi(item.image.image_url_2) : null,
                    item.image.image_url_3 ? formatImagePathFromApi(item.image.image_url_3) : null,
                    item.image.image_url_4 ? formatImagePathFromApi(item.image.image_url_4) : null,
                ],
                technical_info: {
                    collection: item.technical_info.collection,
                    color: item.technical_info.color,
                    composition: item.technical_info.composition,
                    darkness: item.technical_info.darkness,
                    description: item.technical_info.description,
                    fabric_texture: item.technical_info.fabric_texture,
                    roll_width: item.technical_info.roll_width,
                    tape_width: item.technical_info.tape_width,
                    system: item.technical_info.system,
                    transparency: item.technical_info.transparency,
                    warranty: item.technical_info.warranty,
                    water_resistance: item.technical_info.water_resistance
                }
            };

            return productItem;
        });
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
}

// Filters
export async function fetchColors(): Promise<IColor[]> {
    try {
        const response = await fetch(`${BASE_URL}api/cms/jaluji/colors`);
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
}

// Designs
export async function fetchDesigns(): Promise<IDesign[]> {
    try {
        const response = await fetch(`${BASE_URL}api/cms/jaluji/designs`);
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
}

// Transparencies
export async function fetchTransparencies(): Promise<IDesign[]> {
    try {
        const response = await fetch(`${BASE_URL}api/cms/jaluji/transparencies`);
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
}

// Collections
export async function fetchCollections(): Promise<IDesign[]> {
    try {
        const response = await fetch(`${BASE_URL}api/cms/jaluji/collections`);
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
}