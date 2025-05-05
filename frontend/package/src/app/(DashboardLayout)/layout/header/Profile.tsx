import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Avatar,
  Box,
  Menu,
  Button,
  IconButton,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";

import { IconListCheck, IconMail, IconUser, IconLogout } from "@tabler/icons-react";
import { getCurrentUser, logout } from "@/utils/auth";

const Profile = () => {
  const router = useRouter();
  const [anchorEl2, setAnchorEl2] = useState(null);
  const [userName, setUserName] = useState("User");
  
  useEffect(() => {
    // Get user info from localStorage
    const user = getCurrentUser();
    if (user && user.name) {
      setUserName(user.name);
    }
  }, []);
  
  const handleClick2 = (event: any) => {
    setAnchorEl2(event.currentTarget);
  };
  
  const handleClose2 = () => {
    setAnchorEl2(null);
  };
  
  const handleLogout = () => {
    logout();
    handleClose2();
    router.push('/authentication/login');
  };

  return (
    <Box>
      <IconButton
        size="large"
        aria-label="show profile menu"
        color="inherit"
        aria-controls="profile-menu"
        aria-haspopup="true"
        sx={{
          ...(typeof anchorEl2 === "object" && {
            color: "primary.main",
          }),
        }}
        onClick={handleClick2}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar
            src="/images/profile/user-1.jpg"
            alt="User"
            sx={{
              width: 35,
              height: 35,
            }}
          />
          <Typography
            variant="subtitle2"
            sx={{ ml: 1, display: { xs: 'none', sm: 'block' } }}
          >
            {userName}
          </Typography>
        </Box>
      </IconButton>
      
      <Menu
        id="profile-menu"
        anchorEl={anchorEl2}
        keepMounted
        open={Boolean(anchorEl2)}
        onClose={handleClose2}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        sx={{
          "& .MuiMenu-paper": {
            width: "200px",
          },
        }}
      >
        <MenuItem component={Link} href="/profile">
          <ListItemIcon>
            <IconUser width={20} />
          </ListItemIcon>
          <ListItemText>My Profile</ListItemText>
        </MenuItem>
        <MenuItem component={Link} href="/account">
          <ListItemIcon>
            <IconMail width={20} />
          </ListItemIcon>
          <ListItemText>My Account</ListItemText>
        </MenuItem>
        <MenuItem component={Link} href="/tasks">
          <ListItemIcon>
            <IconListCheck width={20} />
          </ListItemIcon>
          <ListItemText>My Tasks</ListItemText>
        </MenuItem>
        <Box mt={1} py={1} px={2}>
          <Button
            variant="outlined"
            color="primary"
            fullWidth
            onClick={handleLogout}
            startIcon={<IconLogout width={20} />}
          >
            Logout
          </Button>
        </Box>
      </Menu>
    </Box>
  );
};

export default Profile;
