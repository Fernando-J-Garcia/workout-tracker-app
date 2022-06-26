import {
  where,
  query,
  collection,
  Query,
  DocumentData,
} from "firebase/firestore";
import React, { Children, useContext, useEffect, useState } from "react";
import { database } from "../firebase";
import { useAuth } from "./AuthContext";

interface UserContextInterface {}
const UserContext = React.createContext<Partial<UserContextInterface>>({});

async function fetchUserData(
  currentUserId: string | undefined,
  callback: (query: Query<DocumentData>) => void
) {
  const workoutsRef = collection(database, "workouts");
  const q = await query(workoutsRef, where("userId", "==", currentUserId));
  callback(q);
}
export const useUser = () => useContext(UserContext);
export function UserProvider({ children }: any) {
  const { currentUser } = useAuth();
  const [userData, setUserData] = useState({});
  useEffect(() => {
    fetchUserData(currentUser?.uid, (query) => {
      setUserData(query);
    });
  }, []);
  const value: UserContextInterface = {};
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
