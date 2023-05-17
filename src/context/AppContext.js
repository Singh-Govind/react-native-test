import React, { createContext, useState } from "react";

// Create a new context instance
export const AppContext = createContext();

// Create a context provider component
export default AppContextProvider = ({ children }) => {
  const [webViewOpener, setWebViewOpener] = useState(false);
  const [webViewUrl, setWebViewUrl] = useState("https://askfundu.com");

  const handleWebViewSettings = (url) => {
    setWebViewUrl(url);
    setWebViewOpener(!webViewOpener);
  };

  // Define the state and functions you want to share
  const contextValue = {
    webViewOpener,
    setWebViewOpener,
    webViewUrl,
    setWebViewUrl,
    handleWebViewSettings,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};
