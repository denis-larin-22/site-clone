import { Metadata } from "next";
import MainPage from "./(main)/MainPage";
import Footer from "./components/ui/Footer";
import Header from "./components/ui/Header";

export const metadata: Metadata = {
  title: 'Piramid | Пирамида ТПК | Головна',
  description: 'Жалюзі Харків, рулонні штори  ТВК Піраміда - Зручна компанія. Київ, Харків, Львів, Полтава, Миколаїв, Дніпро, Вінниця',
  keywords: ['Піраміда', 'Портал - жалюзі', 'горизонтальні', 'жалюзі вертикальні', 'тканинні ролети', 'рулонні штори', 'комплектуючі для жалюзі', 'кабінет дилера', 'жалюзи для дилерів', 'виробник жалюзі'],
  openGraph: {
    title: 'Piramid | Пирамида ТПК | Головна',
    description: 'Жалюзі Харків, рулонні штори  ТВК Піраміда - Зручна компанія. Київ, Харків, Львів, Полтава, Миколаїв, Дніпро, Вінниця',
    type: 'website',
    locale: 'uk_UA',
    url: '',
    siteName: 'Piramid | Пирамида ТПК'
  }
};

export default function Home() {
  return (
    <>
      <Header />
      <MainPage />
      <Footer />
    </>
  );
}
