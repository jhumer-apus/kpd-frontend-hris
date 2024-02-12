import { Input } from "@material-tailwind/react";
import { Dispatch, SetStateAction } from 'react';

type VariantType = "standard" | "outlined" | "static";

interface InputProps {
    currVal: string | undefined,
    label: string,
    variant: VariantType,
    placeholder: string,
    setState: Dispatch<SetStateAction<string | number>>;
    isDisable: boolean | undefined;
}
export default function InputVariants(props: InputProps) {

    const { variant, label, placeholder, currVal, isDisable, setState} = props;
    const onChange = ({ target }:any) => setState(target.value);

  return (
    <div className="flex w-72 my-8">
        <Input 
            value={currVal}
            onChange={onChange}
            variant={variant} 
            label={label} 
            placeholder={placeholder}
            type="text"
            disabled={isDisable}
        />
    </div>
    );
}