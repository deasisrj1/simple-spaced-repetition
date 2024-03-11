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
import axios from "axios";
import { Icon, IconButton, Link } from "@mui/material";
import { useFetcher } from "react-router-dom";
import CheckIcon from "@mui/icons-material/Check";
import ReplayIcon from "@mui/icons-material/Replay";

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

export async function action({ request }) {
  const formData = await request.formData();
  const intent = formData.get("intent");
  const _id = formData.get("id");

  if (intent === "delete") {
    const res = await axios.delete(`http://localhost:3005/${_id}`);

    return res;
  }

  if (intent === "complete") {
    console.log("complete");
    const nextSession = formData.get("session");
    const session = getSession(nextSession);

    console.log(session);
    const data = { nextSession: session };

    const res = await axios.put(`http://localhost:3005/${_id}`, data);

    return res;
  }

  if (intent === "reset") {
    const session = "0-day";
    const data = { nextSession: session };
    const res = await axios.put(`http://localhost:3005/${_id}`, data);
    return res;
  }

  console.log(Object.fromEntries(formData));
  console.log(request);

  throw json({ message: "Invalid intent" }, { status: 400 });
}

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

const TaskTable = ({ tasks, taskView }) => {
  const fetcher = useFetcher();

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <StyledTableCell>
                {taskView === "all" ? "" : "Today's "}Topic
                {tasks.length > 1 ? "s" : ""} - {tasks.length}
              </StyledTableCell>
              <StyledTableCell align="right">Review Date</StyledTableCell>
              {taskView == "all" ? (
                <></>
              ) : (
                <>
                  <StyledTableCell align="right" width={5}></StyledTableCell>
                  <StyledTableCell align="right" width={5}></StyledTableCell>
                </>
              )}
              <StyledTableCell align="right" width={5}></StyledTableCell>
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
                    <StyledTableCell align="right" width={5}>
                      <fetcher.Form
                        method="put"
                        onSubmit={(event) => {
                          if (
                            !confirm(
                              `Are you sure you want to restart this topic: ${task.topic}`
                            )
                          ) {
                            event.preventDefault();
                          }
                        }}
                      >
                        <IconButton
                          size="small"
                          edge="end"
                          type="submit"
                          name="intent"
                          value="reset"
                        >
                          <input
                            name="id"
                            value={task._id}
                            type="hidden"
                          ></input>
                          <ReplayIcon color="warning" />
                        </IconButton>
                      </fetcher.Form>
                    </StyledTableCell>

                    <StyledTableCell align="right" width={5}>
                      <fetcher.Form
                        method="put"
                        onSubmit={(event) => {
                          if (
                            !confirm(
                              `Are you sure you want to complete this topic: ${task.topic}`
                            )
                          ) {
                            event.preventDefault();
                          }
                        }}
                      >
                        <IconButton
                          size="small"
                          edge="end"
                          type="submit"
                          name="intent"
                          value="complete"
                        >
                          <input
                            name="id"
                            value={task._id}
                            type="hidden"
                          ></input>
                          <input
                            name="session"
                            value={task.nextSession}
                            type="hidden"
                          ></input>
                          <CheckIcon color="success" />
                        </IconButton>
                      </fetcher.Form>
                    </StyledTableCell>
                  </>
                )}
                <StyledTableCell align="right" width={5}>
                  <fetcher.Form
                    method="delete"
                    onSubmit={(event) => {
                      if (
                        !confirm(
                          `Are you sure you want to delete this topic: ${task.topic}`
                        )
                      ) {
                        event.preventDefault();
                      }
                    }}
                  >
                    <IconButton
                      type="submit"
                      name="intent"
                      value="delete"
                      size="small"
                      edge="end"
                    >
                      <input name="id" value={task._id} type="hidden"></input>
                      <DeleteForeverIcon color="error" />
                    </IconButton>
                  </fetcher.Form>
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
