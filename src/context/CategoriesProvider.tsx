import { createContext, useEffect, useState, PropsWithChildren } from 'react';

import { useGetCategoriesQuery } from 'app/slices/categories/api';

import { ICategory } from 'app/slices/categories/types';

export interface ICategoriesContext {
    categories: ICategory[];
    refetch: () => void;
}

export const CategoriesContext = createContext<ICategoriesContext | undefined>(
    undefined
);

const CategoriesProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const { data, refetch } = useGetCategoriesQuery();
    const [categories, setCategories] = useState<ICategory[]>([]);

    useEffect(() => {
        if (data) {
            setCategories(data.body.data);
        }
    }, [data]);

    return (
        <CategoriesContext.Provider value={{ categories, refetch }}>
            {children}
        </CategoriesContext.Provider>
    );
};

export { CategoriesProvider };
