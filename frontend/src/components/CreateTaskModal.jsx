import {
  Box,
  Button,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useState, useEffect } from "react";
import { Form, redirect } from "react-router-dom";

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

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const res = await axios.post("http://localhost:3005", data);

  return redirect("/");
}

const CreateTaskModal = ({ open, onClose }) => {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setError("");
    try {
      if (url) {
        new URL(url);
      }
    } catch (error) {
      setError("Please Provide a Valid URL");
      return;
    }
  }, [url]);

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
          <Form
            method="post"
            id="task-form"
            autoComplete="off"
            onSubmit={onClose}
          >
            <TextField
              name="topic"
              type="text"
              variant="outlined"
              color="secondary"
              label="Topic"
              // onChange={(e) => setTopic(e.target.value)}
              // value={topic}
              fullWidth
              required
              sx={{ mb: 4 }}
            />
            <TextField
              name="link"
              type="text"
              variant="outlined"
              color="secondary"
              label="URL Link"
              onChange={(e) => setUrl(e.target.value)}
              // value={url}
              fullWidth
              sx={{ mb: 4 }}
            />

            <Stack direction="row" justifyContent="space-between">
              <Button
                disabled={error == "" ? false : true}
                variant="outlined"
                color="secondary"
                type="submit"
              >
                Create Task
              </Button>

              <Button
                variant="outlined"
                color="error"
                type="button"
                onClick={() => onClose()}
              >
                Cancel
              </Button>
            </Stack>
          </Form>
        </Box>
      </Modal>
    </div>
  );
};
export default CreateTaskModal;
