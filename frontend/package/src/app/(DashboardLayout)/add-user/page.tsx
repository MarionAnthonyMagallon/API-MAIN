"use client";
import { useState, useEffect } from "react";
import {
  Grid,
  Box,
  Card,
  Typography,
  Stack,
  Button,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Alert,
} from "@mui/material";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import { useRouter } from "next/navigation";
import { isAuthenticated } from "@/utils/auth";
import { userAPI } from "@/utils/api";

const roleOptions = [
  { value: "admin", label: "Administrator" },
  { value: "user", label: "Standard User" },
  { value: "editor", label: "Editor" },
];

const AddUser = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    if (!isAuthenticated()) {
      // Redirect to login if not authenticated
      router.push("/authentication/login");
    } else {
      setIsLoggedIn(true);
    }
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name as string]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset messages
    setError("");
    setSuccess("");
    
    // Validate inputs
    if (!formData.name || !formData.email || !formData.role) {
      setError("All fields are required");
      return;
    }
    
    setIsLoading(true);
    
    try {
      const data = await userAPI.addUser(formData);
      
      setSuccess("User added successfully!");
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        role: "",
      });
      
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isLoggedIn) {
    return <Typography>Checking authentication...</Typography>;
  }

  return (
    <PageContainer title="Add User" description="Add a new user to the system">
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} lg={8}>
          <Card sx={{ p: 4 }}>
            <Typography variant="h5" mb={4}>
              Add New User
            </Typography>
            
            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}
            
            {success && (
              <Alert severity="success" sx={{ mb: 3 }}>
                {success}
              </Alert>
            )}
            
            <form onSubmit={handleSubmit}>
              <Stack spacing={3}>
                <TextField
                  label="Full Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  fullWidth
                  required
                />
                
                <TextField
                  label="Email Address"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  fullWidth
                  required
                />
                
                <FormControl fullWidth required>
                  <InputLabel id="role-select-label">Role</InputLabel>
                  <Select
                    labelId="role-select-label"
                    label="Role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                  >
                    {roleOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                
                <Box>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={isLoading}
                    sx={{ mt: 2 }}
                  >
                    {isLoading ? "Adding User..." : "Add User"}
                  </Button>
                </Box>
              </Stack>
            </form>
          </Card>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default AddUser; 