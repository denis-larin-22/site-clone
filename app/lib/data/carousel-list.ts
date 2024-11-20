import { CarouselList } from "../contentful/contentful-api";

export const defaultCarouselList: CarouselList = [
    {
        title: "День-ніч",
        id: 1,
        image: {
            alt: "День-ніч",
            src: "/assets/images/day-night.webp"
        }
    },
    {
        title: "Рулонні штори",
        id: 2,
        image: {
            alt: "Рулонні штори",
            src: "/assets/images/roller-blinds.webp"
        }
    },
    {
        title: "Горизонтальні жалюзі",
        id: 3,
        image: {
            alt: "Горизонтальні жалюзі",
            src: "/assets/images/horizontal-blinds.webp"
        }
    },
    {
        title: "Вертикальні жалюзі",
        id: 4,
        image: {
            alt: "Вертикальні жалюзі",
            src: "/assets/images/vertical-blinds.webp"
        }
    }
];