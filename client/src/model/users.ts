import data from "../data/users.json"

export interface User {
    id: number;
    name: string;
    email: string;
    admin: boolean;
    profilePicture: string;
    token?: string
}

export function getUsers(): User[] {
    return data;
}