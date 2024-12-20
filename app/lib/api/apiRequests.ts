import { ICategory, IColor, IDesign, IProductItem } from "../types";
import { capitalizeFirstLetter, formatImagePathFromApi } from "../utils/utils";

// ↓↓↓↓ CATALOG PAGE API ↓↓↓↓

const BASE_URL = "https://api.piramidspace.com/api/";
// GET Product list
export async function fetchProductsList(): Promise<IProductItem[]> {
    try {
        const response = await fetch(`${BASE_URL}cms/jaluji/products`);
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
                    collection: capitalizeFirstLetter(item.technical_info.collection),
                    transparency: capitalizeFirstLetter(item.technical_info.transparency),
                    color: capitalizeFirstLetter(item.technical_info.color),
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
};

export async function fetchProductItem(productId: string | number): Promise<Omit<IProductItem, 'price'> | null> {
    try {
        const response = await fetch(`${BASE_URL}cms/jaluji/products/${productId}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        return {
            id: data.id,
            name: data.name,
            category_id: data.category_id,
            availability: data.availability,
            category: {
                id: data.category.id,
                name: data.category.name
            },
            images_url: [
                data.image.image_url_1 ? formatImagePathFromApi(data.image.image_url_1) : null,
                data.image.image_url_2 ? formatImagePathFromApi(data.image.image_url_2) : null,
                data.image.image_url_3 ? formatImagePathFromApi(data.image.image_url_3) : null,
                data.image.image_url_4 ? formatImagePathFromApi(data.image.image_url_4) : null,
            ],
            technical_info: {
                name: data.technical_info.name,
                blackout: data.technical_info.blackout,
                water_resistance: data.technical_info.water_resistance,
                fabric_texture: data.technical_info.fabric_texture,
                composition: data.technical_info.composition,
                warranty: data.technical_info.warranty,
                roll_width: data.technical_info.roll_width,
                tape_width: data.technical_info.tape_width,
                collection: capitalizeFirstLetter(data.technical_info.collection),
                transparency: capitalizeFirstLetter(data.technical_info.transparency),
                color: capitalizeFirstLetter(data.technical_info.color),
                description: data.technical_info.description,
                max_width: data.technical_info.max_width,
                max_height: data.technical_info.max_height,
                max_area: data.technical_info.max_area,
            }
        }
    } catch (error) {
        console.error('Error fetching data:', error);

        return null;
    }
};

// Categories
export async function fetchCategories(): Promise<ICategory[]> {
    try {
        const response = await fetch(`${BASE_URL}cms/jaluji/categories`);
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
