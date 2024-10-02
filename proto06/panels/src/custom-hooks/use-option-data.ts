import axiosInstance from "@/helpers/axiosConfig"
import React, { useState } from 'react'; // This ensures JSX elements are recognized

interface Option {
    value: string;
    label: React.ReactNode; // Use React.ReactNode for JSX elements
}

type APIOptions  = {
    data: Option[],
    loading: boolean
}

export const useOptionData = () => {

    const [positions, setPositions] = useState<APIOptions>(
        {
            data: [],
            loading: false,
        }
    )

    const [branches, setBranches] = useState<APIOptions>(
        {
            data: [],
            loading: false,
        }
    )

    const [departments, setDepartments] = useState<APIOptions>(
        {
            data: [],
            loading: false,
        }
    )

    const [ranks, setRanks] = useState<APIOptions>(
        {
            data: [],
            loading: false,
        }
    )

    
    const [employmentStatus, setEmploymentStatus] = useState<APIOptions>(
        {
            data: [],
            loading: false,
        }
    )

    const bloodTypes: Option[] = [
        {
            value: "A+",
            label: "A+"
        },
        {
            value: "A-",
            label: "A-"
        },
        {
            value: "B+",
            label: "B+"
        },
        {
            value: "B-",
            label: "B-"
        },
        {
            value: "AB+",
            label: "AB+"
        },
        {
            value: "AB-",
            label: "AB-"
        },
        {
            value: "O+",
            label: "O+"
        },
        {
            value: "O-",
            label: "O-"
        },
        {
            value: "",
            label: "None"
        },
    ]

    const sex: Option[] = [
        {
            value: "M",
            label: "Male"
        },
        {
            value: "F",
            label: "Female"
        },
    ]

    const civilStatus: Option[] = [
        {
            value: "S",
            label: "Single"
        },
        {
            value: "M",
            label: "Married"
        },
        {
            value: "W",
            label: "Widowed"
        },
        {
            value: "A",
            label: "Annulled"
        },
    ]

    const separationType: Option[] = [
        {
            value: "",
            label: "N/A"
        },
        {
            value: "resigned",
            label: "Resigned"
        },
        {
            value: "retired",
            label: "Retired"
        },
        {
            value: "terminated",
            label: "Terminated"
        }
    ]

    // AXIOS API OPTIONS
    const fetchPositions = async () => {

        setPositions(curr => (
            {
                data: [],
                loading: true
            }
        ))

        await axiosInstance.get('/position')
            .then(res => {
                const mappedPositions = Array.isArray(res.data) ? res.data.map(pos => (
                    {
                        value: pos.id,
                        label: pos.pos_name
                    }
                )) : []

                setPositions(curr => (
                    {
                        data: mappedPositions,
                        loading: false
                    }
                ))
            })
            .catch(err => {
                console.error(err)
                setPositions(curr => (
                    {
                        data: [],
                        loading: false
                    }
                ))
            })
    }

    const fetchBranches = async () => {

        setBranches(curr => (
            {
                data: [],
                loading: true
            }
        ))

        await axiosInstance.get('branch/')
            .then(res => {
                const mappedBranches = Array.isArray(res.data) ? res.data.map(branch => (
                    {
                        value: branch.id,
                        label: branch.branch_name
                    }
                )) : []

                setBranches(curr => (
                    {
                        data: mappedBranches,
                        loading: false
                    }
                ))
            })
            .catch(err => {
                console.error(err)
                setBranches(curr => (
                    {
                        data: [],
                        loading: false
                    }
                ))
            })
    }

    const fetchDepartments = async () => {

        setDepartments(curr => (
            {
                data: [],
                loading: true
            }
        ))

        await axiosInstance.get('department/')
            .then(res => {
                const mappedDepartments = Array.isArray(res.data) ? res.data.map(dept => (
                    {
                        value: dept.id,
                        label: dept.dept_name
                    }
                )) : []

                setDepartments(curr => (
                    {
                        data: mappedDepartments,
                        loading: false
                    }
                ))
            })
            .catch(err => {
                console.error(err)
                setDepartments(curr => (
                    {
                        data: [],
                        loading: false
                    }
                ))
            })
    }

    const fetchRanks = async () => {

        setRanks(curr => (
            {
                data: [],
                loading: true
            }
        ))

        await axiosInstance.get('rank/')
            .then(res => {
                const mappedRanks = Array.isArray(res.data) ? res.data.map(rank => (
                    {
                        value: rank.id,
                        label: rank.rank_name
                    }
                )) : []

                setRanks(curr => (
                    {
                        data: mappedRanks,
                        loading: false
                    }
                ))
            })
            .catch(err => {
                console.error(err)
                setRanks(curr => (
                    {
                        data: [],
                        loading: false
                    }
                ))
            })
    }

    const fetchEmploymentStatus = async () => {

        setEmploymentStatus(curr => (
            {
                data: [],
                loading: true
            }
        ))

        await axiosInstance.get('emp_status_type/')
            .then(res => {
                const mappedStatus = Array.isArray(res.data) ? res.data.map(status => (
                    {
                        value: status.id,
                        label: status.name
                    }
                )) : []

                setEmploymentStatus(curr => (
                    {
                        data: mappedStatus ,
                        loading: false
                    }
                ))
            })
            .catch(err => {
                console.error(err)
                setEmploymentStatus(curr => (
                    {
                        data: [],
                        loading: false
                    }
                ))
            })
    }

    return {
        sex,
        civilStatus,
        bloodTypes,
        separationType,
        fetchPositions,
        fetchBranches,
        fetchDepartments,
        fetchRanks,
        fetchEmploymentStatus,
        positions,
        branches,
        departments,
        ranks,
        employmentStatus
    }
}