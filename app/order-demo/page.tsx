import { Metadata } from "next";
import Footer from "../components/ui/Footer";
import Header from "../components/ui/Header";
import OrderDemo from "./OrderDemo";
import { metaTagsValues } from "../lib/seo/meta-tags-values";

export const metadata: Metadata = {
    title: 'Замовити демо | Piramid | Пирамида ТПК',
    description: 'Замовити демо, ' + metaTagsValues.shop_name,
    openGraph: {
        title: 'Замовити демо | Piramid',
        description: 'Замовити демо, Пирамида ТПК',
        type: 'website',
        locale: 'uk_UA',
        url: 'https://piramidspace.com/',
        siteName: 'Piramid | Пирамида ТПК',
        phoneNumbers: metaTagsValues.config_telephone
    }
};

export default function OrderDemoPage() {
    return (
        <div className="min-h-dvh overflow-hidden flex flex-col justify-between ">
            <Header />
            <OrderDemo />
            <Footer />
        </div>
    )
}