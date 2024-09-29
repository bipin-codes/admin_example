import { SubmitHandler, useForm } from 'react-hook-form';

import { ICategory } from 'app/slices/categories/types';
import { useCreateCategoryMutation } from 'app/slices/categories/api';
import Category from 'common/Category';
import useCategories from 'hooks/useCategories';

const MIN_LENGTH = 3;

const Categories = () => {
    const {
        handleSubmit,
        register,
        formState: { errors: formErrors },
        reset,
    } = useForm<ICategory>();

    const { categories } = useCategories();

    const [createCategory] = useCreateCategoryMutation();

    const onSubmitHandler: SubmitHandler<ICategory> = async (data) => {
        await createCategory(data);
        reset();
    };

    return (
        <div className="flex-col p-5 justify-between  text-gray-500">
            <div className="text-3xl text-gray-500 text-bold underline underline-offset-2">
                Manage the list of Categories.
            </div>

            <form
                onSubmit={handleSubmit(onSubmitHandler)}
                className="flex flex-col pt-10 pb-5"
            >
                <div className="flex justify-between items-center gap-5 max-w-3xl">
                    <input
                        placeholder="new category name"
                        type="text"
                        className="border-2 px-5 py-3 rounded-md flex-1"
                        {...register('categoryName', {
                            required: 'Category Name is required!',
                            minLength: {
                                value: MIN_LENGTH,
                                message: `Category name must be atleast ${MIN_LENGTH} character long!`,
                            },
                        })}
                    />
                    <button
                        className="bg-blue-500 px-10 py-3 text-white rounded-md text-2xl"
                        type="submit"
                    >
                        Create
                    </button>
                </div>
            </form>

            {Object.keys(formErrors).length > 0 && (
                <div className="bg-red-100 max-w-md rounded-lg px-4 py-2">
                    <span>{formErrors.categoryName?.message}</span>
                </div>
            )}

            <div className="text-2xl text-gray-500 text-bold mt-10">
                Existing Categories
            </div>
            <ul className="grid gap-5 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
                {categories &&
                    categories.map((category, index) => {
                        return <Category item={category} key={index} />;
                    })}
            </ul>
        </div>
    );
};

export default Categories;
