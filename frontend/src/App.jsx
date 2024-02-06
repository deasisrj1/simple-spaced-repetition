import axios from "axios";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";

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
      {loading ? (
        <></>
      ) : (
        <>
          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 650 }}
              size="small"
              aria-label="a dense table"
            >
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
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </div>
  );
};

export default App;
