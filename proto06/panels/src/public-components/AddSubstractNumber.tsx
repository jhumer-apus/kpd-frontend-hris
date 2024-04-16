import { Button, Typography } from "@mui/material"

interface Props {
    min: number | 0,
    max: number | null,
    currentValue: number,
    onUpdate:any,
    name:string,
    label:string

}
export default function AddSubstractNumber(props: Props) {
    const { min, max, currentValue, onUpdate, name, label} = props

    const updateValue = (operation:string) => {

        let updateValue = currentValue
    
        switch(operation) {
    
          case 'add':
            updateValue++
            break;
    
          case 'substract':
            updateValue--
            break;
    
          default:
            break;  
        }
        onUpdate(updateValue, name)
    
    }

    return (
        <div>
            <Typography variant="h6">{label}</Typography>
            <div className="flex gap-4 items-center">
                <Button variant="outlined" size="large" className="text-2xl" disabled={currentValue <= min} onClick={() => updateValue('substract')}><p className="text-2xl font-bold">-</p></Button>
                <Typography variant="h6">{currentValue.toFixed(1)}</Typography>
                <Button variant="outlined" disabled={max? currentValue >= max: false} onClick={() => updateValue('add')}><p className="text-2xl font-bold">+</p></Button>
            </div>
        </div>
    )
}