import {
  getAuth,
  onIdTokenChanged,
  type User,
  type IdTokenResult,
} from "@firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";
import app from "../../config/firebase";
import { UserType } from "../../types/types";
import { db } from "../../config/firebase";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  setDoc,
  getDoc,
  doc,
  writeBatch,
} from "firebase/firestore";


interface Props {
  children: JSX.Element;
}

interface AuthContextType {
  user: User;
  userType: UserType;
  token: IdTokenResult;
  loading: boolean;
}

const fetchUserType = async (user: User): Promise<UserType | null> => {
  const userDocRef = doc(db, "users", user.uid);
  console.log(userDocRef);
  const userDocSnap = await getDoc(userDocRef);
  console.log(userDocSnap);

  if (userDocSnap.exists()) {
    const userData = userDocSnap.data();
    return userData.userType as UserType;
  } else {
    console.error("No such document!");
    return null;
  }
};

// The AuthContext that other components may subscribe to.
const AuthContext = createContext<AuthContextType>(null!);

// Updates the AuthContext and re-renders children when the user changes.
// See onIdTokenChanged for what events trigger a change.
export const AuthProvider = ({ children }: Props): React.ReactElement => {
  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("user")) || null);
  const [userType, setUserType] = useState<User | any>(null);
  const [token, setToken] = useState<IdTokenResult>(null!);
  // The loading state is used by RequireAuth/RequireAdminAuth
  const [loading, setLoading] = useState<boolean>(true);
  const providerProps = React.useMemo(() => {
    return { user, userType, token, loading };
  }, [user, userType, token, loading]);

  useEffect(() => {
    const auth = getAuth(app);
    console.log("Auth", auth);
    onIdTokenChanged(auth, (newUser) => {
      setUser(newUser);
      if (newUser != null) {
        newUser
          .getIdTokenResult()
          .then((newToken) => {
            setToken(newToken);
          })
          .catch(() => {});
          console.log("New user", newUser);
          const fetchedUserType = fetchUserType(newUser);
          console.log("Fetched UserType: ", fetchedUserType); // Debugging line
          setUserType(fetchedUserType);
        // need to set userType once we set up official firebase structure
      }
      setLoading(false);
    });
  }, []);

  return (
    <AuthContext.Provider value={providerProps}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
