import Catalog from "@/app/components/catalog-page/Catalog";
import { fetchCategories } from "@/app/lib/api/apiRequests";
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
    };

    return {
        title: activeCategory.name,
        description: `Товари з категорії ${activeCategory.name}` || `Товари з каталогу Piramid`,
        openGraph: {
            title: '🛒' + activeCategory.name + '⬇️',
            description: "Ознайомтесь з найкращими пропозиціями цієї категорії і обирайте те, що створене саме для вас. 🌟",
            url: `https://piramidspace.com/catalog/${params.categoryId}/category`,
            type: 'website',
            locale: 'uk_UA',
            siteName: '🔵 Piramidspace | Пирамида ТПК ' + metaTagsValues.shop_name,
            // TO_DO
            // images: [
            //     {
            //         url: product.images_url[0] || '',
            //         width: 630,
            //         height: 630,
            //         alt: product.name,
            //     },
            // ],
            phoneNumbers: metaTagsValues.config_telephone,
        },
    };
}

function CatalogItems({ params }: { params: { categoryId: string } }) {
    const activeCategoryId = params.categoryId;

    return (
        <>
            <Catalog activeCategoryId={activeCategoryId} />
        </>
    )
}

export default CatalogItems;