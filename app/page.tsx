import { Metadata } from "next";
import MainPage from "./(main)/MainPage";
import Footer from "./components/ui/Footer";
import Header from "./components/ui/Header";
import { metaTagsValues } from "./lib/seo/meta-tags-values";
import ChatSupport from "./components/ui/ChatSupport";
import FeedbackForm from "./components/ui/feedback/FeedbackForm";

export const metadata: Metadata = {
  title: 'Piramid | Пирамида ТПК | Головна ',
  description: 'Жалюзі Харків, рулонні штори  ТВК Піраміда - Зручна компанія. Київ, Харків, Львів, Полтава, Миколаїв, Дніпро, Вінниця',
  keywords: [metaTagsValues.shop_name, 'Піраміда', 'Портал - жалюзі', 'горизонтальні', 'жалюзі вертикальні', 'тканинні ролети', 'рулонні штори', 'комплектуючі для жалюзі', 'кабінет дилера', 'жалюзи для дилерів', 'виробник жалюзі'],
  openGraph: {
    title: 'Piramid | Пирамида ТПК | Головна',
    description: 'Жалюзі Харків, рулонні штори  ТВК Піраміда - Зручна компанія. Київ, Харків, Львів, Полтава, Миколаїв, Дніпро, Вінниця',
    type: 'website',
    locale: 'uk_UA',
    url: 'https://piramidspace.com/',
    siteName: 'Piramid | Пирамида ТПК ' + metaTagsValues.shop_name,
    phoneNumbers: metaTagsValues.config_telephone
  }
};

export default function Home() {
  return (
    <>
      <Header />
      <MainPage />
      <Footer />

      <FeedbackForm />
      <ChatSupport />
    </>
  );
}
