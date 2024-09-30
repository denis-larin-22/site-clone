import { Metadata } from "next";
import Footer from "../components/ui/Footer";
import Header from "../components/ui/Header";
import OrderDemo from "./OrderDemo";

export const metadata: Metadata = {
    title: 'Замовити демо | Piramid | Пирамида ТПК',
    description: 'Замовити демо, Пирамида ТПК',
    openGraph: {
        title: 'Замовити демо | Piramid',
        description: 'Замовити демо, Пирамида ТПК',
        type: 'website',
        locale: 'uk_UA',
        url: '',
        siteName: 'Piramid | Пирамида ТПК'
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