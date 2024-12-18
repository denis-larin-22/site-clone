import Catalog from "@/app/components/catalog-page/Catalog";

function CatalogItems({ params }: { params: { categoryId: string } }) {
    const activeCategoryId = params.categoryId;

    return <Catalog activeCategoryId={activeCategoryId} />
};

export default CatalogItems;