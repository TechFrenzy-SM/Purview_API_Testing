import { Box, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import React, { useContext, useState } from "react";
import apiDetails from "../apiDetails.json";
import { ApiContext } from "../APIContext";

const APISection = () => {
  const { setEndpoint, setScopes } = useContext(ApiContext);
  const [api, setApi] = useState("");

  const handleChange = (event) => {
    const selectedApi = event.target.value;
    setApi(selectedApi);
    setEndpoint(apiDetails[selectedApi].endpoint);
    setScopes(apiDetails[selectedApi].permission);
  };

  return (
    <Box sx={styles.apiSection}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <FormControl sx={{ m: 1, minWidth: "auto" }} size="small">
          <InputLabel id="select-api">Select API</InputLabel>
          <Select labelId="select-api" id="select-api" value={api} onChange={handleChange} label="Select API">
            <MenuItem value={"GraphAPI"}>Graph API</MenuItem>
            <MenuItem value={"MSGraphAPI"}>MS Graph API</MenuItem>
            <MenuItem value={"ProtectionScopesInitialCall"}>Protection Scopes - Initial Call</MenuItem>
            <MenuItem value={"ProtectionScopesSubsequentCalls"}>Protection Scopes - Subsequent Calls</MenuItem>
            <MenuItem value={"ProcessContentStartConversation"}>Process Content - Start Conversation</MenuItem>
            <MenuItem value={"ProcessContentContinueConversationWithResponse"}>Process Content - Continue Conversation With Response</MenuItem>
            <MenuItem value={"ProcessContentContinueConversationWithPrompt"}>Process Content - Continue Conversation With Prompt</MenuItem>
          </Select>
        </FormControl>
        <TextField id="api-endpoint" label="API Endpoint" variant="outlined" size="small" fullWidth value={apiDetails[api]?.endpoint || ""} />
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
};
