import { useState } from "react";

const knoxContext = createContext();

export const useAuth = () => {
  const context = useContext(knoxContext);
  if (!context) throw new Error("There is not auth provider");
  return context;
};

export function KnoxProvider({ children }) {
  const restart = (tag) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  return (
    <knoxContext.Provider value={{ restart }}>{children}</knoxContext.Provider>
  );
}
