import { useGetBlogsQuery } from 'app/slices/blogs/api';
import { IBlog } from 'app/slices/blogs/types';
import { useMemo, useState } from 'react';

const usePaginatedBlogs = () => {
    const [id, setId] = useState<string | undefined>(undefined);

    const [blogs, setBlogs] = useState<IBlog[]>([]);
    const [hasFetched, setHasFetched] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const { isError, isLoading, data, isFetching } = useGetBlogsQuery(
        {
            limit: 5,
            id,
        },
        { skip: hasFetched }
    );

    if (data && !isFetching) {
        setBlogs([...blogs, ...data.body.data]);
        setHasFetched(true);
        setId(
            data.body.key
                ? JSON.parse(decodeURIComponent(data.body.key))
                : undefined
        );
        setHasMore(data.body.key ? true : false);
    }

    const loadMoreBlogs = () => {
        setHasFetched(false);
    };
    const memoizedBlogs = useMemo(() => blogs, [blogs]);
    return {
        isError,
        isLoading,
        loadMoreBlogs,
        blogs: memoizedBlogs,
        hasMore,
    };
};

export default usePaginatedBlogs;
