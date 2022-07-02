import {
  where,
  query,
  collection,
  Query,
  DocumentData,
  getDocs,
  QuerySnapshot,
  onSnapshot,
} from "firebase/firestore";
import React, { Children, useContext, useEffect, useState } from "react";
import { database } from "../firebase";
import { useAuth } from "./AuthContext";

interface UserContextInterface {
  userWorkouts: any[];
}
const UserContext = React.createContext<Partial<UserContextInterface>>({});

export const useUser = () => useContext(UserContext);

export function UserProvider({ children }: any) {
  const { currentUser } = useAuth();
  const [userWorkouts, setUserWorkouts] = useState<Array<any>>([]);

  useEffect(() => {
    const workoutsRef = collection(database, "workouts");
    const q = query(workoutsRef, where("userId", "==", currentUser?.uid));
    const unsubscribe = onSnapshot(q, (snapShot) => {
      let result: any = [];
      snapShot.forEach((change) =>
        result.push({
          id: change.id,
          ...change.data(),
        })
      );
      console.log(result);
      setUserWorkouts(result);
    });
    return () => unsubscribe();
  }, []);
  const value: UserContextInterface = {
    userWorkouts: userWorkouts,
  };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
