import Button from "@mui/material/Button";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import ConfirmationModal from "./ConfirmationModal";
import axios from "axios";
import { Link } from "@mui/material";
// import { useNavigate } from "react-router-dom";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

// TODO: Select mupltiple rows then complete, reset or delete
// TODO: Edit a Task
// TODO: Routing

const TaskTable = ({ tasks, taskView }) => {
  const [showModal, setShowModal] = useState(false);
  const [id, setId] = useState("");
  const [action, setAction] = useState("");
  const [task, setTask] = useState({});

  const handleDelete = (id, deleteTask) => {
    setId(id);
    setAction("delete");
    setTask(deleteTask);
    setShowModal(true);
  };

  const handleReset = (id, resetTask) => {
    setAction("reset");
    setId(id);
    setTask(resetTask);
    setShowModal(true);
  };

  const handleComplete = (id, completeTask) => {
    setAction("complete");
    setId(id);
    setTask(completeTask);
    setShowModal(true);
  };

  return (
    <div>
      {showModal && (
        <ConfirmationModal
          action={action}
          open={showModal}
          task={task}
          taskId={id}
          onClose={() => setShowModal(false)}
        />
      )}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Topic</StyledTableCell>
              <StyledTableCell align="right">Review Date</StyledTableCell>
              {taskView == "all" ? (
                <></>
              ) : (
                <>
                  <StyledTableCell align="right" width={50}>
                    Reset
                  </StyledTableCell>
                  <StyledTableCell align="right" width={50}>
                    Complete
                  </StyledTableCell>
                </>
              )}
              <StyledTableCell align="right" width={10}>
                Delete
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.map((task) => (
              <StyledTableRow key={task._id}>
                <StyledTableCell component="th" scope="row">
                  <Link href={task.link} color="inherit">
                    {task.topic}
                  </Link>
                </StyledTableCell>
                <StyledTableCell align="right">
                  {new Date(task.date).toDateString()}
                </StyledTableCell>
                {taskView == "all" ? (
                  <></>
                ) : (
                  <>
                    <StyledTableCell align="right" width={50}>
                      <Button onClick={() => handleReset(task._id, task)}>
                        reset
                      </Button>
                    </StyledTableCell>
                    <StyledTableCell align="right" width={50}>
                      <Button
                        variant="contained"
                        onClick={() => handleComplete(task._id, task)}
                      >
                        complete
                      </Button>
                    </StyledTableCell>
                  </>
                )}
                <StyledTableCell align="right" width={50}>
                  <button>
                    <DeleteForeverIcon
                      onClick={() => handleDelete(task._id, task)}
                    />
                  </button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
export default TaskTable;
