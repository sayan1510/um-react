import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
  Box,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  useFetchUsers,
  useUserDeletion,
  useUserNavigation,
} from "../hooks/useUserTableHooks";

const UserTable = () => {
  const users = useFetchUsers();
  const { handleAdd, handleEdit } = useUserNavigation();
  const handleDelete = useUserDeletion();

  const headers = [
    "No.",
    "Image",
    "Name",
    "Age",
    "Email",
    "Phone",
    "Edit",
    "Delete",
  ];

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        sx={{ margin: "16px 0" }}
      >
        <Typography
          variant="h5"
          component="div"
          sx={{
            fontWeight: "bold",
            color: "white",
          }}
        >
          {users.length ? "Users List" : "No User Found"}
        </Typography>
        <Button variant="contained" color="primary" onClick={handleAdd}>
          Add User
        </Button>
      </Box>
      {users.length && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                {headers.map((header, index) => (
                  <TableCell key={index} sx={{ color: "white" }}>
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user, index) => (
                <TableRow key={user._id}>
                  <TableCell>{index + 1}.</TableCell>
                  <TableCell>
                    <img
                      src={user.image}
                      alt="dummy-profile-pic.png"
                      style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "50%",
                      }}
                    />
                  </TableCell>
                  <TableCell>{user.fullName}</TableCell>
                  <TableCell>{user.age}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>
                    <EditIcon
                      style={{ fontSize: 20, color: "blue", cursor: "pointer" }}
                      onClick={() => handleEdit(user)}
                    />
                  </TableCell>
                  <TableCell>
                    <DeleteIcon
                      style={{ fontSize: 20, color: "red", cursor: "pointer" }}
                      onClick={() => handleDelete(user)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};

export default UserTable;
