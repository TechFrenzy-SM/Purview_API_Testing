import { Box, Button, Tab, Tabs, TextField } from "@mui/material";
import React, { useContext, useState } from "react";
import { TerminalContext } from "../TerminalContext";

const ResponseSection = () => {
  const { terminalOutput, responseBody, responseHeaders } = useContext(TerminalContext);
  const [tabValue, setTabValue] = useState(3);

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={styles.responseSection}>
      <Tabs value={tabValue} onChange={handleChange}>
        <Tab label="Response Body" sx={{ textTransform: "capitalize" }} />
        <Tab label="Response Headers" sx={{ textTransform: "capitalize" }} />
        <Tab label="Logs" sx={{ textTransform: "capitalize" }} />
        <Tab label="Output Terminal" sx={{ textTransform: "capitalize" }} />
      </Tabs>
      {tabValue === 0 && (
        <Box sx={styles.bodyBox}>
          <TextField id="response-body" multiline rows={5} variant="outlined" value={responseBody} fullWidth sx={{ height: "100%", overflow: "auto" }} />
        </Box>
      )}
      {tabValue === 1 && (
        <Box sx={styles.bodyBox}>
          <TextField id="response-headers" multiline rows={5} variant="outlined" value={responseHeaders} fullWidth sx={{ height: "100%", overflow: "auto" }} />
        </Box>
      )}
      {tabValue === 3 && (
        <Box sx={styles.terminalBox}>
          <pre>{terminalOutput}</pre>
        </Box>
      )}
    </Box>
  );
};

export default ResponseSection;

/** @type {import("@mui/material").SxProps} */
const styles = {
  responseSection: {
    p: 2,
    width: "100%",
    height: "280px",
    overflow: "auto",
    border: "2px solid #ccc",
    borderRadius: 2,
  },
  bodyBox: {
    mt: 2,
    height: "150px",
    overflow: "auto",
  },
  terminalBox: {
    mt: 2,
    height: "150px",
    overflow: "auto",
    backgroundColor: "#000",
    color: "#00FF00",
    padding: "10px",
    borderRadius: 2,
  },
};
