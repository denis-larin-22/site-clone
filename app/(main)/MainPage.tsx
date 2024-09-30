import { revalidatePath } from "next/cache";
import { IComponentItem, mainComponentsList } from "../lib/components-lib";
import { getMainPageComponentOrder } from "../lib/contentful/contentful-api";

async function getComponentListForRender(): Promise<(IComponentItem | undefined)[]> {
    const mainPageComponentOrder = await getMainPageComponentOrder();

    if (mainPageComponentOrder === null) {
        return [];
    } else {
        const result = mainPageComponentOrder.map((item) => {
            const componentOrUndefined = mainComponentsList[item.componentId];
            if (!componentOrUndefined) return

            return componentOrUndefined;
        })

        return result;
    }
}

export default async function MainPage() {
    // !!! RESET CASH !!! //
    revalidatePath('/', "page"); // Request cache reset
    const pageComponentOrder = await getComponentListForRender();

    if (!pageComponentOrder.length) {
        return (
            <main className="h-screen overflow-hidden flex items-center justify-center">
                <p className="text-[#A2A2A8] text-4xl">😔 Щось пішло не так...</p>
            </main>
        )
    } else {
        return (
            <main className="overflow-hidden">
                {pageComponentOrder.map((component, index) => {
                    if (!component) return null;

                    return <div key={index}>{component.component}</div>;
                })}
            </main>
        )
    }
}