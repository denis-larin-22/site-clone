import { Metadata } from "next";
import MainPage from "./(main)/MainPage";
import Footer from "./components/ui/Footer";
import Header from "./components/ui/Header";
import { metaTagsValues } from "./lib/seo/meta-tags-values";
import AppSection from "./(main)/AppSection";
import AppLink from "./components/ui/appLink/AppLink";

export const metadata: Metadata = {
  title: 'Piramidspace | Пірамідспейс | Головна ',
  description: '🔵 Автоматизуй продажі жалюзі — працюй із виробником. Дізнайся більше просто зараз. 🔽',
  keywords: [metaTagsValues.shop_name, 'Піраміда', 'Портал - жалюзі', 'горизонтальні', 'жалюзі вертикальні', 'тканинні ролети', 'рулонні штори', 'комплектуючі для жалюзі', 'кабінет дилера', 'жалюзи для дилерів', 'виробник жалюзі'],
  openGraph: {
    title: 'Piramidspace | Пірамідспейс | Головна',
    description: '🔵 Автоматизуй продажі жалюзі — працюй із виробником. Дізнайся більше просто зараз. 🔽',
    type: 'website',
    locale: 'uk_UA',
    url: 'https://piramidspace.com/',
    siteName: 'Piramidspace | Пірамідспейс ' + metaTagsValues.shop_name,
    phoneNumbers: metaTagsValues.config_telephone
  }
};

export default function Home() {
  return (
    <>
      {/* <Header /> */}
      <MainPage />
      <AppLink />
      {/* <AppSection /> */}
      {/* <Footer /> */}
    </>
  );
}
