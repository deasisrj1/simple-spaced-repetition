import axios from "axios";
import TaskTable from "./home/TaskTable";
import { useState, useEffect } from "react";
import { Stack } from "@mui/material";
import CreateTaskModal from "./CreateTaskModal";
import Button from "@mui/material/Button";

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [taskView, setTaskView] = useState("today");

  useEffect(() => {
    setLoading(true);
    if (taskView === "today") {
      axios
        .get("http://localhost:3005/todays-task")
        .then((response) => {
          console.log(response.data.data);
          setTasks(response.data.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    } else if (taskView === "all") {
      axios
        .get("http://localhost:3005/")
        .then((response) => {
          console.log(response.data.data);
          setTasks(response.data.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    }
  }, [taskView]);
  return (
    <div>
      {showModal && (
        <CreateTaskModal open={showModal} onClose={() => setShowModal(false)} />
      )}
      <Stack direction="row" justifyContent="space-between">
        <Button
          variant="contained"
          onClick={() => setShowModal(true)}
          sx={{ mb: 1 }}
        >
          New Task
        </Button>
        <Stack direction="row">
          <Button
            variant="contained"
            onClick={() => setTaskView("today")}
            sx={{ mb: 1 }}
            align="right"
          >
            Today's Tasks
          </Button>
          <Button
            variant="contained"
            onClick={() => setTaskView("all")}
            sx={{ mb: 1, ml: 1 }}
            align="right"
          >
            All Tasks
          </Button>
        </Stack>
      </Stack>

      {loading ? <></> : <TaskTable tasks={tasks} taskView={taskView} />}
    </div>
  );
};
export default Home;
