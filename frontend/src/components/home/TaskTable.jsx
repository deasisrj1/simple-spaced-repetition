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
import DeleteModal from "./DeleteModal";
import axios from "axios";
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

const TaskTable = ({ tasks }) => {
  const [showModal, setShowModal] = useState(false);
  const [id, setId] = useState("");

  const handleDelete = (id) => {
    setId(id);
    setShowModal(true);
  };

  return (
    <div>
      {showModal && (
        <DeleteModal
          open={showModal}
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
              <StyledTableCell align="right" width={50}>
                Reset
              </StyledTableCell>
              <StyledTableCell align="right" width={50}>
                Complete
              </StyledTableCell>
              <StyledTableCell align="right" width={10}>
                Delete
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.map((task) => (
              <StyledTableRow key={task._id}>
                <StyledTableCell component="th" scope="row">
                  {task.topic}
                </StyledTableCell>
                <StyledTableCell align="right">{task.date}</StyledTableCell>
                <StyledTableCell align="right" width={50}>
                  <Button>reset</Button>
                </StyledTableCell>
                <StyledTableCell align="right" width={50}>
                  <Button variant="contained">complete</Button>
                </StyledTableCell>
                <StyledTableCell align="right" width={50}>
                  <button>
                    <DeleteForeverIcon onClick={() => handleDelete(task._id)} />
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
