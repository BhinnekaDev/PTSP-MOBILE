// hooks/useGlobalSearch.ts
import { useState, useEffect, useMemo, useCallback } from 'react';

// ✅ SIMPLIFIED GLOBAL STATE - FIX RETURN TYPE
const createGlobalSearchState = () => {
  let query = '';
  const listeners = new Set<(query: string) => void>();

  return {
    getQuery: () => query,

    setQuery: (newQuery: string) => {
      console.log('🌍 [GlobalState] Setting query:', newQuery);
      if (query === newQuery) return;

      query = newQuery;
      // ✅ IMMEDIATE UPDATE TO ALL LISTENERS
      listeners.forEach((listener) => {
        try {
          listener(newQuery);
        } catch (error) {
          console.error('Error in search listener:', error);
        }
      });
    },

    subscribe: (listener: (query: string) => void) => {
      listeners.add(listener);

      // ✅ FIX: RETURN VOID FUNCTION, NOT BOOLEAN
      return () => {
        listeners.delete(listener);
      };
    },

    // ✅ DEBUG UTILITY
    debug: () => {
      console.log('🔍 [GlobalState] Current state:', {
        query,
        listenerCount: listeners.size,
      });
    },
  };
};

const globalSearch = createGlobalSearchState();

interface SearchConfig<T> {
  searchFields?: (keyof T)[];
  filterFn?: (item: T, query: string) => boolean;
  enabled?: boolean;
  autoClearOnUnmount?: boolean;
}

export function useGlobalSearch<T>(
  data: T[] = [],
  config: SearchConfig<T> = {
    searchFields: [],
    enabled: true,
    autoClearOnUnmount: false,
  }
) {
  const [searchQuery, setSearchQuery] = useState(globalSearch.getQuery());
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    searchFields = [],
    filterFn,
    enabled = true,
    autoClearOnUnmount = false,
  } = config;

  // ✅ DEFAULT FILTER FUNCTION
  const defaultFilterFn = useCallback(
    (item: T, query: string): boolean => {
      if (!query.trim() || searchFields.length === 0) return true;

      const lowercasedQuery = query.toLowerCase();
      return searchFields.some((field) => {
        const value = item[field];
        if (typeof value === 'string') {
          return value.toLowerCase().includes(lowercasedQuery);
        }
        return false;
      });
    },
    [searchFields]
  );

  const actualFilterFn = filterFn || defaultFilterFn;

  // ✅ GENERIC FILTERING
  const filteredData = useMemo(() => {
    if (!enabled) return data;

    try {
      if (!searchQuery.trim()) {
        return data;
      }

      return data.filter((item) => actualFilterFn(item, searchQuery));
    } catch (err) {
      setError('Failed to filter data');
      console.error('Search filter error:', err);
      return data;
    }
  }, [searchQuery, data, enabled, actualFilterFn]);

  // ✅ UPDATE SEARCH QUERY
  const updateSearchQuery = useCallback(
    (query: string) => {
      if (!enabled) return;

      try {
        setIsLoading(true);
        globalSearch.setQuery(query);
        setIsLoading(false);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Failed to update search'
        );
        setIsLoading(false);
      }
    },
    [enabled]
  );

  const clearSearch = useCallback(() => {
    console.log('🧹 [useGlobalSearch] Clearing search');
    updateSearchQuery('');
  }, [updateSearchQuery]);

  // ✅ EFFECT UNTUK SUBSCRIBE GLOBAL SEARCH - FIXED RETURN TYPE
  useEffect(() => {
    if (!enabled) return;

    const unsubscribe = globalSearch.subscribe((newQuery: string) => {
      setSearchQuery(newQuery);
    });

    // ✅ FIX: RETURN UNSUBSCRIBE FUNCTION (VOID)
    return unsubscribe;
  }, [enabled]);

  // ✅ AUTO-CLEAR EFFECT - INTEGRATED DI HOOK INI!
  useEffect(() => {
    if (autoClearOnUnmount) {
      return () => {
        console.log('🧹 [useGlobalSearch] Auto-clearing search on unmount');
        clearSearch();
      };
    }
  }, [autoClearOnUnmount, clearSearch]);

  const hasSearchResults = searchQuery.trim() !== '' && filteredData.length > 0;
  const searchResultsCount = filteredData.length;

  return {
    searchQuery,
    filteredData,
    isLoading,
    error,
    updateSearchQuery,
    clearSearch,
    hasSearchResults,
    searchResultsCount,
  };
}

// ✅ UTILITY FUNCTIONS
export const searchUtils = {
  getCurrentQuery: () => globalSearch.getQuery(),
  clearGlobalSearch: () => globalSearch.setQuery(''),
  debug: () => globalSearch.debug(),
};
