import React, { createContext, useState } from "react";

export const TerminalContext = createContext();

export const TerminalProvider = ({ children }) => {
  const [terminalOutput, setTerminalOutput] = useState([]);
  const [responseBody, setResponseBody] = useState("");
  const [responseHeaders, setResponseHeaders] = useState([]);

  const appendTerminalOutput = (message) => {
    const datetime = new Date().toLocaleString();
    setTerminalOutput((prevOutput) => `${prevOutput}\n[${datetime}] : ${message}`);
  };
  return (
    <TerminalContext.Provider
      value={{
        terminalOutput,
        setTerminalOutput,
        appendTerminalOutput,
        responseBody,
        setResponseBody,
        responseHeaders,
        setResponseHeaders,
      }}
    >
      {children}
    </TerminalContext.Provider>
  );
};
