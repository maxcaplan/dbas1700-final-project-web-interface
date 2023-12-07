import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import reportWebVitals from "./reportWebVitals";

// CSS
import "./index.css";

// Routes
import Root from "./routes/root";

// Components
import SideBar from "./components/sidebar";

// Create router
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
  },
]);

// Create react dom and start render
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <div id="app" className="w-full h-full flex flex-row">
      <SideBar />
      
      <div id="main">
        <RouterProvider router={router} />
      </div>
    </div>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
