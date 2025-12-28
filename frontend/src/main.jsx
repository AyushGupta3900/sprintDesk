import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";

import App from "./App";
import { store } from "./store/store";
import ErrorBoundary from "./components/system/ErrorBoundary";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
    <Provider store={store}>
      <BrowserRouter>
        <ErrorBoundary>
          <App />
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: "#111",
                color: "#fff",
                borderRadius: "12px",
                fontSize: "14px",
              },
            }}
          />
        </ErrorBoundary>
      </BrowserRouter>
    </Provider>
);