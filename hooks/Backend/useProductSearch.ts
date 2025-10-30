// hooks/useProductSearch.ts
import { useCallback } from 'react';
import { ProductData } from '@/interfaces/productDataProps';
import { useGlobalSearch } from './useGlobalSearch';

// ✅ PRODUCT-SPECIFIC CONFIG
const productSearchConfig = {
  searchFields: ['Nama', 'Deskripsi', 'Pemilik'] as (keyof ProductData)[],
};

// ✅ CUSTOM FILTER untuk product
const productFilterFn = (product: ProductData, query: string): boolean => {
  const lowercasedQuery = query.toLowerCase();

  return (
    product.Nama.toLowerCase().includes(lowercasedQuery) ||
    (product.Deskripsi &&
      product.Deskripsi.toLowerCase().includes(lowercasedQuery)) ||
    product.Pemilik.toLowerCase().includes(lowercasedQuery)
  );
};

export function useProductSearch(
  products: ProductData[] = [],
  options?: {
    enabled?: boolean;
    customFilter?: (product: ProductData, query: string) => boolean;
    autoClearOnUnmount?: boolean; // ✅ PASS KE useGlobalSearch
  }
) {
  const config = {
    ...productSearchConfig,
    filterFn: options?.customFilter || productFilterFn,
    enabled: options?.enabled ?? true,
    autoClearOnUnmount: options?.autoClearOnUnmount ?? false, // ✅ PASS OPTION INI
  };

  const search = useGlobalSearch(products, config);

  // ✅ PRODUCT-SPECIFIC EXTENSIONS
  const searchByPriceRange = useCallback(
    (minPrice: number, maxPrice: number) => {
      return products.filter(
        (product) => product.Harga >= minPrice && product.Harga <= maxPrice
      );
    },
    [products]
  );

  const searchByStatus = useCallback(
    (status: string) => {
      return products.filter(
        (product) => product.Status.toLowerCase() === status.toLowerCase()
      );
    },
    [products]
  );

  return {
    ...search,
    filteredProducts: search.filteredData,
    searchByPriceRange,
    searchByStatus,
  };
}
