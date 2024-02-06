import Button from "@mui/material/Button";
import Home from "./components/Home";
import { useState } from "react";
import CreateTaskModal from "./components/CreateTaskModal";

const App = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      {showModal && (
        <CreateTaskModal open={showModal} onClose={() => setShowModal(false)} />
      )}
      <Button variant="contained" onClick={() => setShowModal(true)}>
        New Task
      </Button>
      <Home />
    </div>
  );
};

export default App;
