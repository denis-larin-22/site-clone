import { Metadata } from "next";
import Footer from "../components/ui/Footer";
import Header from "../components/ui/Header";
import BecomeDealer from "./BecomeDealer";
import { metaTagsValues } from "../lib/seo/meta-tags-values";

export const metadata: Metadata = {
    title: 'Стати дилером | Piramid | Пирамида ТПК',
    description: 'Стати дилером, ' + metaTagsValues.shop_name,
    openGraph: {
        title: 'Стати дилером | Piramid',
        description: 'Стати дилером, Пирамида ТПК',
        type: 'website',
        locale: 'uk_UA',
        url: 'https://piramidspace.com/',
        siteName: 'Piramid | Пирамида ТПК',
        phoneNumbers: metaTagsValues.config_telephone
    }
};

export default function BecomeDealerPage() {
    return (
        <div className="min-h-dvh overflow-hidden flex flex-col justify-between ">
            <Header />
            <BecomeDealer />
            <Footer />
        </div>
    )
};