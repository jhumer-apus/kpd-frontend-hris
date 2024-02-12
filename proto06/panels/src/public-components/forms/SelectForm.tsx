import { Select, Option } from "@material-tailwind/react";
import { Dispatch, SetStateAction } from 'react';
 
interface SelectProps {
    label: string;
    variant: "static" | "standard" | "outlined";
    placeholder?: string; // Make it optional by adding `?`
    options: OptionInterface[],
    currValue: string | undefined,
    setState: Dispatch<SetStateAction<string | number>>;
    isDisable: boolean | undefined;
}
    

interface OptionInterface {
    value: string;
    name: string | number;
}

export default function SelectForm(props: SelectProps) {

    const { options, label, variant, placeholder, currValue, isDisable, setState } = props;

    return (
    <div className="flex w-72 my-8">
        <Select 
            value={currValue}
            variant={variant} 
            label={label} 
            placeholder={placeholder} 
            onChange={(val:any) => setState(val)}
            disabled={isDisable}
        >
            {options.map((option: OptionInterface, i: number) => (
                <Option key={i} value={option.value}>{option.name}</Option>
            ))}
        </Select>
    </div>
    );
}