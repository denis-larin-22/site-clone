import { ArrowRight, Building2, Calculator, CheckCircle2, Clock3, Factory, Headphones, Menu, PackageCheck, ShieldCheck, ShoppingCart, UserRound } from "lucide-react";
import AppSection from "./AppSection";

const solutions = [
    { icon: UserRound, title: "Дилерам", accent: "mint", points: ["Онлайн-кабінет дилера", "Швидке оформлення замовлень", "Ціни, бонуси та історія покупок", "Підтримка і навчання"] },
    { icon: Building2, title: "Готелям та забудовникам", accent: "blue", points: ["Комплектація об’єктів", "Індивідуальні рішення", "Маркування та постачання", "Доставка на об’єкт"] },
    { icon: ShoppingCart, title: "Магазинам та мережам", accent: "violet", points: ["Готові серійні вироби", "Популярні розміри та кольори", "Привабливе пакування", "Гуртові умови співпраці"] },
];
const products = [["День–ніч", "alternating"], ["Рулонні штори", "solid"], ["Горизонтальні жалюзі", "horizontal"], ["Вертикальні жалюзі", "vertical"], ["Готові вироби", "pack"]];

function Logo() { return <span className="brand"><img src="/piramid-logo.svg" alt="Piramid Space" /><span><b>piramid</b><small>SPACE</small></span></span> }

export default function MainPage() {
    return <main>
        <section className="hero" id="top">
            <header className="site-header wrap">
                <a href="#top" aria-label="Piramid Space — на головну"><Logo /></a>
                <nav aria-label="Головна навігація"><a href="/catalog/102/category">Каталог</a><a href="#solutions">Готові рішення</a><a href="/become-dealer">Дилерам</a><a href="#about">Про компанію</a><a href="#contacts">Контакти</a></nav>
                <a className="dealer-button" href="https://piramid.com.ua/formazakazajaluzy.html">Кабінет дилера <UserRound size={17} /></a><button className="menu-button" aria-label="Меню"><Menu /></button>
            </header>
            <div className="hero-grid wrap">
                <div className="hero-copy"><span className="eyebrow">Українська технологічна фабрика комфорту</span><h1>Жалюзі та рулонні штори<br /><em>для бізнесу й дому</em></h1><p>Виробляємо на замовлення та створюємо готові рішення для дилерів, об’єктів і торговельних мереж.</p><div className="hero-actions"><a className="primary-button" href="/become-dealer"><Calculator size={18} /> Замовити розрахунок</a><a className="text-button" href="/catalog/102/category">Переглянути каталог <ArrowRight size={18} /></a></div></div>
                <div className="hero-visual" role="img" aria-label="Сучасний інтер’єр із жалюзі день-ніч"><div className="visual-note"><span>Власне виробництво</span><b>в Україні</b></div></div>
            </div>
            <div className="benefit-strip wrap" id="about">
                <div><Factory /><span>Власне виробництво<br /><b>в Україні</b></span></div><div><ShieldCheck /><span>Стабільна якість<br /><b>та гарантія</b></span></div><div><Clock3 /><span>Короткі терміни<br /><b>виготовлення</b></span></div><div><PackageCheck /><span>Комплектація<br /><b>під ключ</b></span></div><div><Headphones /><span>Підтримка на всіх<br /><b>етапах співпраці</b></span></div>
            </div>
        </section>
        <section className="content-section wrap" id="solutions"><div className="section-heading"><span className="eyebrow">Співпраця</span><h2>Рішення для різних завдань</h2><p>Оберіть свій напрям — ми запропонуємо найкраще рішення.</p></div><div className="solutions-grid">{solutions.map(({ icon: Icon, title, points, accent }) => <article className={`solution-card ${accent}`} key={title}><Icon className="card-icon" /><h3>{title}</h3><ul>{points.map(point => <li key={point}><CheckCircle2 />{point}</li>)}</ul><a href="#contacts">Дізнатися більше <ArrowRight /></a></article>)}</div></section>
        <section className="products-section" id="products"><div className="wrap"><div className="section-heading split"><div><span className="eyebrow">Асортимент</span><h2>Наші продукти</h2></div><a className="text-button" href="#contacts">Отримати каталог <ArrowRight /></a></div><div className="products-grid">{products.map(([name, type]) => <article className="product-card" key={name}><div className={`product-art ${type}`}><span /></div><h3>{name}</h3></article>)}</div></div></section>
        <section className="dealer-section wrap" id="dealer"><div className="dealer-copy"><span className="eyebrow">Технологічність у роботі</span><h2>Перший в Україні кабінет<br />для дилерів від виробника</h2><p>Усі наші дилери працюють через єдиний онлайн-кабінет: оформлюють замовлення, бачать ціни, бонуси, оплату та статус виготовлення.</p><a className="primary-button" href="#contacts">Стати дилером <ArrowRight size={18} /></a></div><div className="dashboard-card"><div className="dash-top"><span /><span /><span /><b>Кабінет дилера</b></div><div className="dash-body"><aside><i /><i /><i /><i /></aside><div className="dash-main"><b>Мої замовлення</b><div className="dash-stats"><span /><span /><span /></div><div className="dash-table"><i /><i /><i /><i /></div></div></div></div></section>
        <section className="facts-section"><div className="wrap facts-grid"><div><b>10+</b><span>років досвіду<br />у виробництві</span></div><div><b>100%</b><span>дилерів працюють<br />через онлайн-кабінет</span></div><div><b>24/7</b><span>кабінет приймає<br />замовлення</span></div><div><b>2 роки</b><span>гарантії на<br />вироби</span></div></div></section>
        <section className="cta-section" id="contacts"><div className="wrap cta-inner"><div><span>Є проєкт або потрібен розрахунок?</span><p>Надішліть розміри або технічне завдання — ми запропонуємо рішення та розрахуємо вартість.</p></div><a className="white-button" href="/become-dealer"><Calculator /> Отримати розрахунок</a></div></section>
        <AppSection />
        <footer className="footer wrap"><Logo /><p>Україна, Харківська обл., м. Златопіль</p><div className="footer-contacts"><a href="tel:+380959373583">095 937 35 83</a><a href="https://www.facebook.com/piramidjalusi/">Facebook</a><a href="https://www.instagram.com/piramid.com.ua/">Instagram</a></div></footer>
    </main>
}




