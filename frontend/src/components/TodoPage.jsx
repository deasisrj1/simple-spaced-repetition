import Button from "@mui/material/Button";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import Checkbox from "@mui/material/Checkbox";
import CheckIcon from "@mui/icons-material/Check";
import ReplayIcon from "@mui/icons-material/Replay";

import CloseIcon from "@mui/icons-material/Close";

import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { Box, IconButton, Stack, TextField } from "@mui/material";

import axios from "axios";
import { Link } from "@mui/material";
import { useLoaderData, useFetcher, Form, json } from "react-router-dom";

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

export async function loader() {
  const res = await axios.get("http://localhost:3005/todo");
  return res.data.data;
}

export async function action({ request }) {
  const formData = await request.formData();
  const intent = formData.get("intent");

  if (intent === "checkbox") {
    const id = formData.get("id");
    const completed = formData.get("complete") == "on" ? true : false;
    const res = axios.put(`http://localhost:3005/todo/${id}`, {
      _id: id,
      completed: completed,
    });

    return res;
  }
  if (intent === "undo-complete") {
    const id = formData.get("id");
    const completed = false;
    const res = axios.put(`http://localhost:3005/todo/${id}`, {
      _id: id,
      completed: completed,
    });

    return res;
  }

  if (intent === "reset") {
    console.log("reset");
    const res = axios.post(`http://localhost:3005/todo/reset`, {
      reset: true,
    });
    return res;
  }

  if (intent === "newtodo") {
    const todo = formData.get("todo");
    const res = axios.post(`http://localhost:3005/todo/`, {
      todo,
    });

    console.log("newtodo");
    console.log(todo);

    return res;
  }

  if (intent === "delete") {
    console.log("delete");
    const id = formData.get("id");

    const res = axios.delete(`http://localhost:3005/todo/${id}`);

    console.log(id);

    return res;
  }

  if (intent === "edit-todo") {
    console.log("edit-todo");
    console.log(Object.fromEntries(formData));
    const id = formData.get("id");

    const oldValue = formData.get("old-value");
    const newValue = formData.get("todo");

    if (oldValue === newValue) return {};

    const res = await axios.put(`http://localhost:3005/todo/${id}`, {
      todo: newValue,
    });
    // const id = formData.get("id");

    // const res = axios.delete(`http://localhost:3005/todo/${id}`);

    // console.log(id);

    return res;
  }

  throw json({ message: "Invalid intent" }, { status: 400 });
}

