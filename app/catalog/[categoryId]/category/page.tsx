import Catalog from "@/app/components/catalog-page/Catalog";
import {
    fetchCategories,
    SYSTEM_SALE_CATEGORY_ID,
    SYSTEM_TOP_CATEGORY_ID
} from "@/app/lib/api/apiRequests";
import { metaTagsValues } from "@/app/lib/seo/meta-tags-values";
import { Metadata } from "next";

type Props = {
    params: {
        categoryId: string;
    };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const categories = await fetchCategories();
    const activeCategory = categories.find((category) => category.id === Number(params.categoryId));

    if (!activeCategory) {
        return {
            title: 'Категорії не знайдено',
            description: 'На жаль, такої категорії не знайдено.',
        };
    }

    const imageUrl = getCategoryImagePath(activeCategory.id);

    return {
        title: activeCategory.name,
        description: `Товари з категорії ${activeCategory.name}` || `Товари з каталогу Piramid`,
        openGraph: {
            title: '🛍️ ' + activeCategory.name + ' ⬇️',
            description: "Ознайомтесь з найкращими пропозиціями цієї категорії і обирайте те, що створене саме для вас. 🌟",
            url: `https://piramidspace.com/catalog/${params.categoryId}/category`,
            type: 'website',
            locale: 'uk_UA',
            siteName: '🔵 Piramidspace | Пирамида ТПК ' + metaTagsValues.shop_name,
            images: [
                {
                    url: imageUrl,
                    width: 630,
                    height: 630,
                    alt: activeCategory.name,
                },
            ],
            phoneNumbers: metaTagsValues.config_telephone,
        },
    };
}

function getCategoryImagePath(category: number): string {
    const version = '1'; // меняй вручную при изменении изображений / версия - тригер на скидівание кеша и обновления изображения в Open Graph
    const path = 'https://piramidspace.com/assets/images/meta-images/';

    switch (category) {
        case SYSTEM_TOP_CATEGORY_ID: return path + 'top.webp?v=' + version;
        case SYSTEM_SALE_CATEGORY_ID: return path + 'sale.webp?v=' + version;
        case 1: return path + '../day-night.webp?v=' + version;
        case 2: return path + '../roller-blinds.webp?v=' + version;
        case 3: return path + '../horizontal-blinds.webp?v=' + version;
        case 4: return path + '../vertical-blinds.webp?v=' + version;
        case 5: return path + '../components.webp?v=' + version;
        case 6: return path + '../promotional-items.webp?v=' + version;
        default: return path + '../default-item.webp?v=' + version;
    }
}

function CatalogItems({ params }: { params: { categoryId: string } }) {
    const activeCategoryId = params.categoryId;

    return (
        <>
            <Catalog activeCategoryId={activeCategoryId} />
        </>
    );
}

export default CatalogItems;
