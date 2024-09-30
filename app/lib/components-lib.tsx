import HeroSection from '../components/main-page/HeroSection';
import VideoBanner from '../components/main-page/VideoBanner';
import TabsSection from '../components/main-page/TabsSection';
import AccordionSection from '../components/main-page/AccordionSection';
import PromoBanner from '../components/main-page/PromoBanner';
import CarouselSection from '../components/main-page/CarouselSection';
import BusinessPromo from '../components/main-page/BusinessPromo';
import InfoSection from '../components/main-page/InfoSection';

export interface IComponentItem {
    componentName: string
    component: JSX.Element
}

export interface IComponentsLib {
    [key: string]: IComponentItem
}

// Library of all existing components for the main page
export const mainComponentsList: IComponentsLib = {
    'hero-section': {
        componentName: 'Hero Section',
        component: <HeroSection />
    },
    'video-banner': {
        componentName: 'Video Banner',
        component: <VideoBanner />
    },
    'tabs-section': {
        componentName: 'Tabs Section',
        component: <TabsSection />
    },
    'accordion-section': {
        componentName: 'Accordion Section',
        component: <AccordionSection />
    },
    'promo-banner': {
        componentName: 'Promo Banner',
        component: <PromoBanner />
    },
    'info-section': {
        componentName: 'Info Section',
        component: <InfoSection />
    },
    'carousel-section': {
        componentName: 'Carousel Section',
        component: <CarouselSection />
    },
    'business-promo': {
        componentName: 'Business Promo',
        component: <BusinessPromo />
    }
}
