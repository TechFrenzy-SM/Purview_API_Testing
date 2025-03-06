import React, { createContext, useState } from "react";

export const ApiContext = createContext();

export const ApiProvider = ({ children }) => {
  const [endpoint, setEndpoint] = useState("");
  const [scopes, setScopes] = useState([]);

  return <ApiContext.Provider value={{ endpoint, setEndpoint, scopes, setScopes }}>{children}</ApiContext.Provider>;
};
