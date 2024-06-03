import { Select, Option } from "@material-tailwind/react";
import { Dispatch, SetStateAction } from 'react';
 
interface SelectProps {
    label: string;
    variant: "static" | "standard" | "outlined";
    placeholder?: string; // Make it optional by adding `?`
    options: OptionInterface[],
    currValue?: string | undefined,
    setState?: Dispatch<SetStateAction<string | number | undefined>>;
    isDisable?: boolean | undefined;
    isRequired?: boolean | undefined;
    register?: any;
    name?:string
}
    

interface OptionInterface {
    value: string;
    name: string | number;
}

export default function SelectForm(props: SelectProps) {

    const { options, name, register, label, variant, placeholder, currValue, isDisable, isRequired, setState } = props;

    return (
    <div className="flex w-72 my-8">
        <Select 
            value={currValue}
            variant={variant} 
            label={label} 
            placeholder={placeholder} 
            onChange={(val:any) => setState? setState(val):null}
            disabled={isDisable}
            name={name}
            // require={isRequired}
            ref={register}
        >
            {options.map((option: OptionInterface, i: number) => (
                <Option key={i} value={option.value}>{option.name}</Option>
            ))}
        </Select>
    </div>
    );
}