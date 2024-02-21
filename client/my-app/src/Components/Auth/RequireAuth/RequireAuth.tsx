import React from 'react';
import { AuthProvider, useAuth } from '../AuthProvider';
import styles from './RequireAuth.module.css';
import { UserType } from '../../../types/types';

interface Props {
  type: UserType;
  children: JSX.Element;
}

const RequireAuth: React.FC<Props> = ({ type, children }) => {
  const authContext = useAuth();
  if (authContext.loading) {
    return (
      <div className={styles.loadingContainer}>
        Loading...
      </div>
    );
  } else if (authContext.userType !== type) {
    return (
      <div className={styles.loadingContainer}>
        <p className={styles.errorMessage}>
          You do not have permission to access this page.
        </p>
      </div>
    );
  }
  return <AuthProvider>{children}</AuthProvider>;
};

export default RequireAuth;