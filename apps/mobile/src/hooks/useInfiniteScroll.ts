import { useState, useEffect, useCallback } from 'react';

interface UseInfiniteScrollOptions {
    fetchData: (page: number) => Promise<any[]>;
    initialPage?: number;
    pageSize?: number;
}

export function useInfiniteScroll({ fetchData, initialPage = 1, pageSize = 10 }: UseInfiniteScrollOptions) {
    const [data, setData] = useState<any[]>([]);
    const [page, setPage] = useState(initialPage);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const loadMore = useCallback(async () => {
        if (loading || !hasMore) return;

        setLoading(true);
        try {
            const newItems = await fetchData(page);
            if (newItems.length < pageSize) {
                setHasMore(false);
            }
            setData(prev => [...prev, ...newItems]);
            setPage(prev => prev + 1);
        } catch (error) {
            console.error('Failed to load more data', error);
        } finally {
            setLoading(false);
        }
    }, [page, loading, hasMore, fetchData, pageSize]);

    const refresh = useCallback(async () => {
        setRefreshing(true);
        setPage(initialPage);
        setHasMore(true);
        try {
            const newItems = await fetchData(initialPage);
            if (newItems.length < pageSize) {
                setHasMore(false);
            }
            setData(newItems);
            setPage(initialPage + 1);
        } catch (error) {
            console.error('Failed to refresh data', error);
        } finally {
            setRefreshing(false);
        }
    }, [fetchData, initialPage, pageSize]);

    useEffect(() => {
        refresh();
    }, []);

    return {
        data,
        loading,
        hasMore,
        loadMore,
        refresh,
        refreshing,
    };
}
