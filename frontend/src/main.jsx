import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AllTasksPage, {
  loader as allTasksLoader,
} from "./components/AllTasksPage.jsx";
import TodaysTasksPage, {
  loader as todaysLoader,
} from "./components/TodaysTasksPage.jsx";
import ErrorPage from "./ErrorPage.jsx";
import TodoPage, {
  loader as todosLoader,
  action as todosAction,
} from "./components/TodoPage.jsx";
import "./index.css";
import Home from "./components/Home.jsx";

import { action as newTaskAction } from "./components/CreateTaskModal.jsx";
import { action as taskTablAction } from "./components/home/TaskTable.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
    action: newTaskAction,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <TodaysTasksPage />,
            loader: todaysLoader,
            action: taskTablAction,
          },
          {
            path: "todo",
            element: <TodoPage />,
            loader: todosLoader,
            action: todosAction,
          },

          {
            path: "all-tasks",
            element: <AllTasksPage />,
            loader: allTasksLoader,
            action: taskTablAction,
          },
          {
            path: "todays-tasks",
            element: <TodaysTasksPage />,
            loader: todaysLoader,
            action: taskTablAction,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
