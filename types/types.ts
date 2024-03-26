import { IconType } from "react-icons";

export interface User {
    phone: string;
    email: string;
    degree: string;
    lastName: string;
    progress: number;
    userType: string;
    regNumber: string;
    firstName: string;
    supervisor: string;
    organization: string;
}

export interface SideBarItem {
    id: string;
    title: string;
    icon: IconType;
    content: () => React.JSX.Element
}

export interface LogBookTable {
    week: string;
    date: string;
    task: string;
    comments: string;
    supervisor: string;
}