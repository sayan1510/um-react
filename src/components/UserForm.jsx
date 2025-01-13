import { Box, TextField, Button, Typography, Grid } from "@mui/material";
import {
  useFormState,
  useFormSubmit,
  useSubmitButtonState,
} from "../hooks/useUserFormHooks";

const UserForm = () => {
  const { formData, setFormData, existingUser } = useFormState();
  const handleSubmit = useFormSubmit(formData, existingUser);
  const isSubmitDisabled = useSubmitButtonState(formData, existingUser);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Box
      sx={{
        maxWidth: 800,
        margin: "auto",
        padding: 4,
        backgroundColor: "white",
        boxShadow:
          "rgba(0, 0, 0, 0.05) 0px 6px 12px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
        borderRadius: "8px",
      }}
    >
      <Typography
        variant="h4"
        component="div"
        sx={{ fontWeight: "bold", marginBottom: 3 }}
      >
        {existingUser._id ? "Edit Employee" : "Add Employee"}
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          {formData.image ? (
            <img
              src={formData.image}
              alt="Image"
              style={{ width: "100%", borderRadius: "8px" }}
            />
          ) : (
            <img
              src="dummy-profile-pic.png"
              alt="Image"
              style={{ width: "100%", borderRadius: "8px" }}
            />
          )}
        </Grid>
        <Grid item xs={12} sm={8}>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              margin="normal"
              name="fullName"
              label="Full Name"
              value={formData.fullName}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              margin="normal"
              name="age"
              label="Age"
              type="number"
              value={formData.age}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              margin="normal"
              name="email"
              label="Email"
              value={formData.email}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              margin="normal"
              name="phone"
              label="Phone"
              value={formData.phone}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              margin="normal"
              name="image"
              label="Image URL"
              value={formData.image}
              onChange={handleChange}
            />
            <Button
              variant="contained"
              color="primary"
              type="submit"
              sx={{ marginTop: 2 }}
              disabled={isSubmitDisabled}
            >
              Submit
            </Button>
          </form>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserForm;
