import axios from "axios";
import { Button } from "@mui/material";
import TaskTable from "./home/TaskTable";
import { useLoaderData } from "react-router-dom";

export async function loader() {
  const res = await axios.get("http://localhost:3005/");

  return res.data.data;
}

const AllTasksPage = () => {
  const tasks = useLoaderData();

  return (
    <div>
      <TaskTable tasks={tasks} taskView={"all"} />
    </div>
  );
};
export default AllTasksPage;
