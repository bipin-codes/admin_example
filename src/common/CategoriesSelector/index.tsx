import useCategories from 'hooks/useCategories';
import Select, { MultiValue, SingleValue } from 'react-select';
export type Option = { value: string; label: string };

interface ICategoriesSelectorProps {
    placeholderMessage: string;
    allowMultipleValues: boolean;
    values?: Array<Option>;
    onValueSelected: (value: Array<Option>) => void;
}

const CategoriesSelector: React.FC<ICategoriesSelectorProps> = ({
    placeholderMessage,
    allowMultipleValues,
    onValueSelected,
    values,
}) => {
    const { categories } = useCategories();
    const mappedCategories = categories.map((x) => ({
        label: x.categoryName,
        value: x.categoryName,
    }));

    const onChangeHandler = (
        option: SingleValue<Option> | MultiValue<Option>
    ) => {
        onValueSelected(Array.isArray(option) ? option : [option]);
    };

    return (
        <Select
            value={values}
            onChange={onChangeHandler}
            placeholder={placeholderMessage}
            menuPlacement="auto"
            closeMenuOnSelect={!allowMultipleValues} //disable when multiple values can be selected...
            isMulti={allowMultipleValues}
            options={mappedCategories}
            className="outline-none"
            styles={{
                control: (baseStyles) => ({
                    ...baseStyles,
                    border: '1px solid grey',
                    outline: 'none',
                    ':active': {
                        outline: 'none',
                        border: 'none',
                        boxShadow: 'none',
                    },
                }),

                multiValueLabel: (baseStyles) => ({
                    ...baseStyles,
                    width: '10rem',
                    fontSize: '1.2rem',
                }),
                placeholder: (baseStyles) => ({
                    ...baseStyles,
                    fontSize: '1.2rem',
                }),
            }}
        />
    );
};

export default CategoriesSelector;
