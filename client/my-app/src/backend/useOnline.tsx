import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { addUser } from "./analytics";

const sessionId = uuidv4();

export const useOnline = () => {
  useEffect(() => {
    addUser(sessionId);
  }, []);
};

export default useOnline;
