import Catalog from "@/app/components/catalog-page/Catalog";
import { fetchCategories, SYSTEM_SALE_CATEGORY_ID, SYSTEM_TOP_CATEGORY_ID } from "@/app/lib/api/apiRequests";
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
            title: "Категорію не знайдено",
            description: "На жаль, такої категорії не знайдено.",
        };
    }

    const imageUrl = getCategoryImagePath(activeCategory.id);
    const pageUrl = `https://piramidspace.com/catalog/${params.categoryId}/category`;
    const description =
        "Ознайомтесь з найкращими пропозиціями цієї категорії і обирайте те, що створене саме для вас. 🌟";

    return {
        title: `🛍️ ${activeCategory.name} ⬇️`,
        description: `Товари з категорії ${activeCategory.name}`,
        openGraph: {
            title: `🛍️ ${activeCategory.name} ⬇️`,
            description,
            url: pageUrl,
            type: "website",
            locale: "uk_UA",
            siteName: `Piramidspace | Пирамида ТПК ${metaTagsValues.shop_name}`,
            images: [
                {
                    url: imageUrl,
                    width: 1200, // рекомендуемый размер
                    height: 630,
                    alt: activeCategory.name,
                },
            ],
        },
        twitter: {
            card: "summary_large_image", // заставляем Telegram брать большое превью
            title: `🛍️ ${activeCategory.name} ⬇️`,
            description,
            images: [imageUrl],
        },
    };
}

function getCategoryImagePath(category: number) {
    const path = "https://piramidspace.com/assets/images/";

    switch (category) {
        case SYSTEM_TOP_CATEGORY_ID:
            return path + "meta-images/category-top.webp";
        case SYSTEM_SALE_CATEGORY_ID:
            return path + "meta-images/category-sale.webp";
        case 1:
            return path + "category-day-night.webp";
        case 2:
            return path + "category-roller-blinds.webp";
        case 3:
            return path + "category-horizontal-blinds.webp";
        case 4:
            return path + "category-vertical-blinds.webp";
        case 5:
            return path + "category-components.webp";
        case 6:
            return path + "category-promotional-items.webp";
        default:
            return path + "category-default-item.webp";
    }
}

function CatalogItems({ params }: { params: { categoryId: string } }) {
    return <Catalog activeCategoryId={params.categoryId} />;
}

export default CatalogItems;
