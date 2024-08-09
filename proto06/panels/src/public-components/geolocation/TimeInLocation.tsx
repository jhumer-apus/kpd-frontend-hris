import { useGeoLocation } from "@/custom-hooks/use-geolocation";
import { HandleAlertAction, HandleModalAction } from "@/store/actions/components";
import { RootState } from "@/store/configureStore";
import { Box, Button, Modal, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";


export default function TimeInLocation() {
    const dispatch = useDispatch()
    const {viewTimeInLocationModal} = useSelector((state:RootState) => state.component)

    const {location, getCurrentLocation} = useGeoLocation()

    const handleClose = () => {
        dispatch(HandleModalAction(
            {
                name: "viewTimeInLocationModal",
                value: false
            }
        ))
    }

    const confirmLocation = async () => {
        try {
            const location:any = await getCurrentLocation(); // Await the geolocation result
            if (location?.longitude && location?.latitude) {
                dispatch(HandleAlertAction({
                    open:true,
                    status: "success",
                    message: "Time In Successfully"
                }));
            } else {
                dispatch(HandleAlertAction({
                    open: true,
                    status: "error",
                    message: "Time in failed. Cannot get your location. Please enable your location and try again"
                }));
            }
        } catch (error) {
            dispatch(HandleAlertAction({
                open: true,
                status: "error",
                message: "Something went wrong getting your location"
            }));
        }
        handleClose()
    }
    return (
        <Modal
            open={viewTimeInLocationModal}
            // onClose={handleClose}
            >
            <div className="bg-white p-8 m-auto w-fit mt-20 rounded-lg">
                <p className="text-2xl text-blue-900 font-bold-600">Confirm your location to Time In?</p>
                <div className="flex justify-end mt-4">
                    <Button className="m-auto" onClick={() => handleClose()}>No</Button>
                    <Button className="m-auto" onClick={() => confirmLocation()}>Yes</Button>
                </div>
            </div>
        </Modal>
    )
}