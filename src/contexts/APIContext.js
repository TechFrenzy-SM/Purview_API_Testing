import React, { createContext, useState } from "react";

export const ApiContext = createContext();

export const ApiProvider = ({ children }) => {
  const [endpoint, setEndpoint] = useState("");
  const [scopes, setScopes] = useState([]);
  const [apiWrapperUrl, setApiWrapperUrl] = useState("");
  const [method, setMethod] = useState("");

  return <ApiContext.Provider value={{ endpoint, setEndpoint, scopes, setScopes, apiWrapperUrl, setApiWrapperUrl, method, setMethod }}>{children}</ApiContext.Provider>;
};
