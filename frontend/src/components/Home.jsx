import axios from "axios";
import TaskTable from "./home/TaskTable";
import { useState, useEffect } from "react";

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
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
  }, []);
  return <div>{loading ? <></> : <TaskTable tasks={tasks} />}</div>;
};
export default Home;
