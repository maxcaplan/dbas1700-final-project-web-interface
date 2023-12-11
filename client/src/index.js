import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import reportWebVitals from "./reportWebVitals";

// CSS
import "./index.css";

// Layouts
import Main from "./layouts/main";

// Routes
import Root from "./routes/root";
import Students from "./routes/students";
import Courses from "./routes/courses";
import Professors from "./routes/professors";
import Deperatments from "./routes/departments";
import Majors from "./routes/majors";

// Create router
const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        index: true,
        element: <Root />,
      },
      {
        path: "students/",
        element: <Students />
      },
      {
        path: "courses/",
        element: <Courses />
      },
      {
        path: "professors/",
        element: <Professors />
      },
      {
        path: "departments/",
        element: <Deperatments />
      },
      {
        path: "majors/",
        element: <Majors />
      },
    ],
    errorElement: <h1 className="text-2xl">404: Page Not Found :(</h1>,
  },
]);

// Create react dom and start render
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
