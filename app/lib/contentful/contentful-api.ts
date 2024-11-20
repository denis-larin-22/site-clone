'use server'

import { client } from "./client";

interface IImage {
    alt: string,
    src: string
}

// GET MAIN PAGE COMPONENTS LIST FOR RENDERING
interface IComponentOrderItem {
    componentName: string,
    componentId: string
}

export async function getMainPageComponentOrder(): Promise<IComponentOrderItem[] | null> {
    const MAIN_PAGE_COMPONENT_ORDER_ID = "mainPageComponentOrder";

    try {
        const componentOrderObject = await client.getEntries({ content_type: MAIN_PAGE_COMPONENT_ORDER_ID });

        if (!componentOrderObject || !componentOrderObject.items || componentOrderObject.items.length === 0) {
            throw new Error("No items found for the given content type");
        }

        const componentOrderList = componentOrderObject.items[0].fields.componentsList.map((item: any) => {
            if (!item.fields.name || !item.fields.id) {
                throw new Error("Missing fields in component item");
            }
            return {
                componentName: item.fields.name,
                componentId: item.fields.id
            };
        });

        return componentOrderList;
    } catch (error) {
        console.error("Error fetching main page component order:", error);
        return null; // Return an empty array in case of error
    }
}

// GET HERO SECTION CONTENT
export interface IHeroSectionContent {
    staticText: string,
    typewritingText: string[]
}

export async function getHeroSectionContent(): Promise<IHeroSectionContent | undefined> {
    const CONTENT_HERO_SECTION = "mainPageHeroSection";
    const TEXT_SEPARATOR = " / ";

    try {
        const componentContent = await client.getEntries({ content_type: CONTENT_HERO_SECTION });

        if (!componentContent || !componentContent.items || componentContent.items.length === 0) {
            console.error("No items found for the given content type");
            return undefined;
        }

        return {
            staticText: componentContent.items[0].fields.staticText as string,
            typewritingText: componentContent.items[0].fields.typewritingText.split(TEXT_SEPARATOR) as string[]
        }

    } catch (error) {
        console.log(error);
        return undefined;
    }
}

// GET TABS SECTION CONTENT
export interface ITabItem {
    tabTitle: string,
    tabImage: IImage,
    subtitlesList: Array<{
        title: string,
        text: string,
        titleIcon: IImage
    }>
}

export type TabsList = ITabItem[];

export interface ITabsSectionContent {
    title: string,
    tabsList: TabsList
}

export async function getTabsSectionContent(): Promise<ITabsSectionContent | undefined> {
    const CONTENT_TABS_SECTION = "mainPageTabSection";

    try {
        const componentContent = await client.getEntries({
            content_type: CONTENT_TABS_SECTION,
            include: 2 //specify the number of levels of related records to include in the response from Contentful
        });

        if (!componentContent || !componentContent.items || componentContent.items.length === 0) {
            console.error("No items found for the given content type");
            return undefined;
        }

        const result: ITabsSectionContent = {
            title: componentContent.items[0].fields.title,
            tabsList: componentContent.items[0].fields.tabsList.map((tabItem: any) => {
                return {
                    tabTitle: tabItem.fields.tabTitle,
                    tabImage: {
                        alt: tabItem.fields.tabImage.fields.title,
                        src: `https:${tabItem.fields.tabImage.fields.file.url}`
                    },
                    subtitlesList: tabItem.fields.subtitlesList.map((subtitleItem: any) => ({
                        title: subtitleItem.fields.title,
                        text: subtitleItem.fields.text,
                        titleIcon: {
                            alt: subtitleItem.fields.titleIcon.fields.title,
                            src: `https:${subtitleItem.fields.titleIcon.fields.file.url}`
                        }
                    }))
                };
            })
        };

        return result;

    } catch (error) {
        console.log(error);
        return undefined;
    }
}

// GET ACCORDION SECTION CONTENT
export interface IAccordionItem {
    title: string,
    text: string,
    image: IImage
}

export type AccordionList = Array<IAccordionItem>;

export interface IAccordionSectionContent {
    title: string,
    text: string,
    accordionList: AccordionList
}

export async function getAccordionSectionContent(): Promise<IAccordionSectionContent | undefined> {
    const CONTENT_ACCORDION_SECTION = "mainPageAccordionSection";

    try {
        const componentContent = await client.getEntries({
            content_type: CONTENT_ACCORDION_SECTION,
        });

        if (!componentContent || !componentContent.items || componentContent.items.length === 0) {
            console.error("No items found for the given content type");
            return undefined;
        }

        const result = {
            title: componentContent.items[0].fields.title,
            text: componentContent.items[0].fields.text,
            accordionList: componentContent.items[0].fields.accordionList.map((accordionItem: any) => ({
                title: accordionItem.fields.title,
                text: accordionItem.fields.text,
                image: {
                    alt: accordionItem.fields.image.fields.title,
                    src: `https:${accordionItem.fields.image.fields.file.url}`
                }
            })),
        };

        return result;

    } catch (error) {
        console.log(error);
        return undefined;
    }
}

// GET PROMO BANNER CONTENT
export async function getPromoBannerContent(): Promise<string | undefined> {
    const CONTENT_PROMO_BANNER = "mainPagePromoBanner";

    try {
        const componentContent = await client.getEntries({
            content_type: CONTENT_PROMO_BANNER,
        });

        if (!componentContent || !componentContent.items || componentContent.items.length === 0) {
            console.error("No items found for the given content type");
            return undefined;
        }

        const result = componentContent.items[0].fields.text;
        return result;

    } catch (error) {
        console.log(error);
        return undefined;
    }
};

