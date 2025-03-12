import { LogLevel } from "@azure/msal-browser";

export const msalConfig = {
  auth: {
    clientId: "c9d70071-6f6a-4dff-9960-c1f48b48f12f",
    authority: "https://login.microsoftonline.com/common",
    redirectUri: "https://p4ai-dzaqdqf7f6fccfcw.westus-01.azurewebsites.net/",
    postLogoutRedirectUri: "https://p4ai-dzaqdqf7f6fccfcw.westus-01.azurewebsites.net/",
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: true,
  },
  system: {
    allowRedirectInIframe: true,
    loggerOptions: {
      loggerCallback: (level, message, containsPii) => {
        if (containsPii) {
          return;
        }
        switch (level) {
          case LogLevel.Error:
            console.error(message);
            return;
          case LogLevel.Info:
            console.info(message);
            return;
          case LogLevel.Verbose:
            console.debug(message);
            return;
          case LogLevel.Warning:
            console.warn(message);
            return;
          default:
            return;
        }
      },
    },
  },
};

export const loginRequest_user = {
  scopes: ["user.read"],
};
