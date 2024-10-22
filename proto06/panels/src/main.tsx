
import React, { Fragment } from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from 'react-query';
import App from "./App";
import { BrowserRouter, HashRouter } from "react-router-dom";
import { ThemeProvider } from "@material-tailwind/react";
import { MaterialTailwindControllerProvider } from "@/context";
import "../public/css/tailwind.css";
import { Provider } from "react-redux";
import store from "@/store/configureStore";
import AlertMessage from "./public-components/AlertMessage";



const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
const queryClient = new QueryClient();

const isProduction = import.meta.env.VITE_APP_STATUS != "development"

root.render(
  <Fragment>
    {
      isProduction 
      ?
        <QueryClientProvider client={queryClient}>
          <Provider store={store}>
            <HashRouter>
              <ThemeProvider>
                <MaterialTailwindControllerProvider>
                  <App />
                </MaterialTailwindControllerProvider>
              </ThemeProvider>
            </HashRouter>
          </Provider>
        </QueryClientProvider>
      :   
        <React.StrictMode>
          <QueryClientProvider client={queryClient}>
            <Provider store={store}>
              <HashRouter>
                <ThemeProvider>
                  <MaterialTailwindControllerProvider>
                    <App />
                  </MaterialTailwindControllerProvider>
                </ThemeProvider>
              </HashRouter>
            </Provider>
          </QueryClientProvider>
        </React.StrictMode>
    }
  </Fragment>
);