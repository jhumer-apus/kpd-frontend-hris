import { Dispatch, MutableRefObject, SetStateAction, useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/configureStore';

import { AutocompleteInputChangeReason } from '@mui/material/Autocomplete';
import { ASSETACCOUNTViewInterface } from '@/types/types-payroll-eoy';
import { ASSETLISTViewAction } from '@/store/actions/payroll-eoy';


interface AssetListAutoCompleteInterface{
    editASSETACCOUNT: ASSETACCOUNTViewInterface;
    setEditASSETACCOUNT: Dispatch<SetStateAction<ASSETACCOUNTViewInterface>>;
}


export default function AssetListAutoCompleteRight(props: AssetListAutoCompleteInterface) {
    const {setEditASSETACCOUNT, editASSETACCOUNT} = props;
    const dispatch = useDispatch();
    const state = useSelector((state:RootState)=> state.payrollEOY.ASSETLISTView);
    const [assetList, setAssetListsList] = useState<{asset: string, asset_code: number}[]>([])
    const [selectedAssetListId, setSelectedAssetListId] = useState<number | null>(null);
    useEffect(()=> {
        if(state.data?.length === 0 || !state.data){
            dispatch(ASSETLISTViewAction());
        }
    }, []);

    useEffect(()=> {
        if(selectedAssetListId){
            setEditASSETACCOUNT((prevState)=> {
                return(
                    {
                        ...prevState,
                        asset_list_code: selectedAssetListId
                    }
                )
            })
        }
    }, [selectedAssetListId])

    useEffect(() => {
        if (state.data) {
            setTimeout(() => {
                const updatedAssetListsList = 
                state.data?.map(({ id, asset_name, year }) => {
                    return {
                        asset: `${asset_name} Year: ${year} - #${id} `,
                        asset_code: id,
                    };
                }) || [];
                setAssetListsList(updatedAssetListsList);
            }, 500);
        }
    }, [state.data]);

    const options = assetList?.map((option) => {
        const firstLetter = option.asset[0].toUpperCase();
        return {
        firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
        ...option,
        };
    });
    
    const defaultOptions = options?.find((item) => item.asset_code === editASSETACCOUNT.asset_list_code)
    const handleInputChange = (event: React.SyntheticEvent<Element, Event>, newInputValue: string, reason: AutocompleteInputChangeReason) => {
        const matchingAssetList = assetList.find(
        //   (assetItems) => assetItems.asset === newInputValue
        (assetItems) => assetItems.asset.toLowerCase().includes(newInputValue.toLowerCase())
        );
        if (matchingAssetList) {
            setSelectedAssetListId(matchingAssetList.asset_code);
        } else {
          setSelectedAssetListId(null);
        // window.alert('No Matched AssetList in the list is found. Edit an asset entry first')
        }
    };

    const isOptionEqualToValue = (option: { asset: string; asset_code: number }, value: { asset: string; asset_code: number }) => {
        return option.asset_code === value.asset_code;
    };
    
    return (
        <>
        {defaultOptions && 
            <Autocomplete
            // disableCloseOnSelect
            noOptionsText={'Loading... Please Wait.'}
            options={options?.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
            groupBy={(option) => option.firstLetter}
            getOptionLabel={(option) => option.asset}
            onInputChange={handleInputChange}
            defaultValue={defaultOptions}
            sx={{ width: "100%" }}
            isOptionEqualToValue={isOptionEqualToValue}
            renderInput={(params) => 
                {   
                    return(
                        <TextField {...params} label="Asset #:" />
                    )
    
                }
    
            }
            />
        }
        {!defaultOptions && 
            <Autocomplete
            // disableCloseOnSelect
            noOptionsText={'Loading... Please Wait.'}
            options={options?.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
            groupBy={(option) => option.firstLetter}
            getOptionLabel={(option) => option.asset}
            onInputChange={handleInputChange}
            defaultValue={defaultOptions}
            sx={{ width: "100%" }}
            isOptionEqualToValue={isOptionEqualToValue}
            renderInput={(params) => 
                {   
                    return(
                        <TextField {...params} label="Loading..." />
                    )
    
                }
    
            }
            />
        }
        </>
        
    );
}