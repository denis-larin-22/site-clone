'use client'

import Catalog from './Catalog';
import { useSearchParams } from 'next/navigation';

export default function CatalogContent() {
    const searchParams = useSearchParams();
    const searchCategoryParamValue = searchParams.get('category');
    const userChosenCategoryId = searchCategoryParamValue === null ? null : +searchCategoryParamValue;

    return <Catalog userChosenCategoryId={userChosenCategoryId} />;
}
