import {
    CategoriesContext,
    ICategoriesContext,
} from 'context/CategoriesProvider';
import { useContext } from 'react';

const useCategories = (): ICategoriesContext => {
    const context = useContext(CategoriesContext);
    if (!context) {
        throw new Error(
            'useCategories must be used within a CategoriesProvider'
        );
    }
    return context;
};

export default useCategories;
