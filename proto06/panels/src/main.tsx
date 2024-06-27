
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter, HashRouter } from "react-router-dom";
import { ThemeProvider } from "@material-tailwind/react";
import { MaterialTailwindControllerProvider } from "@/context";
import "../public/css/tailwind.css";
import { Provider } from "react-redux";
import store from "@/store/configureStore";
import AlertMessage from "./public-components/AlertMessage";



const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

// root.render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <BrowserRouter>
//         <ThemeProvider>
//           <MaterialTailwindControllerProvider>
//             <App />
//           </MaterialTailwindControllerProvider>
//         </ThemeProvider>
//       </BrowserRouter>
//     </Provider>
//   </React.StrictMode>
// );

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter>
        <ThemeProvider>
          <MaterialTailwindControllerProvider>
            <App />
          </MaterialTailwindControllerProvider>
        </ThemeProvider>
      </HashRouter>
    </Provider>
  </React.StrictMode>
);