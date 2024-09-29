export interface IBlog {
    id: string;
    title: string;
    content: string;
    categories: string[];
    isFeatured: boolean;
    additionalLinks?: string[];
    published: boolean;
    preSignedURLs: string[];
}
export type IBlogDetail = Omit<IBlog, 'id'>;
