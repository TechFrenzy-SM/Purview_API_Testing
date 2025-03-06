import React, { createContext, useState } from "react";

export const TerminalContext = createContext();

export const TerminalProvider = ({ children }) => {
  const [terminalOutput, setTerminalOutput] = useState([]);
  const [responseBody, setResponseBody] = useState("");
  const [responseHeaders, setResponseHeaders] = useState([]);

  const appendTerminalOutput = (message) => {
    setTerminalOutput((prevOutput) => `${prevOutput}\n${message}`);
  };
  return (
    <TerminalContext.Provider
      value={{
        terminalOutput,
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
