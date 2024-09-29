import Icon from 'common/Icon';
import { DeleteButtonWithConfirmation } from 'common/WithConfirmation';
import React, { ChangeEvent, useState } from 'react';
interface ILinkItemProps {
    item: string;
    onEditHandler: (newVal: string, oldVal: string) => void;
    onDeleteHandler: (item: string) => void;
}
const LinkItem: React.FC<ILinkItemProps> = ({
    item,
    onDeleteHandler: onDelete,
    onEditHandler: onEdit,
}) => {
    const [editing, setEditing] = useState(false);
    const [value, setValue] = useState(item);

    const onEditHandler = () => {
        if (editing) onEdit(item, value);

        setEditing(!editing);
    };
    const onChangeHandler = ({
        target: { value },
    }: ChangeEvent<HTMLInputElement>) => {
        setValue(value);
    };

    const onDeleteHandler = () => {
        onDelete(item);
    };

    return (
        <div className="flex justify-between max-w-2xl shadow-md py-2 px-4 items-center rounded-lg border border-gray-100 space-x-10 ">
            {editing ? (
                <input
                    onChange={onChangeHandler}
                    className="text-xl font-medium lowercase p-2 rounded-xl "
                    autoFocus
                    type="text"
                    value={value}
                />
            ) : (
                <p className="text-xl lowercase p-2">{item}</p>
            )}
            <span className="cursor-pointer" onClick={onEditHandler}>
                {editing ? <Icon name="Done" /> : <Icon name="Edit" />}
            </span>

            <DeleteButtonWithConfirmation
                confirmationMessage="Delete this category?"
                onAction={onDeleteHandler}
            />
        </div>
    );
};

export default LinkItem;
