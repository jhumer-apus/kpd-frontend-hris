
export interface AuthorsTableData {
    img: string;
    name: string;
    email: string;
    job: Array<String>;
    online: boolean;
    date: string;
};

export interface ConversationsData {
    img: string;
    name: string;
    message: string;
};

export interface OrdersOverviewData {
    icon: any;
    color: string;
    title: string;
    description: string;
};

export interface PlatformSettingsData {
    title: string;
    options: Array<{checked: boolean, label: string}>;
};

export interface ProjectsData {
    img: string;
    title: string;
    tag: string;
    description: string;
    route: string;
    members: Array<{img: string, name: string}>;
};

export interface ProjectsTableData {
    img: string;
    name: string;
    members: Array<{img: string, name: string}>;
    budget: string;
    completion: number;
};

export interface StatisticsCardsData {
    color: string;
    icon: any;
    title: string;
    value: string;
    footer: {color: string, value: string, label: string};
};

