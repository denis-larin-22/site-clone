'use client'

import { useEffect, useState } from "react";
import { getAccordionSectionContent, IAccordionSectionContent } from "@/app/lib/contentful/contentful-api";
import { AccordionSectionSkeleton } from "../ui/skeletons/AccordionSectionSkeleton";
import { Accordion } from "../ui/Accordion";

export default function AccordionSection() {
    const [componentContent, setComponentContent] = useState<IAccordionSectionContent | undefined | null>(null);

    useEffect(() => {
        async function getContent() {
            const content = await getAccordionSectionContent();

            setComponentContent(content);
        }

        getContent();
    }, [])

    if (componentContent === null) {
        return <AccordionSectionSkeleton />
    } else if (componentContent === undefined) {
        return null;
    } else {
        return (
            <Accordion componentContent={componentContent} />
        )
    }
}


