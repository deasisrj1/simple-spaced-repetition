import { Box, Button, Modal } from "@mui/material";
import axios from "axios";
import { useState } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

// TODO:   Repeating pattern create a template later
const ConfirmationModal = ({ task, action, taskId, open, onClose }) => {
  const [loading, setLoading] = useState(false);
  const getSession = (session) => {
    switch (session) {
      case "0-day":
        return "1-day";

      case "1-day":
        return "7-days";

      case "7-days":
        return "16-days";

      case "16-days":
        return "35-days";

      case "35-days":
        return "0-day";
    }
  };
  const handleConfirmation = (confirmation) => {
    if (confirmation && action === "delete") {
      setLoading(true);
      axios
        .delete(`http://localhost:3005/${taskId}`)
        .then(() => {
          setLoading(false);
          // REPLACE THIS WITH useNAVIGATE AFTER DOING ROUTER
          window.location.reload();
        })
        .catch((error) => {
          console.log(error);
          alert("There was an error check console...");
        });
    } else if (confirmation && action === "reset") {
      setLoading(true);
      const session = "0-day";
      const data = { nextSession: session };
      axios
        .put(`http://localhost:3005/${taskId}`, data)
        .then(() => {
          setLoading(false);
          // REPLACE THIS WITH useNAVIGATE AFTER DOING ROUTER
          window.location.reload();
        })
        .catch((error) => {
          console.log(error);
          alert("There was an error check console...");
        });
    } else if (confirmation && action === "complete") {
      const session = getSession(task.nextSession);
      const data = { nextSession: session };

      axios
        .put(`http://localhost:3005/${taskId}`, data)
        .then(() => {
          setLoading(false);
          // REPLACE THIS WITH useNAVIGATE AFTER DOING ROUTER
          window.location.reload();
        })
        .catch((error) => {
          console.log(error);
          alert("There was an error check console...");
        });
    }
    onClose(true);
  };

  return (
    <div>
      <Modal open={open} onClose={onClose}>
        <Box sx={style}>
          <div>
            {action == "delete" ? (
              <p>Are you sure you want to DELETE this Task?</p>
            ) : action == "reset" ? (
              <p>Are you sure you want to RESET this Task?</p>
            ) : (
              <p>Complete this Task?</p>
            )}
            <p>Topic: {task.topic}</p>
            <p>Task Id: {taskId}</p>
            <div>
              <Button
                variant="contained"
                onClick={() => handleConfirmation(true)}
              >
                YES
              </Button>
              <Button onClick={() => handleConfirmation(false)}>No</Button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};
export default ConfirmationModal;
