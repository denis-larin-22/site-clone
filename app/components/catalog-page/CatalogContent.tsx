'use client'

import { Suspense } from 'react';
import Catalog from './Catalog';

export default function CatalogContent() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Catalog />
        </Suspense>
    );
}
