import { SVGProps } from "react";
import { IRoute } from "..";
import { color } from "@material-tailwind/react/types/components/card";
export interface MessageCardProps {
    img: string;
    name: string;
    message: string;
    action?: React.ReactNode;
}

export interface Details {
    "first name": string;
    mobile: string;
    email: string;
    location: string;
    social: React.ReactNode;
}
  

export interface ProfileInfoCardProps {
    title: string;
    description: string;
    details: Details;
    action?: React.ReactNode;
}

export interface SideNavProps {
    brandImg: string;
    brandName: string;
    routes: Array<IRoute>;
}



export interface EasyAccessCardProps {
    key?: string;
    color: color | string;
    icon: React.ReactNode;
    title: NonNullable<React.ReactNode>;
    value: string;
    redirection?: string;
    footer: NonNullable<React.ReactNode>;
    custom?: string;
    link?: string;
    onClickHandler?: (key:string)=> void;
    onClickDetails?: string;
    fileDownload?: boolean
    fileName?: string
}

export interface CelebrantsDataProps {
    id: number,
    name: string,
    profilePic: string,
    daysToBirthday: number,
    department?: string,
}


export interface AnniversaryDataProps {
    id: number,
    name: string,
    profilePic: string,
    dateOfAnniversary: string,
    dateHired: string,
    totalYears: number,
    department?: string,
}
