
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