// GET INFO SECTION CONTENT
export interface IInfoSubtitle {
    title: string,
    text: string
}

export type InfoSubtitleList = Array<IInfoSubtitle>;

export interface IInfoSectionContent {
    title: string,
    subtitlesList: InfoSubtitleList
}

export async function getInfoSectionContent(): Promise<IInfoSectionContent | undefined> {
    const CONTENT_INFO_SECTION = "mainPageInfoSection";

    try {
        const componentContent = await client.getEntries({
            content_type: CONTENT_INFO_SECTION,
        });

        if (!componentContent || !componentContent.items || componentContent.items.length === 0) {
            console.error("No items found for the given content type");
            return undefined;
        }

        const result = {
            title: componentContent.items[0].fields.title,
            subtitlesList: componentContent.items[0].fields.subtitlesList.map((subtitleItem: any) => ({
                title: subtitleItem.fields.title,
                text: subtitleItem.fields.text
            }))
        };

        return result;

    } catch (error) {
        console.log(error);
        return undefined;
    }
};

// GET BUSINESS PROMO CONTENT
export async function getBusinessPromoContent(): Promise<string | undefined> {
    const CONTENT_BUSINESS_PROMO = "mainPageBusinessPromo";

    try {
        const componentContent = await client.getEntries({
            content_type: CONTENT_BUSINESS_PROMO,
        });

        if (!componentContent || !componentContent.items || componentContent.items.length === 0) {
            console.error("No items found for the given content type");
            return undefined;
        }

        const result = componentContent.items[0].fields.title;
        return result;

    } catch (error) {
        console.log(error);
        return undefined;
    }
};

// GET VIDEO BANNER CONTENT
export interface IVideoBannerContent {
    videoUrl: string,
    posterUrl: string
}

export async function getVideoBannerContent(): Promise<IVideoBannerContent | undefined> {
    const CONTENT_VIDEO_BANNER = "mainPageVideoBanner";

    try {
        const componentContent = await client.getEntries({
            content_type: CONTENT_VIDEO_BANNER,
        });

        if (!componentContent || !componentContent.items || componentContent.items.length === 0) {
            console.error("No items found for the given content type");
            return undefined;
        }

        const result = {
            videoUrl: `https:${componentContent.items[0].fields.video.fields.file.url}`,
            posterUrl: `https:${componentContent.items[0].fields.poster.fields.file.url}`
        }

        return result;

    } catch (error) {
        console.log(error);
        return undefined;
    }
};

// GET CAROUSEL SECTION CONTENT
export interface ICarouselItem {
    title: string,
    id: number | string,
    image: IImage
}

export type CarouselList = ICarouselItem[];

export interface ICarouselSectionContent {
    title: string,
    carouselList: CarouselList
}

export async function getCarouselSectionContent(): Promise<ICarouselSectionContent | undefined> {
    const CONTENT_CAROUSEL_SECTION = "mainPageCarouselSection";

    try {
        const componentContent = await client.getEntries({
            content_type: CONTENT_CAROUSEL_SECTION,
        });

        if (!componentContent || !componentContent.items || componentContent.items.length === 0) {
            console.error("No items found for the given content type");
            return undefined;
        }

        const result = {
            title: componentContent.items[0].fields.title,
            carouselList: componentContent.items[0].fields.carouselList.map((carouselItem: any) => ({
                title: carouselItem.fields.title,
                id: carouselItem.fields.id,
                image: {
                    alt: carouselItem.fields.image.fields.title,
                    src: `https:${carouselItem.fields.image.fields.file.url}`
                }
            }))
        };

        return result;
    } catch (error) {
        console.log(error);
        return undefined;
    }
};

// GET FORM BECOME DEALER CONTENT
export interface IBecomeDealerContent {
    title: string,
    text: string,
    advantagesList: string[]
}

export async function getBecomeDealerContent(): Promise<IBecomeDealerContent | undefined> {
    const CONTENT_BECOME_DEALER = "formBecomeDealer";

    try {
        const componentContent = await client.getEntries({
            content_type: CONTENT_BECOME_DEALER,
        });

        if (!componentContent || !componentContent.items || componentContent.items.length === 0) {
            console.error("No items found for the given content type");
            return undefined;
        }

        const result = {
            title: componentContent.items[0].fields.title,
            text: componentContent.items[0].fields.text,
            advantagesList: componentContent.items[0].fields.advantagesList
        };
        return result;

    } catch (error) {
        console.log(error);
        return undefined;
    }
};

// GET FORM ORDER DEMO CONTENT
export interface IOrderDemoContent {
    title: string,
    text: string,
    advantagesList: string[]
}

export async function getOrderDemoContent(): Promise<IBecomeDealerContent | undefined> {
    const CONTENT_ORDER_DEMO = "formOrderDemo";

    try {
        const componentContent = await client.getEntries({
            content_type: CONTENT_ORDER_DEMO,
        });

        if (!componentContent || !componentContent.items || componentContent.items.length === 0) {
            console.error("No items found for the given content type");
            return undefined;
        }

        const result = {
            title: componentContent.items[0].fields.title,
            text: componentContent.items[0].fields.text,
            advantagesList: componentContent.items[0].fields.advantagesList
        };
        return result;

    } catch (error) {
        console.log(error);
        return undefined;
    }
};