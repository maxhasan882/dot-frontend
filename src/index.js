import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
// import { Provider as ReduxProvider } from "react-redux";
// import { PersistGate } from "redux-persist/lib/integration/react";

import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { SettingsProvider } from "./contexts/SettingsContext";
import { CollapseDrawerProvider } from "./contexts/CollapseDrawerContext";
import { AuthProvider } from "./contexts/JWTContext";

// import { store, persistor } from "./_redux/store";

ReactDOM.render(
    <HelmetProvider>
        {/*<ReduxProvider store={store}>*/}
        {/*    <PersistGate persistor={persistor}>*/}
                <SettingsProvider>
                    <CollapseDrawerProvider>
                        <BrowserRouter>
                            <AuthProvider>
                                <App />
                            </AuthProvider>
                        </BrowserRouter>
                    </CollapseDrawerProvider>
                </SettingsProvider>
        {/*    </PersistGate>*/}
        {/*</ReduxProvider>*/}
    </HelmetProvider>,
    document.getElementById("root")
);