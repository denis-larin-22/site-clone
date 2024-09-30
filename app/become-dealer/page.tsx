import { Metadata } from "next";
import Footer from "../components/ui/Footer";
import Header from "../components/ui/Header";
import BecomeDealer from "./BecomeDealer";

export const metadata: Metadata = {
    title: 'Стати дилером | Piramid | Пирамида ТПК',
    description: 'Стати дилером, Пирамида ТПК',
    openGraph: {
        title: 'Стати дилером | Piramid',
        description: 'Стати дилером, Пирамида ТПК',
        type: 'website',
        locale: 'uk_UA',
        url: '',
        siteName: 'Piramid | Пирамида ТПК'
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