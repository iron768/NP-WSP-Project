import data from "../data/activities.json"

export interface Activity {
    id: number;
    distance: number;
    location: string;
    calories: number;
}

export function getActivity(): Activity[] {
    return data;
}