// OLD VERSION
// import { revalidatePath } from "next/cache";
// import { IComponentItem, mainComponentsList } from "../lib/components-lib";
// import { getMainPageComponentOrder } from "../lib/contentful/contentful-api";

// async function getComponentListForRender(): Promise<(IComponentItem | undefined)[]> {
//     const mainPageComponentOrder = await getMainPageComponentOrder();

//     if (mainPageComponentOrder === null) {
//         return [];
//     } else {
//         const result = mainPageComponentOrder.map((item) => {
//             const componentOrUndefined = mainComponentsList[item.componentId];
//             if (!componentOrUndefined) return

//             return componentOrUndefined;
//         })

//         return result;
//     }
// }

// export default async function MainPage() {
//     // !!! RESET CASH !!! //
//     revalidatePath('/', "page"); // Request cache reset
//     const pageComponentOrder = await getComponentListForRender();

//     if (!pageComponentOrder.length) {
//         return (
//             <main className="h-screen overflow-hidden flex items-center justify-center">
//                 <p className="text-[#A2A2A8] text-4xl">😔 Щось пішло не так...</p>
//             </main>
//         )
//     } else {
//         return (
//             <main className="overflow-hidden">
//                 {pageComponentOrder.map((component, index) => {
//                     if (!component) return null;

//                     return <div key={index}>{component.component}</div>;
//                 })}
//             </main>
//         )
//     }
// }