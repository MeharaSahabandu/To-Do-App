import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch(
        "http://localhost:8070/api/task/get-all-tasks"
      );
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 0:
        return "Pending";
      case 1:
        return "In Progress";
      case 2:
        return "On Hold";
      case 3:
        return "Completed";
      default:
        return "Pending";
    }
  };

  const handleStatusChange = (taskId, newStatus) => {
    // Update the status of the task with the taskId
    // You can implement the logic to update the status here
  };

  const handleMenuOpen = (taskId) => (event) => {
    setAnchorEl(event.currentTarget);
    setSelectedTaskId(taskId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedTaskId(null);
  };

  const handleMenuOptionClick = async (option) => {
    switch (option) {
      case "view":
        // Handle view option
        const selected = tasks.find((task) => task.id === selectedTaskId);
        setSelectedTask(selected);
        setOpenModal(true);
        break;
      case "edit":
        // Handle edit option
        break;
      case "delete":
        try {
          await fetch(`http://localhost:8070/api/delete-task/${selectedTaskId}`, {
            method: "DELETE",
          });
          // Remove the deleted task from the state
          setTasks((prevTasks) => prevTasks.filter((task) => task.id !== selectedTaskId));
        } catch (error) {
          console.error("Error deleting task:", error);
        }
        break;
      default:
        break;
    }

    handleMenuClose();
  };


  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <b>Task</b>
            </TableCell>
            <TableCell>
              <b>Description</b>
            </TableCell>
            <TableCell>
              <b>Status</b>
            </TableCell>
            <TableCell>
              <b>Actions</b>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tasks.map((task) => (
            <TableRow key={task.id}>
              <TableCell>{task.title}</TableCell>
              <TableCell>{task.description}</TableCell>
              <TableCell>
                <Select
                  value={task.status}
                  onChange={(event) =>
                    handleStatusChange(task.id, event.target.value)
                  }
                >
                  <MenuItem value={0}>{getStatusLabel(0)}</MenuItem>
                  <MenuItem value={1}>{getStatusLabel(1)}</MenuItem>
                  <MenuItem value={2}>{getStatusLabel(2)}</MenuItem>
                  <MenuItem value={3}>{getStatusLabel(3)}</MenuItem>
                </Select>
              </TableCell>
              <TableCell>
                <MoreVertIcon
                  onClick={handleMenuOpen(task.id)}
                />
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl && selectedTaskId === task.id)}
                  onClose={handleMenuClose}
                >
                  <MenuItem onClick={() => handleMenuOptionClick("view")}>
                    View
                  </MenuItem>
                  <MenuItem onClick={() => handleMenuOptionClick("edit")}>
                    Edit
                  </MenuItem>
                  <MenuItem onClick={() => handleMenuOptionClick("delete")}>
                    Delete
                  </MenuItem>
                </Menu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Modal */}
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <h2>{selectedTask && selectedTask.title}</h2>
          <p>{selectedTask && selectedTask.description}</p>
          <p>Status: {selectedTask && getStatusLabel(selectedTask.status)}</p>
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: "auto" }}
            onClick={handleCloseModal}
          >
            Got It
          </Button>
        </Box>
      </Modal>
    </TableContainer>
  );
}
