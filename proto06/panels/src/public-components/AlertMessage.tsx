import { Alert, Snackbar } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import { AlertType } from "../types";
import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { HandleAlertAction } from "@/store/actions/components";
import { RootState } from "@/store/configureStore";

export default function AlertMessage() {

    const { open, status, message} = useSelector((state:RootState) => state.component.alert)
    const dispatch = useDispatch()

    const handleClose = () => {
        dispatch(HandleAlertAction(
            {
                open: false,
                status: "",
                message: null
            }
        ))
    }

    return (
        <Fragment>
            {createPortal(
                <Snackbar
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    open={open}
                    onClose={handleClose}
                    autoHideDuration={6000}
                >
                    <Alert
                        onClose={handleClose}
                        severity={status}
                        sx={{ width: '100%' }}
                    >
                        {message}
                    </Alert>
                </Snackbar>,
                document.body
            )}
            
        </Fragment>
    )
}