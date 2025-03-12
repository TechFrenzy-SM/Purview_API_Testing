import { Box } from "@mui/material";
import React from "react";
import APISection from "./APISection";
import RequestSection from "./RequestSection";
import ResponseSection from "./ResponseSection";
import { ApiProvider } from "../contexts/APIContext";
import { TerminalProvider } from "../contexts/TerminalContext";

const MainContainer = () => {
  return (
    <Box sx={styles.mainContainer}>
      <ApiProvider>
        <TerminalProvider>
          <APISection />
          <RequestSection />
          <ResponseSection />
        </TerminalProvider>
      </ApiProvider>
    </Box>
  );
};

export default MainContainer;

/** @type {import("@mui/material").SxProps} */
const styles = {
  mainContainer: {
    p: 2,
    width: "100%",
    height: "100%",
    overflow: "auto",
    background: "#f5f5f5",
    display: "flex",
    flexDirection: "column",
    gap: 2,
  },
};
