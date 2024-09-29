import {
    useDeleteCategoryMutation,
    useUpdateCategoryMutation,
} from 'app/slices/categories/api';
import { ICategory } from 'app/slices/categories/types';
import Icon from 'common/Icon';
import { DeleteButtonWithConfirmation } from 'common/WithConfirmation';
import React, { ChangeEvent, useState } from 'react';
import { toast } from 'react-toastify';

interface ICategoryProps {
    item: ICategory;
}
const Category: React.FC<ICategoryProps> = ({ item }) => {
    const [editing, setEditing] = useState(false);
    const [value, setValue] = useState(item.categoryName);

    const [updateCategory] = useUpdateCategoryMutation();
    const [deleteCategory] = useDeleteCategoryMutation();

    const invalidCategoryName = () => value.length < 3;

    const onEditHandler = () => {
        if (editing) {
            if (invalidCategoryName()) {
                toast.warn(
                    'Category name must be atleast 3 characters long...'
                );
                return;
            }
            updateCategory({ id: item.id, categoryName: value });
        }
        setEditing(!editing);
    };

    const onChangeHandler = ({
        target: { value },
    }: ChangeEvent<HTMLInputElement>) => {
        setValue(value);
    };

    const onDeleteHandler = () => {
        deleteCategory(item);
    };

    return (
        <div className="flex justify-between max-w-3xl shadow-md my-5 py-2 px-4 rounded-lg items-center ">
            {editing ? (
                <input
                    onChange={onChangeHandler}
                    className="text-xl font-medium uppercase p-2 rounded-xl"
                    autoFocus
                    type="text"
                    value={value}
                />
            ) : (
                <p className="text-xl font-medium uppercase p-2">
                    {item.categoryName}
                </p>
            )}
            <div className="flex items-center justify-center gap-x-10">
                <span className="cursor-pointer" onClick={onEditHandler}>
                    {editing ? <Icon name="Done" /> : <Icon name="Edit" />}
                </span>

                <DeleteButtonWithConfirmation
                    confirmationMessage="Delete this category?"
                    onAction={onDeleteHandler}
                />
            </div>
        </div>
    );
};

export default Category;
