import Select from '@admin/components/ui/select/select';
// import Select from "@admin/components/ui/select/select";
import { Control, Controller } from 'react-hook-form';

interface SelectInputProps {
  control: Control<any>;
  rules?: any;
  name: string;
  errors?: string;
  options: object[];
  [key: string]: unknown;
}

const SelectInput = ({
  control,
  options,
  name,
  rules,
  errors,
  getOptionLabel,
  getOptionValue,
  isMulti,
  isClearable,
  isLoading,
  ...rest
}: SelectInputProps) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      {...rest}
      render={({ field }) => (
        <>
          <Select
            {...field}
            getOptionLabel={getOptionLabel}
            getOptionValue={getOptionValue}
            isMulti={isMulti}
            isClearable={isClearable}
            isLoading={isLoading}
            options={options}
          />
          {errors && (
            <p className="my-2 text-xs text-red-500 text-start">
              {errors}
            </p>
          )}
        </>
      )}
    />
  );
};

export default SelectInput;
