import { type User } from "./users";
import { reactive } from "vue";

const session = reactive({
    user: null as User | null,
})

export function getSession(){
    return session;
}

export function login(){
    session.user = {
      id: 10,
      name: "Test",
      email: "test@user.com",
      admin: false,
      profilePicture: "https://robohash.org/Terry.png?set=set4",
      friends: [],
      activities: []
    }
}