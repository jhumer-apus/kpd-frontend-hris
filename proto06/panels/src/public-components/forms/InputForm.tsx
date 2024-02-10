import { Input } from "@material-tailwind/react";

type VariantType = "standard" | "outlined" | "static";

interface InputProps {
    val: string | undefined,
    label: string,
    variant: VariantType,
    placeholder: string
}
export default function InputVariants(props: InputProps) {

    const { variant, label, placeholder, val} = props;
  return (
    <div className="flex w-72 my-8">
        <Input 
            value={val}
            variant={variant} 
            label={label} 
            placeholder={placeholder} />
    </div>
    );
}