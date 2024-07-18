import { AlertType } from "@/types/index";
import { createAction } from "@reduxjs/toolkit";

interface ModalAction {
    name: string,
    value: boolean
}
export const HandleModalAction = createAction("HANDLE_MODAL_ACTION", (payload:ModalAction) => ({
    payload
}))

export const HandleAlertAction = createAction("HANDLE_ALERT_ACTION", (payload:AlertType) => ({
    payload
}))