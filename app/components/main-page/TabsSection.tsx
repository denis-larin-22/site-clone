'use client'

import { useState, useEffect } from "react";
import { getTabsSectionContent, ITabsSectionContent } from "@/app/lib/contentful/contentful-api";
import Loader from "../ui/Loader";
import { Tabs } from "../ui/Tabs";

export default function TabsSection() {
    const [componentContent, setComponentContent] = useState<ITabsSectionContent | undefined | null>(null);

    useEffect(() => {
        async function getContent() {
            const content = await getTabsSectionContent();

            setComponentContent(content);
        }

        getContent();
    }, [])

    if (componentContent === null) {
        return (
            <section className="container min-h-[660px] flex flex-col items-center">
                <Loader />
            </section >
        )
    } else if (componentContent === undefined) {
        return null;
    } else {
        return (
            <Tabs componentContent={componentContent} />
        )
    }
};
