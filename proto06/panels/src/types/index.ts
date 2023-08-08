export * from "@/types/types-widgets/index";
export * from "@/types/types-data/index";

export interface IPage {
    id: number;
    icon?: React.ReactNode;
    name: string;
    path: string;
    element?: React.ReactNode;
    badgeAccessor?: string;
    hasSubItems: boolean;
    subItems?: Array<IPage> | undefined;
}

export interface IRoute {
    title?: string;
    id: number;
    layout: string;
    pages: Array<IPage>;
}


export enum ScheduleDailyColor {
    _restday = 'linear-gradient(0deg, rgba(34,195,193,1) 0%, rgba(38,199,133,1) 50%)',
    _workday = 'linear-gradient(0deg, rgba(195,147,34,1) 0%, rgba(253,187,45,1) 100%)',
    _restday_hex = '#26C785',
    _workday_hex = '#FDBB2D'
}