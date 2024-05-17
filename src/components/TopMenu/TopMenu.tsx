import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import HeartBrokenIcon from "@mui/icons-material/HeartBroken";
import LogoutIcon from "@mui/icons-material/Logout";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import { getAuth } from "firebase/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AppBar, Divider, Toolbar } from "@mui/material";
import "./TopMenu.scss";

export default function TopMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logoutHandler = async () => {
    handleClose();
    await getAuth()
      .signOut()
      .catch((error) => {
        toast.error(error.message);
        return;
      });
    toast.success("See you next time!");
    navigate("/login");
    return;
  };

  const goTo = (route: string) => {
    navigate(route);
    handleClose();
  };

  return (
    <AppBar position="sticky">
      <Toolbar sx={{ backgroundColor: "#121212" }}>
        <IconButton
          edge="start"
          color="inherit"
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <MenuIcon />
        </IconButton>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={() => goTo("/")}>
            <AccountCircleIcon /> Basic Profile
          </MenuItem>

          <MenuItem onClick={() => goTo("/skills")}>
            <AutoFixHighIcon />
            Skills
          </MenuItem>

          <MenuItem onClick={() => goTo("/wounds")}>
            <HeartBrokenIcon />
            Wounds
          </MenuItem>

          <MenuItem onClick={() => goTo("/notes")}>
            <NoteAltIcon />
            Notes
          </MenuItem>

          <MenuItem onClick={() => goTo("/temps")}>Temps</MenuItem>
          <Divider />
          <MenuItem onClick={logoutHandler}>
            <LogoutIcon /> Logout
          </MenuItem>
          <MenuItem>
            <span>Build 2.0 - Caesar</span>
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
