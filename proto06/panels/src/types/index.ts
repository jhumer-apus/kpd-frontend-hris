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

