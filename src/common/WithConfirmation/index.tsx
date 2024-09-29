import React from 'react';
import { IWithConfirmationProps } from './types';
import Icon from 'common/Icon';

const withConfirmation = (WrappedComponent: React.FC, buttonType: string) => {
    return (props: IWithConfirmationProps) => {
        const onActionHandler = () => {
            if (window.confirm(props.confirmationMessage)) {
                props.onAction();
            }
        };

        return (
            <button
                className={`${buttonType}-button p-1`}
                onClick={onActionHandler}
            >
                <WrappedComponent />
            </button>
        );
    };
};

const DeleteButton: React.FC = () => <Icon name="Delete" size={16} />;
const PublishButton: React.FC = () => (
    <Icon name="Published_Filled" size={16} />
);
const UnpublishButton: React.FC = () => (
    <Icon name="Published_Empty" size={16} />
);

const DeleteButtonWithConfirmation = withConfirmation(DeleteButton, 'delete');

const TogglePublishWithConfirmation = withConfirmation(
    PublishButton,
    'publish'
);

const ToggleUnpublishWithConfirmation = withConfirmation(
    UnpublishButton,
    'publish'
);

export {
    DeleteButtonWithConfirmation,
    TogglePublishWithConfirmation,
    ToggleUnpublishWithConfirmation,
};
