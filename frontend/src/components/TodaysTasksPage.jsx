import axios from "axios";
import { Button } from "@mui/material";
import TaskTable from "./home/TaskTable";
import { useLoaderData } from "react-router-dom";

export async function loader() {
  const res = await axios.get("http://localhost:3005/todays-task");

  return res.data.data;
}

const TodaysTasksPage = () => {
  const tasks = useLoaderData();
  return (
    <div>
      <TaskTable tasks={tasks} taskView={"today"} />
    </div>
  );
};
export default TodaysTasksPage;
