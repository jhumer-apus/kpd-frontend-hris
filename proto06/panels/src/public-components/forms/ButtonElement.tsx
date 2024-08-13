import { TrashIcon } from "@heroicons/react/24/solid"
import { Button } from "@mui/material"
import { Fragment } from "react"

interface Props {
    onEdit: (() => void) | null
    onCancel: (() => void) | null
    onSave: (() => void) | null
    onDelete: (() => void) | null
    isEdit: boolean
}

export default function ButtonElement(props:Props) {
    const { onDelete, onEdit, onCancel, onSave, isEdit } = props

    return (
        <Fragment>
            <div className={`flex gap-4 ${isEdit ? "block": "hidden"}`}>
                <Button 
                    className="w-32"
                    variant="outlined"
                    onClick={() =>  onCancel && onCancel()}
                >
                    Cancel
                </Button>
                <Button 
                    variant='contained' 
                    className="w-32"
                    // onClick={() => onSave && onSave()}
                    type="submit"
                >
                    Save
                </Button>
            </div>
            
            <div className={`flex gap-4 ${isEdit ? "hidden": "block"}`}>
                <Button 
                    className="w-32"
                    variant="outlined"
                    color="error" 
                    onClick={() => onDelete && onDelete()}
                    startIcon={
                        <TrashIcon className="h-6 w-6 text-red-500" />
                    }
                >
                    Delete
                </Button>
                <Button 
                    variant='contained' 
                    className="w-32"
                    onClick={() => onEdit && onEdit()}
                >
                    Edit
                </Button>
            </div>
        </Fragment> 
    )
}