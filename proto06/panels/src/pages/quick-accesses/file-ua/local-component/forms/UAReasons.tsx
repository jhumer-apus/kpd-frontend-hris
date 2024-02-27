import { Dispatch, SetStateAction, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { UACreateInterface } from '@/types/types-pages';

interface Props {
  setState: Dispatch<SetStateAction<UACreateInterface>>
}

export default function UAReasons(props: Props){

    const { setState } = props

    const reasons:string[] = [
      "Fingerprint/password issue",
      "Poor Network Connectivity",
      "Incorrect Data Entry",
      // "Late",
      // "Undertime"
    ];
    const handleChangeValue = (e:any,val:any) => {
      console.log(val)
      setState((curr:any) => ({
        ...curr,
        ua_description:val
      }));
    }
    return (
      <Autocomplete
        disablePortal
        id="ua-reasons"
        options={reasons.sort((a, b) => a.localeCompare(b))}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="UA Reasons" />}
        onChange={handleChangeValue}
      />
    );
  }