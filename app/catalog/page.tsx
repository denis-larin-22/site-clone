import { Metadata } from "next";
import Catalog from "../components/catalog-page/Catalog";

export const metadata: Metadata = {
    title: 'Каталог | Piramid',
    description: 'Жалюзі Харків, рулонні штори  ТВК Піраміда - Зручна компанія. Київ, Харків, Львів, Полтава, Миколаїв, Дніпро, Вінниця',
    keywords: ['Піраміда', 'Портал - жалюзі', 'горизонтальні', 'жалюзі вертикальні', 'тканинні ролети', 'рулонні штори', 'комплектуючі для жалюзі', 'кабінет дилера', 'жалюзи для дилерів', 'виробник жалюзі'],
    openGraph: {
        title: 'Каталог | Piramid | Пирамида ТПК',
        description: 'Жалюзі Харків, рулонні штори  ТВК Піраміда - Зручна компанія. Київ, Харків, Львів, Полтава, Миколаїв, Дніпро, Вінниця',
        type: 'website',
        locale: 'uk_UA',
        url: '',
        siteName: 'Piramid | Пирамида ТПК'
    }
};

export default function CatalogPage() {
    return (
        <section className="relative h-dvh w-screen bg-t-pale flex flex-row overflow-hidden">
            <Catalog />
        </section>
    )
};