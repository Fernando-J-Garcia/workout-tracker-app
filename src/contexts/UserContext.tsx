import {
  where,
  query,
  collection,
  Query,
  DocumentData,
  getDocs,
  QuerySnapshot,
} from "firebase/firestore";
import React, { Children, useContext, useEffect, useState } from "react";
import { database } from "../firebase";
import { useAuth } from "./AuthContext";

interface UserContextInterface {
  userWorkouts: [];
}
const UserContext = React.createContext<Partial<UserContextInterface>>({});

async function fetchUserData(
  currentUserId: string | undefined,
  callback: (result: any) => void
) {
  const workoutsRef = collection(database, "workouts");
  const q = await query(workoutsRef, where("userId", "==", currentUserId));
  const querySnapShot = await getDocs(q);
  const result = querySnapShot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  callback(result);
}
export const useUser = () => useContext(UserContext);
export function UserProvider({ children }: any) {
  const { currentUser } = useAuth();
  const [userWorkouts, setUserWorkouts] = useState<any>([]);
  useEffect(() => {
    fetchUserData(currentUser?.uid, (res) => {
      console.log(res);
      setUserWorkouts(res);
    });
  }, []);
  const value: UserContextInterface = {
    userWorkouts: userWorkouts,
  };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
