import { Box, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import React, { useContext, useState } from "react";
import apiDetails from "../apiDetails.json";
import { ApiContext } from "../contexts/APIContext";

const APISection = () => {
  const { endpoint, setEndpoint, setScopes, setApiWrapperUrl, setMethod } = useContext(ApiContext);
  const [api, setApi] = useState("");

  const handleChange = (event) => {
    const selectedApi = event.target.value;
    setApi(selectedApi);
    setEndpoint(apiDetails[selectedApi].endpoint);
    setScopes(apiDetails[selectedApi].permission);
    setApiWrapperUrl(apiDetails[selectedApi].apiWrapperUrl);
    setMethod(apiDetails[selectedApi].method);
  };

  return (
    <Box sx={styles.apiSection}>
      <Box sx={styles.formsContainer}>
        <FormControl sx={{ m: 1, minWidth: "150px", width: { xs: "100%", sm: "25%" } }} size="small">
          <InputLabel id="select-api">Select API</InputLabel>
          <Select labelId="select-api" id="select-api" value={api} onChange={handleChange} label="Select API">
            <MenuItem value={"ProtectionScopesInitialCall"}>Protection Scopes - Initial Call</MenuItem>
            <MenuItem value={"ProtectionScopesSubsequentCalls"}>Protection Scopes - Subsequent Calls</MenuItem>
            <MenuItem value={"ProcessContentStartConversation"}>Process Content - Start Conversation</MenuItem>
            <MenuItem value={"ProcessContentContinueConversationWithResponse"}>Process Content - Continue Conversation With Response</MenuItem>
            <MenuItem value={"ProcessContentContinueConversationWithPrompt"}>Process Content - Continue Conversation With Prompt</MenuItem>
          </Select>
        </FormControl>
        <TextField id="api-endpoint" label="API Endpoint" variant="outlined" size="small" fullWidth value={endpoint} onChange={(e) => setEndpoint(e.target.value)} />
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", mt: 2, ml: 1 }}>
        <TextField id="api-permission" label="API Permission" variant="outlined" size="small" fullWidth value={apiDetails[api]?.permission || ""} />
      </Box>
    </Box>
  );
};

export default APISection;

/** @type {import("@mui/material").SxProps} */
const styles = {
  apiSection: {
    p: 2,
    width: "100%",
    height: "150px",
    overflow: "auto",
    border: "2px solid #ccc",
    borderRadius: 2,
  },
  formsContainer: {
    display: "flex",
    flexDirection: { xs: "column", sm: "row" },
    justifyContent: "space-between",
    alignItems: "center",
  },
};
