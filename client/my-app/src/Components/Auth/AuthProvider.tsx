import {
  getAuth,
  onIdTokenChanged,
  type User,
  type IdTokenResult,
} from "@firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";
import app from "../../config/firebase";
import { UserType } from "../../types/types";

interface Props {
  children: JSX.Element;
}

interface AuthContextType {
  user: User;
  userType: UserType;
  token: IdTokenResult;
  loading: boolean;
}

// The AuthContext that other components may subscribe to.
const AuthContext = createContext<AuthContextType>(null!);

// Updates the AuthContext and re-renders children when the user changes.
// See onIdTokenChanged for what events trigger a change.
export const AuthProvider = ({ children }: Props): React.ReactElement => {
  const [user, setUser] = useState<User | any>(null!);
  const [userType, setUserType] = useState<User | any>(null);
  const [token, setToken] = useState<IdTokenResult>(null!);
  // The loading state is used by RequireAuth/RequireAdminAuth
  const [loading, setLoading] = useState<boolean>(true);
  const providerProps = React.useMemo(() => {
    return { user, userType, token, loading };
  }, [user, userType, token, loading]);

  useEffect(() => {
    const auth = getAuth(app);
    onIdTokenChanged(auth, (newUser) => {
      setUser(newUser);
      console.log(user);
      console.log(auth);
      if (newUser != null) {
        newUser
          .getIdTokenResult()
          .then((newToken) => {
            console.log(newToken);
            setToken(newToken);
          })
          .catch(() => {});
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
