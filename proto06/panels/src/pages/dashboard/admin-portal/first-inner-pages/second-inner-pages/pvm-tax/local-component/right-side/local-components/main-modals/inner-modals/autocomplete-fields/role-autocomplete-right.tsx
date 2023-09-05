import { Dispatch, MutableRefObject, SetStateAction, useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/configureStore';
import { AutocompleteInputChangeReason } from '@mui/material/Autocomplete';
import { BRANCHViewInterface, USERViewInterface } from '@/types/types-pages';
import { BRANCHViewAction } from '@/store/actions/categories';


interface RoleAutoCompleteInterface{
    createUSER: USERViewInterface;
    setCreateUSER: Dispatch<SetStateAction<USERViewInterface>>;
}


export default function RoleAutoCompleteRight(props: RoleAutoCompleteInterface) {
    const {setCreateUSER, createUSER} = props;
    const dispatch = useDispatch();
    const [state, setState] = useState({data: [
        {
            id: 1,
            role_name: "Developer"
        },
        {
            id: 2,
            role_name: "HR Super Admin"
        },
        {
            id: 3,
            role_name: "HR Admin"
        },
        {
            id: 4,
            role_name: "HR Staff"
        },
        {
            id: 5,
            role_name: "Employee"
        },
    ]
    })
    // const state = useSelector((state:RootState)=> state.categories.BRANCHView);
    const [roleList, setRoleList] = useState<{role_name: string, role_id: number}[]>([])
    const [selectedRoleID, setSelectedRoleID] = useState<number | null>(null);
    useEffect(()=> {
        if(selectedRoleID){
            setCreateUSER((prevState)=> {
                return(
                    {
                        ...prevState,
                        role: selectedRoleID
                    }
                )
            })
        }
    }, [selectedRoleID])

    useEffect(() => {
        if (state.data.length > 0) {
            setTimeout(() => {
                const updatedRoleList = 
                state.data?.map(({ role_name, id }) => {
                    return {
                        role_name: `${role_name} - #${id}`,
                        role_id: id,
                    };
                }) || [];
                setRoleList(updatedRoleList);
            }, 1000);
        }
    }, [state.data]);

    const options = roleList?.map((option) => {
        const firstLetter = option.role_name[0].toUpperCase();
        return {
        firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
        ...option,
        };
    });

    const defaultOption = options?.find((option) => option.role_id === createUSER.role)

    const handleInputChange = (event: React.SyntheticEvent<Element, Event>, newInputValue: string, reason: AutocompleteInputChangeReason) => {
        const matchingRole = roleList.find(
        (roleItems) => roleItems.role_name.toLowerCase().includes(newInputValue.toLowerCase())
        );
        if (matchingRole) {
            setSelectedRoleID(matchingRole.role_id);
        } else {
          setSelectedRoleID(null);
        // window.alert('No Matched Role in the list is found. Create an employee entry first')
        }
    };

    const isOptionEqualToValue = (option: { role_name: string; role_id: number }, value: { role_name: string; role_id: number }) => {
        return option.role_id === value.role_id;
    };
    
    return (
        <>
        {defaultOption &&
            <Autocomplete
            // disableCloseOnSelect
            id="grouped-demo"
            defaultValue={defaultOption}
            options={options?.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
            groupBy={(option) => option.firstLetter}
            getOptionLabel={(option) => option.role_name}
            onInputChange={handleInputChange}
            sx={{ width: "90%" }}
            isOptionEqualToValue={isOptionEqualToValue}
            renderInput={(params) => 
                {   
                    return(
                        <TextField {...params} label="Access Role" />
                    )
    
                }
    
            }
            />
        }
        {!defaultOption &&
            <Autocomplete
            // disableCloseOnSelect
            id="grouped-demo"
            // defaultValue={defaultOption}
            options={options?.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
            groupBy={(option) => option.firstLetter}
            getOptionLabel={(option) => option.role_name}
            onInputChange={handleInputChange}
            sx={{ width: "90%" }}
            isOptionEqualToValue={isOptionEqualToValue}
            renderInput={(params) => 
                {   
                    return(
                        <TextField {...params} label="Loading Values..." />
                    )
    
                }
    
            }
            />
        }
        </>
    );
}