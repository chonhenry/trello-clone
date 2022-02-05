import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import * as api from "../api";

const Navbar: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { user, setUser } = useAuth();
  const [title, setTitle] = useState("");
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    const loadBoard = async () => {
      const { data } = await api.getBoard(params.board_id!);
      setTitle(data.title);
    };

    if (params.board_id) {
      loadBoard();
    }
  }, [params.board_id]);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setAnchorEl(null);
    if (setUser) setUser(null);
    localStorage.removeItem("trello_clone_token");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        style={{ backgroundColor: "rgb(43, 122, 120)" }}
      >
        <Toolbar>
          <div className="grow flex">
            <Typography variant="h6" component="div">
              <span
                className="hover:cursor-pointer"
                onClick={() => navigate("/dashboard")}
              >
                Trello Clone
              </span>
              {params.board_id && <span> - </span>}
            </Typography>

            {params.board_id && (
              <Typography variant="h6" component="div">
                <input
                  className="pl-1 bg-peacock_green"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Typography>
            )}
          </div>

          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem>{user?.name}</MenuItem>
            <Divider />
            <MenuItem onClick={handleLogout}>
              <Link to="/">Logout</Link>
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
