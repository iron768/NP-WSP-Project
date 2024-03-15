import data from "../data/users.json"

export interface User {
    id: number;
    name: string;
    email: string;
    admin: boolean;
    profilePicture: string;
    token?: string;
    friends: number[]
    activities: Activity[]
}

export interface Activity {
    activityID: number
    date: string
    caloriesBurned: number
    distance: number
    image: string
    description: string
}
  
export function editUser(user: User) {
    const index = data.findIndex(u => u.id === user.id);

    data[index] = user;
}
  
export function addActivity(user : User | null, activity : Activity) {
    const index = data.findIndex(u => u.id === user?.id);
    
    data[index].activities.push({...activity});
}

export function deleteActivity(user : User | null, activity : Activity) {
    if (!user) {
        console.error("User is null");
        return;
      }
    
      const index = data.findIndex(u => u.id === user.id);
      if (index === -1) {
        console.error("User not found");
        return;
      }
    
      const userActivities = data[index].activities;
      const activityIndex = userActivities.findIndex(a => a.activityID === activity.activityID);
    
      if (activityIndex === -1) {
        console.error("Activity not found");
        return;
      }
    
      // Delete the activity from the user's activities array
      userActivities.splice(activityIndex, 1);
}

export function getActivity(user : User | null, id: number) {
    const index = data.findIndex(u => u.id === user?.id);
    const activityIndex = data[index].activities.findIndex(a => a.activityID === id);

    console.log(data[index].activities[activityIndex]);

    return data[index].activities[activityIndex];
}

export function getUsers(): User[] {
    return data;
}