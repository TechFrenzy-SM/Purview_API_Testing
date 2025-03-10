import { AppBar, Avatar, Box, Button, Container, Grid2 as Grid, IconButton, Popover, Toolbar, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AuthenticatedTemplate, useMsal } from "@azure/msal-react";
import { loginRequest_user } from "../authConfig";
import { InteractionRequiredAuthError } from "@azure/msal-browser";
import { GetUserProfilePic } from "../GraphData";
import { FeedOutlined, HelpOutlineOutlined } from "@mui/icons-material";

const Header = () => {
  const { instance, accounts } = useMsal();

  const [username, setUsername] = useState(null);
  const [userObj, setUserObj] = useState({});
  const [anchor, setAnchor] = useState(null);
  const [accessToken, setAccessToken] = useState();
  const [profileImg, setProfileImg] = useState();

  const open = Boolean(anchor);
  const avatarRef = useRef(null);

  /** Fetch ID and Access Tokens */
  useEffect(() => {
    if (accounts.length > 0) {
      const account = accounts[0];
      // console.log(account);
      // console.log(`\nID-Token: ${account.idToken}\n`);
      if (account) {
        setUsername(account.username);
        setUserObj({
          name: account.name,
          username: account.username,
          tenantName: account.username.split("@")[1].split(".")[0],
          tenantId: account.tenantId,
          localAccountId: account.localAccountId,
        });

        /** Get access-token */
        instance
          .acquireTokenSilent({
            ...loginRequest_user,
            account: account,
          })
          .then((response) => setAccessToken(response.accessToken))
          .catch((error) => {
            if (error instanceof InteractionRequiredAuthError) {
              instance
                .acquireTokenRedirect({
                  ...loginRequest_user,
                  account: account,
                })
                .then((response) => setAccessToken(response.accessToken))
                .catch((error) => console.error("Acquire Token error:", error));
            }
            console.error("Silent token acquisition error: ", error);
          });
      }
    }
  }, [accounts, instance]);

  const handleLogout = (instance) => {
    console.log(instance);
    instance.logoutRedirect().catch((e) => console.error(e));
  };

  const handleOpenProfileCard = (event) => {
    setAnchor(event.currentTarget);
  };

  const handleCloseProfileCard = () => {
    setAnchor(null);
  };

  // Make Graph API call
  useEffect(() => {
    const fetchData = async () => {
      try {
        const image = await GetUserProfilePic(accessToken);
        setProfileImg(image);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, [accessToken]);

  return (
    <AppBar position="sticky" sx={styles.appBar}>
      <Container maxWidth="xl">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box component={"img"} sx={styles.appLogo} src="" />
            <Typography variant="h5" sx={styles.appName} component={Link} to={"/"}>
              P4AI API Testing
            </Typography>
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <AuthenticatedTemplate>
            <IconButton title="Feedback" style={{ color: "#fff" }}>
              <FeedOutlined />
            </IconButton>
            <IconButton title="Help" style={{ color: "#fff" }}>
              <HelpOutlineOutlined />
            </IconButton>
            <IconButton title="Account" style={{ color: "#fff" }} onClick={handleOpenProfileCard} ref={avatarRef}>
              <Avatar alt={username} src={profileImg} />
            </IconButton>
            <Popover open={open} anchorEl={anchor} onClose={handleCloseProfileCard} anchorOrigin={{ vertical: "bottom", horizontal: "center" }} transformOrigin={{ vertical: "top", horizontal: "center" }} sx={{ mt: 1 }}>
              <Box sx={{ p: 2, width: "400px", height: "auto" }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                  <Typography variant="body1">{userObj.tenantName}</Typography>
                  <Button variant="text" onClick={() => handleLogout(instance)} sx={{ textTransform: "capitalize", color: "inherit", fontSize: "0.9rem" }}>
                    Sign out
                  </Button>
                </Box>
                <Grid container spacing={{ xs: 2, md: 3 }}>
                  <Grid size={{ xs: 4 }}>
                    <Box sx={{}}>
                      <Avatar alt={username} src={profileImg} sx={{ width: "96px", height: "96px" }} />
                    </Box>
                  </Grid>
                  <Grid size={{ xs: 8 }}>
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <Typography sx={{ fontSize: "1.2rem", fontWeight: "bold" }} noWrap>
                        {userObj.name}
                      </Typography>
                      <Typography variant={"body1"} sx={{ fontSize: "0.8rem", color: "#616161" }} noWrap>
                        {userObj.username}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "column", mt: 2 }}>
                      <Typography component={Link} to={"https://myaccount.microsoft.com/"} sx={{ fontSize: "1rem", color: "#2979ff" }} target="_blank">
                        View account
                      </Typography>
                      <Typography component={Link} to={`https://ind.delve.office.com/?u=${userObj.localAccountId}`} sx={{ fontSize: "1rem", color: "#2979ff" }} target="_blank">
                        My Microsoft M365 profile
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Popover>
          </AuthenticatedTemplate>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;

/** @type {import("@mui/material").SxProps} */
const styles = {
  appBar: {
    bgcolor: "#333333",
  },
  appLogo: {},
  appName: {
    display: { xs: "none", md: "inline" },
    color: "#fff",
    textDecoration: "none",
    cursor: "pointer",
  },
};
