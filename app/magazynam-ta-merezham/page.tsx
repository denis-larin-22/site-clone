import type { Metadata } from "next";
import Header from "../components/ui/Header";
import RetailNetworksPage from "./components/ready-solutions/RetailNetworksPage";
import Footer from "../components/ui/Footer";

export const metadata: Metadata = {
  title: "Магазинам та торговельним мережам | PiramidSpace",
  description: "Готові ролети День-Ніч Gekko для будмаркетів: стандартні розміри, стенди та автоматичне поповнення залишків.",
};

export default function RetailPage() {
  return (
    <>
      <Header />
      <RetailNetworksPage />
      <Footer />
    </>
  );
}
