import CatalogItem from "@/app/components/catalog-page/CatalogItem";
import { fetchProductItem } from "@/app/lib/api/apiRequests";
import { metaTagsValues } from "@/app/lib/seo/meta-tags-values";
import { Metadata } from "next";

type Props = {
    params: {
        itemId: string;
    };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const product = await fetchProductItem(params.itemId);

    if (!product) {
        return {
            title: 'Товар не знайдено',
            description: 'На жаль, такий товар відсутній.',
        };
    }

    const descriptionTitle = product.category.name === null ? '' : `🛍️ ${product.category.name} `;
    const dimensions = product.technical_info.max_width === null || product.technical_info.max_height === null ?
        ''
        :
        ` 📐${Math.trunc(product.technical_info.max_width)}x${Math.trunc(product.technical_info.max_height)} `;
    const info = product.technical_info.description === null ? '' : `📄 ${product.technical_info.description}`;

    return {
        title: product.name,
        description: product.technical_info.description || `Товар з каталогу Piramid`,
        openGraph: {
            title: '✨' + product.name + '👇',
            description: descriptionTitle + dimensions + info,
            url: `https://piramidspace.com/catalog/${params.itemId}`,
            type: 'website',
            locale: 'uk_UA',
            siteName: '🔵 Piramidspace | Пірамідспейс ' + metaTagsValues.shop_name,
            images: [
                {
                    url: product.images_url[0] || '',
                    width: 630,
                    height: 630,
                    alt: product.name,
                },
            ],
            phoneNumbers: metaTagsValues.config_telephone,
        },
    };
}

function CatalogItemPage({ params }: Props) {
    return <CatalogItem itemId={params.itemId} />;
}

export default CatalogItemPage;