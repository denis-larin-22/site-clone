import Catalog from "@/app/components/catalog-page/Catalog";
import { metaTagsValues } from "@/app/lib/seo/meta-tags-values";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Каталог | Piramid',
    description: `Ці товари можна замовити через кошик або зателефонувавши на номер ${metaTagsValues.config_telephone}. Жалюзі Харків, рулонні штори  ТВК Піраміда - Зручна компанія. Київ, Харків, Львів, Полтава, Миколаїв, Дніпро, Вінниця`,
    keywords: [metaTagsValues.shop_name, 'Піраміда', 'Портал - жалюзі', 'горизонтальні', 'жалюзі вертикальні', 'тканинні ролети', 'рулонні штори', 'комплектуючі для жалюзі', 'кабінет дилера', 'жалюзи для дилерів', 'виробник жалюзі'],
    openGraph: {
        title: 'Каталог | Piramid | Пирамида ТПК',
        description: 'Жалюзі Харків, рулонні штори  ТВК Піраміда - Зручна компанія. Київ, Харків, Львів, Полтава, Миколаїв, Дніпро, Вінниця',
        type: 'website',
        locale: 'uk_UA',
        url: 'https://piramidspace.com/catalog',
        siteName: 'Piramid | Пирамида ТПК ' + metaTagsValues.shop_name,
        phoneNumbers: metaTagsValues.config_telephone
    }
};

function CatalogItems({ params }: { params: { categoryId: string } }) {
    const activeCategoryId = params.categoryId;

    return (
        <>
            <Catalog activeCategoryId={activeCategoryId} />
        </>
    )
}

export default CatalogItems;