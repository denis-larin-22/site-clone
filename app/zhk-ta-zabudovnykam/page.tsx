import type { Metadata } from "next";
import Header from "../components/ui/Header";
import Footer from "../components/ui/Footer";
import DevelopersPage from "./components/DevelopersPage";


export const metadata: Metadata = {
    title: "Рішення для ЖК та забудовників | PiramidSpace",
    description:
        "Серійні системи День-Ніч «Світлий льон» із кріпленням Gekko для ЖК та забудовників.",
};

export default function Page() {
    return (
        <>
            <Header />
            <DevelopersPage />
            <Footer />
        </>
    );
}