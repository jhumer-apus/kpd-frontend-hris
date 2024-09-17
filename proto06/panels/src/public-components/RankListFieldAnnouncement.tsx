import { HandleAlertAction } from "@/store/actions/components";
import { APILink } from "@/store/configureStore";
import { Autocomplete, TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

interface Props {
    currentRanks: number[] | null
    handleChange?: (e:any, value:any) => void
    isReadonly?: boolean
}

export default function RankListFieldAnnouncement(props: Props) {

    const { currentRanks, handleChange, isReadonly} = props

    // REDUX
    const dispatch = useDispatch()
    
    // STATES
    const [ranks, setRanks] = useState<any>([])

    // USEEFFECTS
    useEffect(() => {
        fetchRanks()
    }, [])



    // FUNCTIONS
    const fetchRanks = async() => {
        await axios
            .get(`ann_rank`)
            .then(res => setRanks((curr:any) => Array.isArray(res.data)? res.data: []))
            .catch(err => dispatch(HandleAlertAction({
                open: true,
                status: "error",
                message: "Network Lost"
            })))

    }

    const equalityTest = (option: any, value: any) => {
        return option.id == value.id
    }

    const options = ranks.map((option:any) => {
        const firstLetter = option.rank_name[0].toUpperCase();
        return {
          firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
          ...option,
        };
    });

    const selectedRanks = ranks.filter((rank:any) => currentRanks?.includes(rank.id)) ?? [];

    return (
        <Autocomplete
            multiple
            disableCloseOnSelect
            defaultValue={selectedRanks ?? []}
            value={selectedRanks ?? []}
            groupBy={(option:any) => option.firstLetter}
            getOptionLabel={(option:any) => option?.rank_name}
            onChange={handleChange}
            isOptionEqualToValue={equalityTest}
            options={options.sort((a:any, b:any) => -b.firstLetter.localeCompare(a.firstLetter))}
            renderInput={(params) => <TextField {...params} label="Ranks" />}
            className="w-full"
            readOnly={isReadonly}
        />
    )
} 