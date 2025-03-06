import React, { useEffect } from "react";
import { Box, CssBaseline } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { InteractionRequiredAuthError } from "@azure/msal-browser";
import "./App.css";
import Header from "./components/Header";
import { loginRequest_user } from "./authConfig";
import MainContainer from "./components/MainContainer";

function App() {
  const { instance, accounts } = useMsal();
  const isAuthenticated = useIsAuthenticated();

  useEffect(() => {
    if (!isAuthenticated) {
      instance
        .ssoSilent({
          scopes: loginRequest_user.scopes,
        })
        .then((response) => {
          instance.setActiveAccount(response.account);
        })
        .catch((err) => {
          console.error("ssoSilent_error", err);
          if (err instanceof InteractionRequiredAuthError) {
            instance.loginRedirect(loginRequest_user).catch((err) => console.error("loginRedirect_error: ", err));
          }
        });
    }
  }, [isAuthenticated, instance, accounts]);

  return (
    <React.Fragment>
      <CssBaseline>
        <BrowserRouter>
          <Header />
          {isAuthenticated ? (
            <Box component={"main"} sx={styles.mainSection}>
              <MainContainer />
            </Box>
          ) : null}
        </BrowserRouter>
      </CssBaseline>
    </React.Fragment>
  );
}

export default App;

/** @type {import("@mui/material").SxProps} */
const styles = {
  mainSection: {
    width: "100%",
    height: "100vh",
    overflow: "auto",
  },
};
