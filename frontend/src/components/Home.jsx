import axios from "axios";
import TaskTable from "./home/TaskTable";
import { useState, useEffect } from "react";
import { Stack } from "@mui/material";
import CreateTaskModal from "./CreateTaskModal";
import Button from "@mui/material/Button";
import TodoPage from "./TodoPage";
import { Outlet, Link, Form } from "react-router-dom";

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [taskView, setTaskView] = useState("today");
  const [showTodo, setShowTodo] = useState(false);

  const handleTaskView = (view) => {
    if (showTodo) {
      setShowTodo(false);
    }
    setTaskView(view);
  };

  // TODO: in the future maybe create user login and auth ...
  return (
    <div>
      {showModal && (
        <CreateTaskModal open={showModal} onClose={() => setShowModal(false)} />
      )}

      <Stack direction="row" justifyContent="space-between">
        <Stack direction="row">
          <Form action="todo">
            <Button
              type="submit"
              variant="contained"
              sx={{ mb: 1 }}
              align="left"
            >
              Todo List
            </Button>
          </Form>
        </Stack>

        <Stack direction="row">
          <Form action="todays-tasks">
            <Button
              type="submit"
              variant="contained"
              sx={{ mb: 1, ml: 1 }}
              align="right"
            >
              Today's Tasks
            </Button>
          </Form>
          <Form action="all-tasks">
            <Button
              type="submit"
              variant="contained"
              sx={{ mb: 1, ml: 1 }}
              align="right"
            >
              All Tasks
            </Button>
          </Form>

          <Button
            type="submit"
            variant="contained"
            sx={{ mb: 1, ml: 1 }}
            align="right"
            onClick={() => setShowModal(true)}
          >
            New Task
          </Button>
        </Stack>
      </Stack>

      <Outlet />
    </div>
  );
};
export default Home;
