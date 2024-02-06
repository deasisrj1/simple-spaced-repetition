import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1000,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const CreateTaskModal = ({ open, onClose }) => {
  const [topic, setTopic] = useState("");
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const [loadin, setLoading] = useState(false);
  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");
    try {
      if (url) {
        new URL(url);
      }
    } catch (error) {
      setError("Please Provide a Valid URL");
      return;
    }
    setLoading(true);
    const data = {
      topic,
      link: url,
    };
    axios
      .post("http://localhost:3005", data)
      .then(() => {
        setLoading(false);
        // CHANGE TO NAVIGATE AFTER ROUTER SETUP
        window.location.reload();
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
        alert("There was an error check console...");
      });
  };
  return (
    <div>
      <Modal open={open} onClose={onClose}>
        <Box sx={style}>
          <Typography variant="h5" sx={{ mb: 4 }}>
            Create a Task
          </Typography>
          {error && (
            <Typography variant="subtitle2" color="red" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}
          <form autoComplete="off" onSubmit={handleSubmit}>
            <TextField
              type="text"
              variant="outlined"
              color="secondary"
              label="Topic"
              onChange={(e) => setTopic(e.target.value)}
              value={topic}
              fullWidth
              required
              sx={{ mb: 4 }}
            />
            <TextField
              type="text"
              variant="outlined"
              color="secondary"
              label="URL Link"
              onChange={(e) => setUrl(e.target.value)}
              value={url}
              fullWidth
              sx={{ mb: 4 }}
            />

            <Button variant="outlined" color="secondary" type="submit">
              Create Task
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
};
export default CreateTaskModal;
