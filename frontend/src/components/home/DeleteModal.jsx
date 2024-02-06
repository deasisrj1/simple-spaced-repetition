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

const DeleteModal = ({ taskId, open, onClose }) => {
  const [loading, setLoading] = useState(false);
  const handleConfirmation = (confirmation) => {
    if (confirmation) {
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
    }
    onClose(true);
  };

  return (
    <div>
      <Modal open={open} onClose={onClose}>
        <Box sx={style}>
          <div>
            Are you sure you want to delete this Task?
            {taskId}
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
export default DeleteModal;
