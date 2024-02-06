import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import axios from "axios";

const App = () => {
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

  return (
    <div>
      <Button variant="contained">Hello world</Button>
    </div>
  );
};

export default App;
