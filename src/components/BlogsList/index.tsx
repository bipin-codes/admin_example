import {
    DeleteButtonWithConfirmation,
    TogglePublishWithConfirmation,
    ToggleUnpublishWithConfirmation,
} from 'common/WithConfirmation';

import parse from 'html-react-parser';

import Icon from 'common/Icon';
import React, { useState } from 'react';
import { IBlogListProps, IBlogProps } from './types';

import {
    useDeleteBlogMutation,
    useUpdateBlogMutation,
} from 'app/slices/blogs/api';
import Loader from 'components/Loader';
import usePaginatedBlogs from 'hooks/usePaginatedBlogs';

const Blog: React.FC<IBlogProps> = React.memo((params) => {
    const { blog, onEdit } = params;
    const [expanded, setExpanded] = useState(false);
    const [deleteBlog, { isLoading: deleteLoading }] = useDeleteBlogMutation();
    const [updateBlog, { isLoading: updateLoading }] = useUpdateBlogMutation();

    const onDeleteHandler = () => {
        deleteBlog(blog);
    };

    const onToggleCollapse = () => {
        setExpanded(!expanded);
    };

    const onPublishHandler = () => {
        updateBlog({ ...blog, published: !blog.published });
    };

    return (
        <div
            className={`rounded-lg flex flex-col border-2 p-5 shadow-md my-5 ${
                blog.published ? 'bg-blue-100' : 'bg-gray-100'
            }`}
        >
            {deleteLoading || updateLoading ? (
                <Loader isFullScreen={false} />
            ) : (
                <>
                    <div className="flex align-middle justify-between">
                        <p className={'self-center font-bold text-xl'}>
                            {blog.title}
                            {blog.additionalLinks &&
                                blog.additionalLinks.filter((x) => x !== '')
                                    .length > 0 && (
                                    <span className="self-center text-xl ml-2 font-normal text-gray-500">
                                        (has {blog.additionalLinks?.length}{' '}
                                        links)
                                    </span>
                                )}
                        </p>

                        <div className="gap-5 flex">
                            {blog.published ? (
                                <TogglePublishWithConfirmation
                                    confirmationMessage="Unpublish this blog?"
                                    onAction={onPublishHandler}
                                />
                            ) : (
                                <ToggleUnpublishWithConfirmation
                                    confirmationMessage="Publish the Blog?"
                                    onAction={onPublishHandler}
                                />
                            )}

                            <button
                                type="button"
                                className="action-button p-1"
                                onClick={() => {
                                    onEdit(blog);
                                }}
                            >
                                <Icon name="Edit" size={16} />
                            </button>
                            <DeleteButtonWithConfirmation
                                confirmationMessage="Delete this blog?"
                                onAction={onDeleteHandler}
                            />
                        </div>
                    </div>
                    <div className="inline">
                        <div
                            className={`text-lg mt-4 ${
                                expanded ? '' : 'line-clamp-2'
                            }`}
                        >
                            {parse(blog.content)}
                        </div>
                        <span
                            className="text-blue-300 lowercase hover:cursor-pointer"
                            onClick={onToggleCollapse}
                        >
                            {expanded ? 'less... ' : 'more...'}
                        </span>
                    </div>
                    <div className="mt-4 flex gap-x-5">
                        {blog.categories.map((category, idx) => (
                            <span
                                key={idx}
                                className="bg-transparent px-2 py-1 text-blue-400 font-medium italic rounded-md border-blue-900 border"
                            >
                                {category}
                            </span>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
});

const BlogsList: React.FC<IBlogListProps> = ({ onBlogEditHandler }) => {
    const { hasMore, isError, isLoading, blogs, loadMoreBlogs } =
        usePaginatedBlogs();

    if (isError) {
        console.log(isError);
        return null;
    }

    if (isLoading || blogs === undefined) return null;

    const loadMoreClickHandler = () => {
        loadMoreBlogs();
    };

    return (
        <>
            <div>
                {blogs.map((blog) => {
                    return (
                        <Blog
                            key={Math.random()}
                            blog={blog}
                            onEdit={onBlogEditHandler}
                        />
                    );
                })}
            </div>
            <button
                disabled={!hasMore}
                className={`${
                    hasMore
                        ? 'animated-button action-button'
                        : 'static-button bg-gray-200'
                }`}
                onClick={loadMoreClickHandler}
            >
                Load more!
            </button>
        </>
    );
};

export default BlogsList;
