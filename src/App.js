import React from "react";

import ThemeConfig from "./theme";
import useAuth from "./hooks/useAuth";
import RouteApp from "./route";
import ScrollToTop from "./components/ScrollToTop";
import LoadingScreen from "./components/LoadingScreen";
import RtlLayout from "./components/RtlLayout";
import NotistackProvider from "./components/NotistackProvider";
import ThemePrimaryColor from "./components/ThemePrimaryColor";
import ThemeLocalization from "./components/ThemeLocalization";

function App() {
  const { isInitialized } = useAuth();

  return (
      <ThemeConfig>
        <ThemePrimaryColor>
          <ThemeLocalization>
            <RtlLayout>
              <NotistackProvider>
                {/*<Settings />*/}
                <ScrollToTop />
                {isInitialized ? <RouteApp /> : <LoadingScreen />}
              </NotistackProvider>
            </RtlLayout>
          </ThemeLocalization>
        </ThemePrimaryColor>
      </ThemeConfig>
  );
}

export default App;
