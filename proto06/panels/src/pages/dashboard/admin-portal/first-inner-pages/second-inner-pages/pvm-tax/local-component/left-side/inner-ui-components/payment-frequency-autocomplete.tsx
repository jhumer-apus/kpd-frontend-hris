import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useDispatch } from 'react-redux';
import { AutocompleteInputChangeReason } from '@mui/material/Autocomplete';
import { TAXCreateInterface } from '@/types/types-payroll-variables';


interface PaymentFrequencyAutoCompleteInterface{
    createTAX: TAXCreateInterface;
    setCreateTAX: Dispatch<SetStateAction<TAXCreateInterface>>;
}


export default function PaymentFrequencyAutoComplete(props: PaymentFrequencyAutoCompleteInterface) {
    const {setCreateTAX, createTAX} = props;
    const dispatch = useDispatch();
    const [state, setState] = useState({data: [
        {
            id: 1,
            pay_name: "01 Monthly"
        },
        {
            id: 2,
            pay_name: "02 Semi-Monthly"
        },
        {
            id: 3,
            pay_name: "03 Project-Based"
        },
        {
            id: 4,
            pay_name: "04 Weekly"
        },
        // {
        //     id: 5,
        //     pay_name: "Daily"
        // },
        // {
        //     id: 6,
        //     pay_name: "Hourly"
        // },
    ]
    })
    // const state = useSelector((state:RootState)=> state.categories.BRANCHView);
    const [payList, setPaymentFrequencyList] = useState<{pay_name: string, pay_id: number}[]>([])
    const [selectedPaymentFrequencyID, setSelectedPaymentFrequencyID] = useState<number | null>(null);
    // useEffect(()=> {
    //     if(Array.isArray(state.data) && state.data.length === 0){
    //         dispatch(BRANCHViewAction());
    //     }
    // }, []);

    useEffect(()=> {
        if(selectedPaymentFrequencyID){
            setCreateTAX((prevState)=> {
                return(
                    {
                        ...prevState,
                        payment_frequency: selectedPaymentFrequencyID
                    }
                )
            })
        }
    }, [selectedPaymentFrequencyID])

    useEffect(() => {
        if (state.data.length > 0) {
            setTimeout(() => {
                const updatedPaymentFrequencyList = 
                state.data?.map(({ pay_name, id }) => {
                    return {
                        pay_name: `${pay_name} - #${id}`,
                        pay_id: id,
                    };
                }) || [];
                setPaymentFrequencyList(updatedPaymentFrequencyList);
            }, 1000);
        }
    }, [state.data]);

    const options = payList?.map((option) => {
        const firstLetter = option.pay_name[0].toUpperCase();
        return {
        firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
        ...option,
        };
    });
    
    const handleInputChange = (event: React.SyntheticEvent<Element, Event>, newInputValue: string, reason: AutocompleteInputChangeReason) => {
        const matchingPaymentFrequency = payList.find(
        (payItems) => payItems.pay_name.toLowerCase().includes(newInputValue.toLowerCase())
        );
        if (matchingPaymentFrequency) {
            setSelectedPaymentFrequencyID(matchingPaymentFrequency.pay_id);
        } else {
          setSelectedPaymentFrequencyID(null);
        // window.alert('No Matched PaymentFrequency in the list is found. Create an employee entry first')
        }
    };

    const isOptionEqualToValue = (option: { pay_name: string; pay_id: number }, value: { pay_name: string; pay_id: number }) => {
        return option.pay_id === value.pay_id;
    };
    
    return (
        <Autocomplete
        // disableCloseOnSelect
        noOptionsText={'Loading... Please Wait.'}
        options={options?.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
        groupBy={(option) => option.firstLetter}
        getOptionLabel={(option) => option.pay_name}
        onInputChange={handleInputChange}
        sx={{ width: "100%" }}
        isOptionEqualToValue={isOptionEqualToValue}
        renderInput={(params) => 
            {   
                return(
                    <TextField {...params} label="Payment Frequency" />
                )

            }

        }
        />
    );
}