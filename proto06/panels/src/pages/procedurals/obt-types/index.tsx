import axiosInstance from "@/helpers/axiosConfig";
import CreateOBTType from "@/public-components/procedurals/obt-types/CreateOBTType";
import ListOBTType from "@/public-components/procedurals/obt-types/ListOBTType";
import { APILink } from "@/store/configureStore";
import { Box, Grid, Paper } from "@mui/material";
import { siLK } from "@mui/material/locale";
import axios from "axios";
import { Fragment, useEffect, useState } from "react";


export default function OBTtypes() {

    const [obtTypes, setObtTypes] = useState<any[]>([])

    useEffect(() => {
        fetchObtTypes();
    },[])

    const fetchObtTypes = async () => {
        await axiosInstance.get(`obt_type/`)
            .then((response) => setObtTypes(() => Array.isArray(response.data) ? response.data : []))
            // .then(res => setObtTypes((curr:any[]) => Array.isArray(res?.data)? res.data: []))
            .catch(err => console.log(err))
    }

    console.log(obtTypes);

    return (
        <Fragment>
            <div className="flex flex-col md:flex-row gap-4">
                <Paper elevation={3} className="w-full h-[600px]">
                    <CreateOBTType refreshOBTList={fetchObtTypes}/>
                </Paper>
                <Paper elevation={3} className="w-full p-8 h-[600px]">
                    <ListOBTType rows={obtTypes} refreshTable={fetchObtTypes} />
                </Paper>
            </div>
        </Fragment>
    )
}