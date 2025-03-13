import { Box, Button, Tab, Tabs, TextField } from "@mui/material";
import React, { useContext, useState } from "react";
import { TerminalContext } from "../contexts/TerminalContext";
import { saveAs } from "file-saver";

const ResponseSection = () => {
  const { terminalOutput, setTerminalOutput, responseBody, responseHeaders } = useContext(TerminalContext);
  const [tabValue, setTabValue] = useState(3);

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleSaveLogs = () => {
    const currentDateTime = new Date().toISOString().replace(/:/g, "-");
    console.log("Current Date Time: ", currentDateTime);
    const blob = new Blob([terminalOutput], { type: "text/plain;charset=utf-8" });
    saveAs(blob, `logs-${currentDateTime}.txt`);
  };

  const handleClearLogs = () => {
    setTerminalOutput("");
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
      {tabValue === 2 && (
        <Box sx={styles.logsContainer}>
          <Box sx={styles.logsBox}>
            <pre>{terminalOutput}</pre>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
            <Button variant="contained" sx={{ textTransform: "capitalize" }} onClick={handleClearLogs}>
              Clear Logs
            </Button>
            <Button variant="contained" sx={{ textTransform: "capitalize" }} onClick={handleSaveLogs}>
              Save Logs{" "}
            </Button>
          </Box>
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
  logsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 1,
  },
  logsBox: {
    mt: 2,
    height: "150px",
    overflow: "auto",
    backgroundColor: "#f5f5f5",
    padding: "10px",
    border: "2px solid #ccc",
    borderRadius: 2,
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
