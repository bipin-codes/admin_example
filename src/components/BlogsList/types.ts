import { IBlog } from 'app/slices/blogs/types';

export interface IBlogListProps {
    onBlogEditHandler: (blog: IBlog) => void;
}
export interface IBlogProps {
    blog: IBlog;
    onEdit: (blog: IBlog) => void;
}
