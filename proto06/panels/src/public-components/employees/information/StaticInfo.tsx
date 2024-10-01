import { TextField, Typography } from "@mui/material";

export default function StaticInfo() {
    return (
        <div className="">
            <form className="flex flex-col gap-8">
                <div id="account-logs-wrapper">
                    <Typography variant="h6" component="h6" className="font-bold">Account Logs</Typography><br></br>
                    <div className="flex gap-8 flex-col md:flex-wrap md:flex-row">
                        <TextField 
                            label="Biomentric ID:" 
                            variant="outlined" 
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                        <TextField 
                            label="Account Active Status:" 
                            variant="outlined" 
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                        <TextField 
                            label="Active Lock Status:" 
                            variant="outlined" 
                            InputProps={{
                                readOnly: true,
                            }}
                        />  
                        <TextField 
                            label="Last Login:" 
                            variant="outlined" 
                            InputProps={{
                                readOnly: true,
                            }}
                        /> 
                        <TextField 
                            label="Date Added:" 
                            variant="outlined" 
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                        <TextField 
                            label="Date Password Changed:" 
                            variant="outlined" 
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </div>
                </div>
                <div id="Account Details">
                    <Typography variant="h6" component="h6" className="font-bold">Account Details</Typography><br></br>
                    <div className="flex gap-8 flex-col md:flex-wrap md:flex-row">
                        <TextField 
                            label="Employee No:" 
                            variant="outlined" 
                            InputProps={{
                                readOnly: true,
                            }}
                        /> 
                        <TextField 
                            label="Username:" 
                            variant="outlined" 
                            InputProps={{
                                readOnly: true,
                            }}
                        /> 
                        <TextField 
                            label="Role:" 
                            variant="outlined" 
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                        <TextField 
                            label="Account Email:" 
                            variant="outlined" 
                            InputProps={{
                                readOnly: true,
                            }}
                        /> 
                    </div>
                </div>
            </form>
        </div>
    )
}