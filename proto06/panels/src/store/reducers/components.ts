import { AlertType } from "@/types/index";
import { HandleAlertAction, HandleModalAction } from "../actions/components";

interface InitialState {
    viewObtModal: boolean | null,
    viewOtModal: boolean | null,
    alert: AlertType,
    [key:string]: any
}

const initialState: InitialState = {
    viewObtModal: false,
    viewOtModal: false,
    alert: {
        open: false,
        status: null,
        message: null
    }
};

export const componentReducer = (state = initialState, action:any) => {

    switch (action.type) {

        case HandleModalAction.type:

            return {
                ...state, // Spread the current state
                [action.payload.name]: action.payload.value
            }

        case HandleAlertAction.type:

            return {
                ...state, // Spread the current state
                alert: {
                    open: action.payload.open,
                    status: action.payload.status,
                    message: action.payload.message
                }
            }

        default:
            return state
    }

};