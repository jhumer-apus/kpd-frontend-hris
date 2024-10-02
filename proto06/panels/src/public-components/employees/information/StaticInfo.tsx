import InputField from "@/public-components/forms/InputField";
import { Typography } from "@mui/material";

export default function StaticInfo() {
    return (
        <div className="">
            <form className="flex flex-col gap-8">
                <div id="account-logs-wrapper">
                    <Typography variant="h6" component="h6" className="font-bold">Account Logs</Typography><br></br>
                    <div className="flex gap-8 flex-col md:flex-wrap md:flex-row">
                        <InputField 
                            label="Biomentric ID:" 
                            variant="outlined" 
                            readOnly
                        />
                        <InputField 
                            label="Account Active Status:"
                            variant="outlined" 
                            readOnly
                        />
                        <InputField 
                            label="Active Lock Status:" 
                            variant="outlined" 
                            readOnly
                        />  
                        <InputField 
                            label="Last Login:" 
                            variant="outlined" 
                            readOnly
                        /> 
                        <InputField 
                            label="Date Added:" 
                            variant="outlined" 
                            readOnly
                        />
                        <InputField 
                            label="Date Password Changed:" 
                            variant="outlined" 
                            readOnly
                        />
                    </div>
                </div>
                <div id="Account Details">
                    <Typography variant="h6" component="h6" className="font-bold">Account Details</Typography><br></br>
                    <div className="flex gap-8 flex-col md:flex-wrap md:flex-row">
                        <InputField 
                            label="Employee No:" 
                            variant="outlined" 
                            readOnly
                        /> 
                        <InputField 
                            label="Username:" 
                            variant="outlined" 
                            readOnly
                        /> 
                        <InputField 
                            label="Role:" 
                            variant="outlined" 
                            readOnly
                        />
                        <InputField 
                            label="Account Email:" 
                            variant="outlined" 
                            readOnly
                        /> 
                    </div>
                </div>
            </form>
        </div>
    )
}