import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { authContext } from "../../Context/AuthContextProvider";

export default function Navbar() {
  const { token, setToken } = useContext(authContext);
  const navigate = useNavigate();
  function handleLogOut() {
    localStorage.removeItem("token"), setToken(null);
    navigate("/login");
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          ></IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            task
          </Typography>

          {token ? (
            <Typography
              onClick={handleLogOut}
              component="span"
              sx={{ mb: 0.5, ml: 1, cursor: "pointer" }}
            >
              Logout
            </Typography>
          ) : (
            <Button
              color="inherit"
              onClick={() => {
                navigate("/login");
              }}
            >
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
