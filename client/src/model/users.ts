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

export function getActivity(user : User | null, id: number): Activity {
    const index = data.findIndex(u => u.id === user?.id);
    const activityIndex = data[index].activities.findIndex(a => a.activityID === id);

    return data[index].activities[activityIndex];
}

export function getFriendsActivities(user: User | null): Activity[] {
    const users = getUsers();
    const friendsIds: number[] = user?.friends ?? [];
    const friendsActivities: Activity[] = [];

    for (const friendId of friendsIds) {
        const friend = users.find(u => u.id === friendId);
        
        if (friend) {
            // Aggregate the activities of each friend
            friendsActivities.push(...friend.activities);
        }
    }

    return friendsActivities;
}

export function getUserByName(userName: string) {
    const users = getUsers();

    for (const user of users) {
        if (user.name === userName) {
            return user;
        }
    }

    return null;
}

export function getActivitiesToday(user: User | null): Activity[] {
    const currentUser = user ? getUsers().find(u => u.id === user.id) : null;

    if (!currentUser) return []; // Return empty array if user is not found

    const currentDate = new Date();
    const currentDateString = currentDate.toISOString().slice(0, 10); // Get current date in 'YYYY-MM-DD' format

    // Filter activities for the current day
    return currentUser.activities.filter(activity => activity.date === currentDateString);
}

export function getActivitiesThisWeek(user: User | null): Activity[] {
    const currentUser = user ? getUsers().find(u => u.id === user.id) : null;

    if (!currentUser) return []; // Return empty array if user is not found

    const currentDate = new Date();
    const currentDay = currentDate.getDay(); // Get current day of the week (0 for Sunday, 1 for Monday, etc.)

    // Calculate the start date of the week (Sunday)
    const startDate = new Date(currentDate);
    startDate.setDate(startDate.getDate() - currentDay);

    // Calculate the end date of the week (Saturday)
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 6);

    // Filter activities for the current week
    return currentUser.activities.filter(activity => {
        const activityDate = new Date(activity.date);
        return activityDate >= startDate && activityDate <= endDate;
    });
}

export function getUsers(): User[] {
    return data;
}