const TodoPage = () => {
  const todos = useLoaderData();
  const completedTodos = todos.filter((todo) => todo.completed === true);
  const [showAdd, setShowAdd] = useState(false);
  const [showEditId, setShowEditId] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [todoValue, setTodoValue] = useState("");

  const fetcher = useFetcher();

  const handleBlur = (e) => {
    if (e.target.value !== "") {
      console.log(e.target.value);
      console.log(e.target);
      console.log(e.target.form);
      fetcher.submit(e.target.form);
    }
    setShowAdd(false);
  };

  return (
    <div>
      <Stack direction="row" justifyContent="space-between">
        <Button
          variant="contained"
          sx={{ mb: 1 }}
          onClick={() => setShowAdd(true)}
        >
          Add Todo
        </Button>
        streak
        <Form
          method="post"
          action=""
          onSubmit={(event) => {
            if (!confirm("Are you sure you want to reset Todos")) {
              event.preventDefault();
            }
          }}
        >
          <Button name="intent" value="reset" type="submit">
            reset
          </Button>
        </Form>
      </Stack>

      <Stack direction="row" justifyContent="space-between">
        <TableContainer component={Paper}>
          <Table size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="left" width={10}>
                  TODOS
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {showAdd && (
                <StyledTableRow>
                  <StyledTableCell component="th" scope="row" align="left">
                    <fetcher.Form
                      method="post"
                      action=""
                      onSubmit={() => setShowAdd(false)}
                    >
                      <input name="intent" type="hidden" value="newtodo" />
                      <TextField
                        name="todo"
                        fullWidth
                        onBlur={(e) => handleBlur(e)}
                      />
                    </fetcher.Form>
                  </StyledTableCell>
                </StyledTableRow>
              )}

              {todos
                .filter((todo) => todo.completed === false)
                .map((todo) => (
                  <StyledTableRow
                    key={todo._id}
                    onMouseEnter={() => {
                      isEditing ? "" : setShowEditId(todo._id);
                    }}
                    onMouseLeave={() => setShowEditId("")}
                  >
                    {isEditing === todo._id && (
                      <StyledTableCell component="th" scope="row" align="left">
                        <Stack
                          direction="row"
                          justifyContent="space-between"
                          alignItems="center"
                        >
                          <TextField
                            fullWidth
                            value={todoValue || todo.todo}
                            onChange={(e) => setTodoValue(e.target.value)}
                          />
                          <fetcher.Form
                            method="post"
                            action=""
                            onSubmit={() => setIsEditing("")}
                          >
                            <input
                              name="intent"
                              type="hidden"
                              value="edit-todo"
                            />
                            <input
                              name="old-value"
                              type="hidden"
                              value={todo.todo}
                            />
                            <input
                              name="todo"
                              type="hidden"
                              value={todoValue}
                            />
                            <input name="id" type="hidden" value={todo._id} />

                            <Stack direction="row">
                              <IconButton size="small" edge="end" type="submit">
                                <CheckIcon color="success" />
                              </IconButton>

                              <IconButton
                                size="small"
                                edge="end"
                                onClick={() => {
                                  setIsEditing("");
                                  setTodoValue("");
                                }}
                              >
                                <CloseIcon color="error" />
                              </IconButton>
                            </Stack>
                          </fetcher.Form>
                        </Stack>
                      </StyledTableCell>
                    )}

                    {isEditing !== todo._id && (
                      <StyledTableCell component="th" scope="row" align="left">
                        <Stack
                          direction="row"
                          justifyContent="space-between"
                          alignItems="center"
                        >
                          <fetcher.Form method="put" action="">
                            <input
                              name="id"
                              type="hidden"
                              defaultValue={todo._id}
                            />

                            <input
                              name="intent"
                              type="hidden"
                              value="checkbox"
                            />

                            <Checkbox
                              name="complete"
                              onChange={(e) => fetcher.submit(e.target.form)}
                            />
                            {todo.todo}
                          </fetcher.Form>

                          {showEditId === todo._id &&
                            isEditing !== todo._id && (
                              <Stack direction="row">
                                <IconButton
                                  size="small"
                                  edge="end"
                                  onClick={() => setIsEditing(todo._id)}
                                >
                                  <EditIcon color="warning" />
                                </IconButton>

                                <fetcher.Form
                                  method="delete"
                                  onSubmit={(event) => {
                                    if (
                                      !confirm(
                                        "Are you sure you want to delete this Todo"
                                      )
                                    ) {
                                      event.preventDefault();
                                    }
                                  }}
                                >
                                  <input
                                    name="id"
                                    type="hidden"
                                    defaultValue={todo._id}
                                  />
                                  <IconButton
                                    name="intent"
                                    value="delete"
                                    size="small"
                                    edge="end"
                                    type="submit"
                                  >
                                    <DeleteForeverIcon color="error" />
                                  </IconButton>
                                </fetcher.Form>
                              </Stack>
                            )}
                        </Stack>
                      </StyledTableCell>
                    )}
                  </StyledTableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TableContainer component={Paper} sx={{ ml: 1, maxWidth: 650 }}>
          <Table size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="left" width={10}>
                  COMPLETED TODOS
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {completedTodos.map((todo) => (
                <StyledTableRow
                  key={todo._id}
                  onMouseEnter={() => {
                    isEditing ? "" : setShowEditId(todo._id);
                  }}
                  onMouseLeave={() => setShowEditId("")}
                  height={55}
                >
                  <StyledTableCell component="th" scope="row" align="left">
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      {todo.todo}
                      {showEditId === todo._id && (
                        <Stack direction="row">
                          <fetcher.Form method="put">
                            <input
                              name="id"
                              type="hidden"
                              defaultValue={todo._id}
                            />
                            <IconButton
                              size="small"
                              edge="end"
                              type="submit"
                              name="intent"
                              value="undo-complete"
                            >
                              <ReplayIcon color="warning" />
                            </IconButton>
                          </fetcher.Form>

                          <fetcher.Form
                            method="delete"
                            onSubmit={(event) => {
                              if (
                                !confirm(
                                  "Are you sure you want to delete this Todo"
                                )
                              ) {
                                event.preventDefault();
                              }
                            }}
                          >
                            <input
                              name="id"
                              type="hidden"
                              defaultValue={todo._id}
                            />
                            <IconButton
                              name="intent"
                              value="delete"
                              size="small"
                              edge="end"
                              type="submit"
                            >
                              <DeleteForeverIcon color="error" />
                            </IconButton>
                          </fetcher.Form>
                        </Stack>
                      )}
                    </Stack>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
    </div>
  );
};
export default TodoPage;
